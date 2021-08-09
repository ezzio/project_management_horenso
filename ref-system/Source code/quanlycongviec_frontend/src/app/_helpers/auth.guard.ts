// import {Injectable} from '@angular/core';
// import {
//     CanActivate,
//     ActivatedRouteSnapshot,
//     RouterStateSnapshot, Router,
// } from '@angular/router';
// import {Observable} from 'rxjs';
// import {AuthService} from '../_services/auth/auth.service';
// import {Cookie} from 'ng2-cookies';
//
// @Injectable({providedIn: 'root'})
// export class AuthGuard implements CanActivate {
//     constructor(private authService: AuthService,
//                 private router: Router) {
//     }
//     // canActivate(
//     //     next: ActivatedRouteSnapshot,
//     //     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     //     console.log(this.authService.checkCredentials());
//     //     if (this.authService.checkCredentials() === true) {
//     //         return true;
//     //     } else {
//     //         localStorage.setItem('redirectUrl', '' + state.url);
//     //         this.router.navigate(['/api/auth/login']);
//     //         return false;
//     //     }
//     // }
//
//     canActivate() {
//       console.log(this.authService.checkCredentials());
//       if (this.authService.checkCredentials() === true) {
//         console.log(true);
//         return true;
//       } else {
//         console.log(false);
//         this.router.navigate(['/api/auth/login']);
//         return false;
//       }
//     }
// }
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class AuthGuard implements CanActivate{
  constructor(private router: Router){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  public isLoggedIn(){
    let status = false;
    if(sessionStorage.getItem('isLoggedIn') == "true"){
      status = true;
    }
    return status;
  }

}
