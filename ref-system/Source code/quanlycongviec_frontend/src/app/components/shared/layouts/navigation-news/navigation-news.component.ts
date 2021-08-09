import {Component, NgZone, OnInit} from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import {NavigationStart, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SocialLoginService} from '../../../../_services/auth/sociallogin.service';

@Component({
  selector: 'app-navigation-news',
  templateUrl: './navigation-news.component.html',
  styleUrls: ['./navigation-news.component.css'],
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
export class NavigationNewsComponent implements OnInit {
  isLoggedIn: boolean;
  isSocialLoggedIn: boolean;
  menuState = 'out';
  mobile = false;
  constructor(private authService: AuthService, private router: Router, private socialLoginService: SocialLoginService,
              public zone: NgZone) {
    router.events.subscribe( (event) => {
      if (event instanceof NavigationStart) {
        this.menuState = 'out';
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.checkCredentials();
    this.isSocialLoggedIn = this.socialLoginService.checkSocialLogin();
    if (window.location.href.includes('mobile')){
      this.mobile = true;
    }
  }
  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
