import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '../../../_helpers/auth.guard';
import {TestWebsocketComponent} from './test-websocket/test-websocket.component';


export const mainPageRoutes: Routes = [
  {path: 'api/auth/home', component: HomeComponent},
  {path: 'api/auth/login', component: LoginComponent},
  // tslint:disable-next-line:max-line-length
  {path: 'websocket', component: TestWebsocketComponent},
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    RouterModule.forChild(mainPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainpagesRoutingModule {
}
