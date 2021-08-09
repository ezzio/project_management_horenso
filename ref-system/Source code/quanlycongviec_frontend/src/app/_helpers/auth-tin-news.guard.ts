import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, Router,
} from '@angular/router';

import { AuthService } from '../_services/auth/auth.service';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthTinNewsGuard implements CanActivate {
    readonly baseUrl = environment.backendUrl;
    constructor(private authService: AuthService,
        private router: Router) { }
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
            const dt = await this.authService.getBranchUser(this.authService.getEmailUser());
            if (dt[0].branch === 'TIN') {
                return true;
            } else {
                this.router.navigate(['api/auth/login']);
                return false;
            }
    }
}
