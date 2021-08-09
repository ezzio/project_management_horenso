import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartType, ChartDataSets, ChartOptions} from 'chart.js';
import {MultiDataSet, Color, SingleDataSet, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() typeChart: any;
  @Input() pieChartLabels: Label[];
  @Input() pieChartData: SingleDataSet;
  @Output() messageEvent = new EventEmitter<any>();
  public pieChartType = 'pie';
  pieChartLegend: boolean;
  pieChartPlugins = [];
  pieChartOptions: ChartOptions;
  // line
  lineChartData: ChartDataSets[] = [
    {data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices'},
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  // end line

  // doughnut-chart
  @Input() doughnutChartLabels: Label[];
  @Input() doughnutChartData: MultiDataSet = [
    [55, 25]
  ];
  doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  doughnutChartType: ChartType = 'doughnut';
  //
  // events
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        render: 'value',
        position: 'center'
      }
    },
  };
  public barChartType: ChartType = 'bar';
  @Input() barChartLabels: Label[];
  public barChartLegend = true;
  public barChartPlugins = [];
  @Input() barChartData: ChartDataSets[];

  ngOnInit() {
    this.pieChartOptions = this.createOptions();
    this.pieChartLegend = false;
    // this.pieChartPlugins = [pluginLabels];
  }

  public chartClicked(e) {
    this.messageEvent.emit(e.active[0]._index);
  }

  public chartHovered(e) {

  }

  private createOptions(): ChartOptions {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        labels: {
          render: 'percentage',
          fontSize: 11,
          fontColor: ['green', 'white', 'red'],
          precision: 1,
        }
      },
    };
  }

}
