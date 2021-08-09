import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthPncNewsGuard implements CanActivate {
    readonly baseUrl = environment.backendUrl;
    constructor(private authService: AuthService, private router: Router) { }
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const dt = await this.authService.getBranchUser(this.authService.getEmailUser());
        if (dt[0].branch === 'PNC') {
            return true;
        } else {
            this.router.navigate(['api/auth/login']);
            return false;
        }
    }
}
