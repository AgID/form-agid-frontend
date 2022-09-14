import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  SecurityContext,
} from '@angular/core';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';
import { AlertComponent } from './alert/alert.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { FormioRenderComponent } from './formio/formiojs-render/formio-render.component';
import { FormioBuilderComponent } from './formio/formiojs-builder/formio-builder.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth-config';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { MarkdownModule } from 'ngx-markdown';

// We need a factory, since localStorage is not available during AOT build time.
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    PaginatorComponent,
    AlertComponent,
    FormioRenderComponent,
    FormioBuilderComponent,
    InputComponent,
    TextareaComponent,
  ],
  imports: [
    CommonModule,
    FormioModule,
    GestioneDichiarazioniModule,
    NgxSpinnerModule,
    RouterModule,
    OAuthModule.forRoot(),
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
  ],
  exports: [
    PaginatorComponent,
    AlertComponent,
    NgxSpinnerModule,
    FormioRenderComponent,
    FormioBuilderComponent,
    InputComponent,
    TextareaComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    { provide: AuthConfig, useValue: authConfig },
    { provide: OAuthStorage, useFactory: storageFactory },
    {
      provide: APP_INITIALIZER,
      useFactory: (initialAuthService: AuthService) => () =>
        initialAuthService.initAuth(),
      deps: [AuthService],
      multi: true,
    },
  ],
})
export class AppCommonModule {}
