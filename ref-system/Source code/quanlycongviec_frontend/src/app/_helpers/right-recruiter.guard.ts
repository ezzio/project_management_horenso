import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../_services/data/user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RightRecruiterGuard implements CanActivate {
  right = false;
  constructor(private userService: UserService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url;
    return this.userService.isUserRightForUser().pipe(map((response) => {
      const dt = response;
      if (url.includes('recruiter')) {
        if (dt.comment === '1'){
          this.right = true;
        } else if (dt.comment === '0') {
          this.right = false;
        }
      }
      if (this.right) {
        return true;
      } else {
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }));
  }
}
