import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {AuthService} from '../../../../_services/auth/auth.service';
import {SocialLoginService} from '../../../../_services/auth/sociallogin.service';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;
  public isSocialLoggedIn = false;
  public socialUser: SocialUser;
  public readonly baseUrl = environment.backendUrl;
  constructor(private authService: AuthService,
              private socialLoginService: SocialLoginService, private router: Router, private titleService: Title) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle('MyTinPnc');
      }
    });
  }

  public ngOnInit() {
    this.isSocialLoggedIn = this.socialLoginService.checkSocialLogin();
    this.isLoggedIn = this.authService.checkCredentials();
    console.log(this.isLoggedIn);
    if (!this.isLoggedIn) {
      const arrayUrl = window.location.href.split('?');
      const strUrl = this.baseUrl  + '/auth?' + arrayUrl[1];
      this.authService.getToken(strUrl);
    }
  }
}
