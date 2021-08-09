import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, ExtraOptions} from '@angular/router';
import {HomeComponent} from './components/pages/mainpages/home/home.component';
import {BookComponent} from './components/pages/book/book.component';
import {TestWebsocketComponent} from './components/pages/mainpages/test-websocket/test-websocket.component';
import {LoginComponent} from './components/pages/mainpages/login/login.component';
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'},
  {path: 'home', component: LoginComponent},
  {path: 'login', component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing: false, useHash: false, anchorScrolling: 'enabled', preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
