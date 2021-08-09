import {Component, OnInit} from '@angular/core';
import {EventSettingsModel} from '@syncfusion/ej2-angular-schedule';
import {ScheduleService} from '../../../../_services/data/schedule.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    public data: any;
    public selectedDate: Date = new Date();
    eventSettings: EventSettingsModel;

    constructor(private scheduleService: ScheduleService, private datePipe: DatePipe,
                private toastr: ToastrService) {
    this.eventSettings = {
        dataSource: this.data,
        fields: {
          id: 'event_id',
          subject: {name: 'event_name'},
          isAllDay: {name: 'isAllDay'},
          startTime: {name: 'start_time'},
          endTime: {name: 'end_time'},
        }
      };
    }

    ngOnInit(): void {
        this.getSchedule();
    }

    getSchedule() {
        this.scheduleService.getAllSchedule().subscribe((res) => {
            this.data = res;
            if (this.data) {
                this.data.forEach((item) => {
                    const startD = new Date(item.start_time);
                    const endD = new Date(item.end_time);
                    // tslint:disable-next-line:max-line-length
                    item.start_time = new Date(startD.getFullYear(), startD.getMonth(), startD.getDate(), startD.getHours() - 7, startD.getMinutes());
                    item.end_time = new Date(endD.getFullYear(), endD.getMonth(), endD.getDate(), endD.getHours() - 7, endD.getMinutes());
                    if (item.isAllDay === '1') {
                        item.isAllDay = true;
                    } else if (item.isAllDay === '0') {
                        item.isAllDay = false;
                    }
                    this.eventSettings = {
                        dataSource: this.data,
                        fields: {
                            id: 'event_id',
                            subject: {name: 'event_name'},
                            isAllDay: {name: 'isAllDay'},
                            startTime: {name: 'start_time'},
                            endTime: {name: 'end_time'},
                            location: {name: 'location'}
                        }
                    };
                });
            }
        });
    }

    onPopupOpen(e) {
        console.log(e);
    }

    convertDate(str) {
        const a = [str.getFullYear(), str.getMonth() + 1, str.getDate()].join('-');
        str = a + ' ' + str.toString().split(' ')[4];
        return str;
    }

    convertToLocalDate(str) {
        const a = new Date(str);
        const date = [a.getFullYear(), a.getMonth() + 1, a.getDate()].join('-');
        const time = [a.getHours(), a.getMinutes() + 1, a.getSeconds()].join(':');
        str = date + ' ' + time;
        return str;
    }

    onActionBegin(e) {
        console.log(e);
        switch (e.requestType) {
            case 'eventChange':
                e.data.start_time = this.convertDate(e.data.start_time);
                e.data.end_time = this.convertDate(e.data.end_time);
                this.scheduleService.updateSchedule(e.data.event_id, e.data).subscribe((res) => {
                    this.toastr.success('Cập nhập thành công');
                }, error => {
                    this.toastr.error('Cập nhập thất bại');
                });
                break;
            case 'eventCreate':
                const arr = ['emp_code', 'emp_name', 'location'];
                arr.forEach((i) => {
                    if (!e.data[0][i]) {
                        e.data[0][i] = '';
                    }
                });
                e.data[0].start_time = this.convertToLocalDate(e.data[0].start_time);
                e.data[0].end_time = this.convertToLocalDate(e.data[0].end_time);
                this.scheduleService.addSchedule(e.data[0]).subscribe((res) => {
                    console.log(res);
                    this.toastr.success('Thêm thành công');
                }, error => {
                    this.toastr.error('Thêm thất bại');
                });
                break;
            case 'eventRemove':
                this.scheduleService.deleteSchedule(e.data[0].event_id).subscribe((res) => {
                    this.toastr.success('Xoá thành công');
                }, error => {
                    this.toastr.error('Xoá thất bại');
                });
                break;
        }
    }
}
