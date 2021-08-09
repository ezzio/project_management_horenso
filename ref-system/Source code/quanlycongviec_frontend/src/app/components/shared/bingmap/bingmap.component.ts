import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {HealthService} from '../../../_services/data/health.service';

@Component({
  selector: 'app-bingmap',
  templateUrl: './bingmap.component.html',
  styleUrls: ['./bingmap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BingmapComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('myMap') myMap;
  @Input() pageTitle = 'Vùng bị ảnh hưởng bởi dịch SARS-CoV2';
  @Input() data: any;
  @Input() dataEvent: EventEmitter<object>;
  @Input() dataArrayEvent: EventEmitter<object>;
  dataMap: any;
  dataArray: any;
  @Input() classOfMap = 'default';
  @Input() centerPoint = {
    lat: 16.0544,
    long: 108.2022
  };
  @Input() infoPoint = 'address';
  @Input() keyLong = 'longitude';
  @Input() keyLat = 'latitude';
  @Input() zoomSize = 8;
  @Input() isLine: boolean;
  constructor(private healthService: HealthService) {
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges){
    // this.ngAfterViewInit();
  }

  async ngAfterViewInit(){
    if (this.dataEvent) {
      this.dataEvent.subscribe(event => {
        this.dataMap = event.dt;
        this.centerPoint = event.center;
        this.functionMap();
      });
    } else if (this.data) {
      this.dataMap = this.data;
      this.functionMap();
    }
    if (this.dataArrayEvent){
      this.dataArrayEvent.subscribe(event => {
        this.dataArray = event.dt;
        this.centerPoint = event.center;
        this.functionMap();
      });
    }

  }
  functionMap(){
    const map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
      credentials: 'AoUPIqiyzT-4CXDF05ww8NpsyRI0kqUKsVcBzOYAHrvhd0gM7SkXv4dA4xVvKORZ',
      center: new Microsoft.Maps.Location(this.centerPoint.lat, this.centerPoint.long),
      zoom: this.zoomSize
    });
    const center = map.getCenter();
    const pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
    const layer = new Microsoft.Maps.Layer();
    layer.add(pushpin);
    // map.entities.push(polyline);
    map.layers.insert(layer);
    map.entities.push(pushpin);
    pushpin.setOptions({ enableHoverStyle: true, enableClickedStyle: true });
    const pins = [];
    let pinCounter = 0;
    if (this.dataMap){
      this.dataMap.forEach((i) => {
        // @ts-ignore
        if (i[this.keyLat] !== 0 && i[this.keyLong] !== 0) {
          const coor = new Microsoft.Maps.Location(i[this.keyLat], i[this.keyLong]);
          pins[pinCounter] = this.drawPoint(map, coor, i);
          pinCounter++;
        }
      });
      layer.add(pins);
      map.layers.insert(layer);
    }
    const coors = [];
    if (this.dataArray){
      const firstPoint = this.dataArray[0][0];
      console.log(firstPoint.time);
      const firstCoor = new Microsoft.Maps.Location(firstPoint[this.keyLat], firstPoint[this.keyLong]);
      const lastPoint = this.dataArray[this.dataArray.length - 1][this.dataArray[this.dataArray.length - 1].length - 1];
      console.log(lastPoint.time);
      const lastCoor = new Microsoft.Maps.Location(lastPoint[this.keyLat], lastPoint[this.keyLong]);
      pins[pinCounter] = this.drawPoint(map, firstCoor, firstPoint);
      pinCounter++;
      pins[pinCounter] = this.drawPoint(map, lastCoor, lastPoint);
      pinCounter++;
      layer.add(pins);
      map.layers.insert(layer);
      this.dataArray.forEach((i) => {
        const a = [];
        i.forEach((j) => {
          const coor1 = new Microsoft.Maps.Location(j[this.keyLat], j[this.keyLong]);
          pins[pinCounter] = this.drawPoint(map, coor1, j);
          pinCounter++;
          layer.add(pins);
          map.layers.insert(layer);
          a.push(coor1);
        });
        coors.push({flag: i[0].flag, coor: a});
      });
      console.log(coors);
      coors.forEach((i) => {
        if (i.flag === 1){
          const line1 = new Microsoft.Maps.Polyline(i.coor, {
            strokeColor: 'red',
            strokeThickness: 3,
          });
          map.entities.push(line1);
        } else if (i.flag === 0){
          const line2 = new Microsoft.Maps.Polyline(i.coor, {
            strokeColor: 'blue',
            strokeThickness: 2,
          });
          map.entities.push(line2);
        }
      });
    }
  }

  drawPoint(map, coor, point){
    const pin = new Microsoft.Maps.Pushpin(coor, {
      color: '#ED1C24',
      enableHoverStyle: true
    });
    const infobox = new Microsoft.Maps.Infobox(coor, {
      title: point[this.infoPoint],
      visible: false
    });
    infobox.setMap(map);
    // tslint:disable-next-line:only-arrow-functions
    Microsoft.Maps.Events.addHandler(pin, 'click', function() {
      infobox.setOptions({ visible: true });
    });
    return pin;
  }
}
