import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {LocalStorageService} from 'angular-2-local-storage';
import {AuthService} from '../../_services/auth/auth.service';
import {SocialLoginService} from '../../_services/auth/sociallogin.service';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public title = 'authlogin';
  public redirectUrl = environment.redirectUrl;
  public isLoggedIn: boolean;
  public isSocialLoggedIn = false;
  public socialUser: SocialUser;
  public isBook: boolean;
  public isVideo: boolean;
  public isMobile: boolean;
  constructor(private storage: LocalStorageService,
              private authService: AuthService,
              private socialLoginService: SocialLoginService,
              private socialAuthService: SocialAuthService,
              private router: Router, private route: ActivatedRoute) {
    this.isLoggedIn = this.authService.checkCredentials();
    this.isSocialLoggedIn = this.socialLoginService.checkSocialLogin();
    const a = window.location.href;
    if (a.includes('su-ky-thu-dong')){
      this.isBook = true;
    }
    if (a.includes('videodetail')){
      this.isVideo = true;
    }
    if (a.includes('mobile')){
      this.isMobile = true;
    }
  }

  public ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
