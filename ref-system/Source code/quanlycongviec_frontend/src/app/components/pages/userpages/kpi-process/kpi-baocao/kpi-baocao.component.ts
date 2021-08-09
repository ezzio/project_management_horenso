import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {AuthService} from '../../../../../_services/auth/auth.service';
import {TasksService} from '../../../../../_services/data/tasks.service';
import {any, ifTrue} from 'codelyzer/util/function';


@Component({
  selector: 'app-kpi-baocao',
  templateUrl: './kpi-baocao.component.html',
  styleUrls: ['./kpi-baocao.component.css']
})

export class KpiBaocaoComponent implements OnInit {
  constructor(private authService: AuthService, private tasksService: TasksService) {}
  maxDate = new Date();
  // tslint:disable-next-line:variable-name
  date_to = new Date();
  // tslint:disable-next-line:variable-name
  date_from = new Date();
  // tslint:disable-next-line:variable-name
  moc_thoi_gian = 't_assigned';
  // tslint:disable-next-line:variable-name
  child_depart = '';
  type = '';
  state = '';
  dataNew: any;
  thu: number[];
  btest: number;
  ctest: number;
  dtest: number;
  etest: number;
  atest: number[];

  // bieu do doughnut
  public doughnutChartLabels: Label[] = ['Chưa Làm', 'Đang làm', 'Chờ Review', 'Hoàn Tất'];
  public doughnutChartData1: MultiDataSet = [[0, 0, 0, 0],  ];
  public doughnutChartColors = [{ backgroundColor: ['rgb(109,188,231)', 'rgb(26,255,0)', 'rgb(252,218,5)', 'rgb(255,0,0)'], }, ];
  public doughnutChartType: ChartType = 'doughnut';
  // @ts-ignore
  public doughnutChartOptions: ChartOptions = {
    cutoutPercentage: 60, // khoang cach tu vong toi tam
    devicePixelRatio: 5,
    responsive: true,
    tooltips: {
      bodyFontSize: 20,
    },
    legend: {
      position: 'right',
      align: 'center',
      labels: {
        fontSize: 15,
        boxWidth: 15,
        // padding: 10,
      },
    },
    // // layout: {
    // //   padding: {
    // //     left: 20,
    // //     right: 20,
    // //     top: 0,
    // //     bottom: 0,
    // //   }
    // },

  };


  output =
    {
      du_an:
        {
          tong_du_an: 50,
          du_an_hoan_thanh: 15,
          du_an_chua_hoan_thanh: 35,
        },
      cong_viec:
        {
          tong_cong_viec: 2452,
          cong_viec_hoan_thanh: 2000,
          cong_viec_chua_hoan_thanh: 452,
        },
      thanh_vien:
        {
          tong_so_thanh_vien: 7000,
        },
      state: {
        chua_lam: 500,
        dang_lam: 600,
        cho_review: 400,
        da_hoan_thanh: 952,
      },
      thanh_vien_xuat_sac: [
        {
          ho_va_ten: 'Nguyễn Văn A',
          cong_viec_da_hoan_thanh: '40',
          tong_cong_viec_duoc_giao: '100',
          ti_le_phan_tram: '40'
        },
        {
          ho_va_ten: 'Nguyễn Văn B',
          cong_viec_da_hoan_thanh: '35',
          tong_cong_viec_duoc_giao: '100',
          ti_le_phan_tram: '35'
        },
        {
          ho_va_ten: 'Nguyễn Văn C',
          cong_viec_da_hoan_thanh: '30',
          tong_cong_viec_duoc_giao: '100',
          ti_le_phan_tram: '30'
        },
        {
          ho_va_ten: 'Nguyễn Văn D',
          cong_viec_da_hoan_thanh: '25',
          tong_cong_viec_duoc_giao: '100',
          ti_le_phan_tram: '25'
        },
        {
          ho_va_ten: 'Nguyễn Văn E',
          cong_viec_da_hoan_thanh: '20',
          tong_cong_viec_duoc_giao: '100',
          ti_le_phan_tram: '20'
        },
      ],
    };

  content = {
    email: '',
    date_from: '',
    date_to: '',
    moc_thoi_gian: '',
    child_depart: '',
    kieu_cv: '1',
    state: '',
  };

  // content = {
  //   email: 'phuongnam.linhtd1@fpt.net',
  //   moc_thoi_gian: 't_assigned',
  //   child_depart: 'PDX',
  //   state: '3',
  //   kieu_cv: '1',
  //   date_from: '01/03/2021 00:00:00',
  //   date_to: '01/06/2021 00:00:00'
  // };


  ngOnInit(): void {
    this.capnhat();
  }

  capnhat() {
    const email = this.authService.getEmailUser();
    const d1 = new Date(this.date_from);
    const datef = [String(d1.getDate()), String(d1.getMonth() + 1), d1.getFullYear()].join('/');
    const df = datef + ' ' + '00:00:00';
    const d2 = new Date(this.date_to);
    const datet = [String(d2.getDate()), String(d2.getMonth() + 1), d2.getFullYear()].join('/');
    const dt = datet + ' ' + '23:59:59';
    Object.keys(this.content).forEach((key) => {
      if (key === 'email') {
        this.content[key] = email;
      }
      else if (key === 'date_from') {
        this.content[key] = df;
      }
      else if (key === 'date_to') {
        this.content[key] = dt;
      }
      else {
        this.content[key] = this[key];
      }
  });
    console.log(this.content);
    this.tasksService.layBaocao(this.content).subscribe((res) => {
      console.log(res);
      // @ts-ignore
      this.dataNew = res.msg;
      this.btest = this.dataNew.tong_trangthai.sl_cv_cl;
      this.ctest = this.dataNew.tong_trangthai.sl_cv_dangl;
      this.dtest = this.dataNew.tong_trangthai.sl_cv_dal;
      this.etest = this.dataNew.tong_trangthai.sl_cv_c_review;
      this.doughnutChartData1 = [[this.btest, this.ctest, this.dtest, this.etest], ];
      console.log(this.atest);
      console.log(this.btest);

    });
  }



  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }
}
