import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../../../../_services/auth/auth.service';
import {UserService} from '../../../../_services/data/user.service';
import {NavigationStart, Router} from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SocialLoginService } from 'src/app/_services/auth/sociallogin.service';
import {TasksService} from "../../../../_services/data/tasks.service";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class NavigationComponent implements OnInit, AfterViewInit {
  showText1 = false;
  menuState = 'out';
  accMenuState = 'out';
  public rightEmp: any;
  public rightCheckin: any;
  public rightChetai: any;
  public rightCareer: any;
  public rightLuong: any;
  public rightNews: any;
  public rightLibrary: any;
  public rightEdu: any;
  public rightTicket: any;
  public rightAtld: any;
  public rightGame: any;
  superAdmin: any;
  public mobile: boolean;
  public isNgPv: string;
  isLogin: any;
  userMail = sessionStorage.getItem('getUser');
  dataNoti: any;
  lengthNoti: any;
  constructor(private authService: AuthService, private router: Router,
              public zone: NgZone, private userService: UserService, private taskService: TasksService,
              private socialLoginService: SocialLoginService) {
    router.events.subscribe( (event) => {
      if (event instanceof NavigationStart) {
        this.menuState = 'out';
        this.accMenuState = 'out';
      }
    });
  }
  ngOnInit() {
    const content = {
      email: this.userEmail
    };
    this.taskService.getNoti(content).subscribe((res) => {
      // @ts-ignore
      this.dataNoti = res.msg.data;
      // @ts-ignore
      this.lengthNoti = res.msg.count;
      console.log(this.lengthNoti);
    });
    // this.rightUser();
    if (window.location.href.includes('mobile')){
      this.mobile = true;
    }
  }
  ngAfterViewInit() {
    if (sessionStorage.getItem('isLoggedIn') === "true"){
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    document.getElementById('lgMenu').classList.toggle('is-active');
  }

  toggleAccMenu(){
    this.accMenuState = this.accMenuState === 'out' ? 'in' : 'out';

  }
  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
  get userName() {
      return this.authService.getUsername();
  }
  get userEmail() {
      return this.authService.getEmailUser();
  }
  getNotify(){
    const a = document.getElementById('noti').classList;
    if (a.contains('have-noti')) {
      a.remove('have-noti');
    }
    else {
      a.add('have-noti');
    }
    const content = {
      email: this.userEmail
    };
    this.taskService.getNoti(content).subscribe((res) => {
      // @ts-ignore
      this.dataNoti = res.msg.data;
      // @ts-ignore
      this.lengthNoti = res.msg.count;
    });
  }

  updateSta(c){
    const content = {
      email: this.userEmail,
      id_task: c
    };
    this.taskService.updateStatus(content).subscribe((res) => {
      // tslint:disable-next-line:no-shadowed-variable
      const content = {
        email: this.userEmail
      };
      // tslint:disable-next-line:no-shadowed-variable
      this.taskService.getNoti(content).subscribe((res) => {
        // @ts-ignore
        this.dataNoti = res.msg.data;
        // @ts-ignore
        this.lengthNoti = res.msg.count;
      });
      // @ts-ignore
      document.getElementById('noti').classList.remove('have-noti');
    });
  }

  // rightUser(){
  //   this.userService.isUserRightForUser().subscribe((res) => {
  //     if (res){
  //       this.rightEmp = res.empRight;
  //       this.rightCheckin = res.checkinRight;
  //       this.rightChetai = res.chetaiRight;
  //       this.rightCareer = res.careerRight;
  //       this.rightLuong = res.luongRight;
  //       this.rightLibrary = res.libraryRight;
  //       this.rightEdu = res.eduRight;
  //       this.rightNews = res.newsRight;
  //       this.rightTicket = res.ticketRight;
  //       this.rightAtld = res.atldRight;
  //       this.rightGame = res.gameRight;
  //       this.superAdmin = res.superAdmin;
  //       this.isNgPv = res.comment;
  //     }
  //   });
  // }

}
