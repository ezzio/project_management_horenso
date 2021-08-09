import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router,
} from '@angular/router';
import {Observable} from 'rxjs';
import { SocialLoginService } from '../_services/auth/sociallogin.service';

@Injectable({ providedIn: 'root' })
export class AuthSocialGuard implements CanActivate {
  constructor(private socialLoginService: SocialLoginService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.socialLoginService.checkSocialLogin()) {
      return true;
    } else {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
