import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {environment} from '../../../environments/environment';
import {Cookie} from 'ng2-cookies';

@Injectable({providedIn: 'root'})
export class SocialLoginService {

  public readonly logoutUrl = environment.logoutUrl;
  public redirectUrl = environment.redirectUrl;

  public socialUser: SocialUser;
  public isSocialLoggedIn: boolean;

  constructor(
    private socialAuthService: SocialAuthService) {
  }

  public setSocialUser(user: any) {
    console.log('user', user);
    this.socialUser = user;
  }

  public setSocialLogin(bool: boolean) {
    this.isSocialLoggedIn = bool;
  }

  public checkSocialLogin() {
//     return this.isSocialLoggedIn;
    return Cookie.check('access_token_social');
  }

  public signInWithFB(): void {
    Cookie.delete('access_token');
    Cookie.delete('id_token');
    Cookie.delete('access_token_social');
    Cookie.delete('id_token_social');
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user: any) => {
      if (user) {
        this.socialUser = user;
        this.isSocialLoggedIn = (user != null);
        this.setSocialLogin(this.isSocialLoggedIn);
        this.setSocialUser(this.socialUser);
        this.saveToken(this.socialUser);
      }
    });
  }

  public signInWithGoogle(): void {
    Cookie.delete('access_token');
    Cookie.delete('id_token');
    Cookie.delete('access_token_social');
    Cookie.delete('id_token_social');
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user: any) => {
      if (user) {
        this.socialUser = user;
        this.isSocialLoggedIn = (user != null);
        this.setSocialLogin(this.isSocialLoggedIn);
        this.setSocialUser(this.socialUser);
        this.saveToken(this.socialUser);
      }
    });
  }

  public getUsernameSocial() {
    return Cookie.get('user_name');
  }

  public getEmailSocial() {
    return Cookie.get('user_email');
    // return this.socialUser.email;
  }

  public getToken() {
    return this.socialUser.authToken;
  }

  public signOut() {
    Cookie.deleteAll();
    Cookie.delete('access_token_social');
    Cookie.delete('id_token_social');
    this.socialAuthService.signOut();
    window.location.href = this.redirectUrl;
  }

  public saveToken(user) {
    const expireDate = new Date().getTime() + (1000 * 36000);
    Cookie.delete('access_token_social');
    Cookie.delete('id_token_social');
    Cookie.delete('user_name');
    Cookie.delete('user_email');
    Cookie.set('access_token_social', user.authToken, expireDate);
    Cookie.set('id_token_social', user.idToken, expireDate);
    Cookie.set('user_name', user.name);
    Cookie.set('user_email', user.email);
    console.log('Obtained Access token social');
    window.location.href = this.redirectUrl;
  }

}
