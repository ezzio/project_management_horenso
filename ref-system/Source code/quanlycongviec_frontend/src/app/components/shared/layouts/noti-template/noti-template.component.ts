import {Component, Directive, OnInit} from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { TbvpService } from 'src/app/_services/data/tbvp.service';

@Component({
  selector: 'app-noti-template',
  templateUrl: './noti-template.component.html',
  styleUrls: ['./noti-template.component.css']
})

export class NotiTemplateComponent implements OnInit {
  isDown = false;
  numberOfTicket: number;
  numberOfCTP: number;
  numberOfTU: number;
  constructor(private authService: AuthService, private tbvpService: TbvpService) { }
  ngOnInit(): void {
    this.getListNotification();
  }
  slideDownUp() {
    this.isDown = !this.isDown;
    const element = document.getElementById('slide-content');
    if (this.isDown){
      element.classList.add('slide-down');
      element.classList.remove('slide-up');
    } else {
      element.classList.add('slide-up');
      element.classList.remove('slide-down');
    }

  }
  outSide(e: Event){
    if (e){
      const element = document.getElementById('slide-content');
      element.classList.add('slide-up');
      element.classList.remove('slide-down');
    }
  }
  getListNotification(){
    this.tbvpService.getPendingTicket(this.authService.getEmailUser()).subscribe((res) => {
      // @ts-ignore
      if (res && res.result){
        // @ts-ignore
        this.numberOfTicket = res.result.length;
      }
    });
  }
}
