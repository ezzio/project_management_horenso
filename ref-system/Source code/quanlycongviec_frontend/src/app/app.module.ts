import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UniquePipe} from './_pipe/unique.pipe';
import {SearchPipe} from './_pipe/search.pipe';
import {ExportDirective} from './_directives/export.directive';
import {AuthService} from './_services/auth/auth.service';
import {JwtModule} from '@auth0/angular-jwt';
import {LocalStorageModule} from 'angular-2-local-storage';
import {ToastrModule} from 'ngx-toastr';
import {SendMailServices} from './_services/mail/send-mail.services';
import {SharedModule} from './components/shared/shared.module';
import {ShareButtonsConfig, ShareModule} from '@ngx-share/core';
import {SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import {environment} from 'src/environments/environment';
import {TbvpService} from './_services/data/tbvp.service';
import {PagesModule} from './components/pages/pages.module';
import {CustomMaxDirective} from './_directives/custom-max-validator.directive';
import {CustomMinDirective} from './_directives/custom-min-validator.directive';
import {InlineSVGModule} from 'ng-inline-svg';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {Cookie} from 'ng2-cookies';

const customConfig: ShareButtonsConfig = {
  include: ['facebook'],
  theme: 'circles-dark',
  autoSetMeta: true,
};

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    PagesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
    LocalStorageModule.forRoot({
      prefix: 'tutorial',
      storageType: 'localStorage'
    }),
    ToastrModule.forRoot(),
    ShareModule.withConfig(customConfig),
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    SendMailServices,
    TbvpService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookAppId),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  declarations: [
    AppComponent,
    UniquePipe,
    SearchPipe,
    ExportDirective,
    CustomMaxDirective,
    CustomMinDirective,
  ],
  exports: [
    AppComponent,
    CustomMaxDirective,
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export function jwtTokenGetter() {
  return Cookie.get('access_token');
}
