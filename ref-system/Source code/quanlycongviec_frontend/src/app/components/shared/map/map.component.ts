import {Component, OnInit} from '@angular/core';
import {MapsTheme, MapsTooltip, DataLabel, Maps, Marker, Annotations, ILoadEventArgs, NavigationLine} from '@syncfusion/ej2-angular-maps';
import {HealthService} from '../../../_services/data/health.service';

Maps.Inject(Marker, MapsTooltip, DataLabel, NavigationLine, Annotations);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private healthService: HealthService) {
  }
  public bingkey = 'AoUPIqiyzT-4CXDF05ww8NpsyRI0kqUKsVcBzOYAHrvhd0gM7SkXv4dA4xVvKORZ';
  // custom code end
  public zoomSettings: object = {
    zoomFactor: 5,
    enable: true
  };
  public titleSettings: object = {
    text: 'Vùng bị ảnh hưởng bởi dịch SARS-CoV2',
    textStyle: {
      size: '16px'
    }
  };
  public centerPosition: object = {
    latitude: 10.8231,
    longitude: 106.6297
  };
  public dataMap = [];
  public layers: object[];
  public load = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.maps.theme = ((theme.charAt(0).toUpperCase() + theme.slice(1)) as MapsTheme);
  }

  async ngOnInit() {
    const dt = await this.healthService.getAddCovid();
    console.log(dt);
    dt.forEach((i) => {
      i.latitude = parseFloat(i.latitude);
      i.longitude = parseFloat(i.longitude);
    });
    this.dataMap = dt;
    console.log(this.dataMap);
    this.layers = [
      {
        layerType: 'OSM',
        markerSettings: [
          {
            visible: true,
            dataSource: this.dataMap,
            template: '<div><img src="../../../../assets/images/balloon.png" style="height:30px;width:20px;"/></div>',
            tooltipSettings: {
              visible: true,
              valuePath: 'address'
            }
          },
        ],
      }];
  }
}
