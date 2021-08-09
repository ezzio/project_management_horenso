import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment';
import {TableName} from 'src/app/_models/constants/tableName';
import {ActivatedRoute, Router} from '@angular/router';


@Injectable()
export class AuthService {
  readonly baseUrl = environment.backendUrl;
  public departmentTb = TableName.departmentTb;
  public employeeTb = TableName.employeeTb;
  public redirectUrl = environment.redirectUrl;
  readonly logoutUrl = environment.logoutUrl;
  a = 0;

  constructor(
    // tslint:disable-next-line:variable-name
    private _http: HttpClient, private jwtHelper: JwtHelperService, private router: Router,
    private route: ActivatedRoute) {
  }

  saveToken(token) {
    // tslint:disable-next-line:prefer-const
    // @ts-ignore
    // const expireDate = new Date().getTime() + (1000 * token.expires_in);
    // Cookie.set('access_token', token.access_token, expireDate);
    // Cookie.set('id_token', token.id_token, expireDate);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const expireDate = new Date(decodedToken.expired).getTime();
    Cookie.set('access_token', token, expireDate);
    const a = localStorage.getItem('redirectUrl');
    console.log(a);
    if (a) {
      localStorage.removeItem('redirectUrl');
      window.location.href = a;
    } else {
      if (this.redirectUrl.includes('/api/auth/')) {
        this.redirectUrl = this.baseUrl;
      }
      window.location.href = this.redirectUrl;
    }
  }

  get info() {
    const info = Cookie.get('oauth_token');
    // const info = Cookie.get('access_token');
    return this.jwtHelper.decodeToken(info);
  }

  checkCredentials(content?) {
    // return Cookie.check('access_token');
    if (content === 1 || content === undefined) {
      return true;
    }
    else if (content === 0) {
      return false;
    }
  }
  get infoToken() {
    const info = Cookie.get('access_token');
    return info;
  }

  logout() {
    const token = Cookie.get('id_token');
    Cookie.delete('access_token');
    Cookie.delete('oauth_token');
    Cookie.delete('id_token');
    Cookie.delete('access_token_social');
    Cookie.delete('id_token_social');
    localStorage.removeItem('redirectUrl');
    const logoutURL = this.logoutUrl
      + token
      + '&post_logout_redirect_uri=' + this.redirectUrl;
    window.location.href = logoutURL;
  }

  loginWithBE() {
    Cookie.delete('access_token');
    Cookie.delete('id_token');
    Cookie.delete('access_token_social');
    Cookie.delete('id_token_social');
    window.location.href = this.baseUrl + '/login';
  }

  getToken(str) {
    this._http.get(str).subscribe((res) => {
      // this.saveToken(res);
      // @ts-ignore
        const expireDate = new Date().getTime() + (1000 * res.expires_in);
        // @ts-ignore
        Cookie.set('oauth_token', res.access_token, expireDate);
        // @ts-ignore
        Cookie.set('id_token', res.id_token, expireDate);
        // @ts-ignore
        this.getTokenAPI(res.access_token).subscribe((r) => {
          // @ts-ignore
          this.testTokenAPI(r.token).subscribe((dt) => {
            // @ts-ignore
            if (dt.msg === 'OK') {
              // @ts-ignore
              this.saveToken(r.token);
            }
          });
        });
    });
  }

  getUsername() {
    if (this.info) {
      return this.info.unique_name[0];
    } else {
      return null;
    }
  }

  getEmailUser() {
    return sessionStorage.getItem('getUser');
  }

  getBranchUser(email) {
    const query = {
      query: 'Select a.branch from ' + this.departmentTb + ' a inner join ' + this.employeeTb + ' b on a.child_depart = b.child_depart where b.email = \'' + email + '\''
    };
    const a = this._http.post(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  getTokenAPI(token) {
    const content = {
      key: 'isuinevtgferlw01',
      iv: 'OKRs',
      token_oauth: token
    };
    return this._http.post('https://mytinpnc.vn/get_token2', content);
  }

  testTokenAPI(token) {
    const headers = {TOKEN: token};
    const content = {};
    return this._http.post('https://mytinpnc.vn/test_token2', content, {headers});
  }
}
