import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  SecurityContext,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { MarkdownModule } from 'ngx-markdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';
import { AlertComponent } from './alert/alert.component';
import { authConfig } from './auth/auth-config';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ControlAccessDirective } from './auth/control-access.directive';
import { TokenInterceptor } from './auth/token.interceptor';
import { FormioBuilderComponent } from './formio/formiojs-builder/formio-builder.component';
import { FormioRenderComponent } from './formio/formiojs-render/formio-render.component';
import { InputComponent } from './input/input.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerInterceptor } from './spinner.interceptor';
import { TextareaComponent } from './textarea/textarea.component';

// We need a factory, since localStorage is not available during AOT build time.
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ControlAccessDirective,
    PaginatorComponent,
    AlertComponent,
    FormioRenderComponent,
    FormioBuilderComponent,
    InputComponent,
    TextareaComponent,
    LanguageSelectorComponent,
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
  exports: [
    PaginatorComponent,
    AlertComponent,
    NgxSpinnerModule,
    FormioRenderComponent,
    FormioBuilderComponent,
    InputComponent,
    TextareaComponent,
    LanguageSelectorComponent,
    ControlAccessDirective,
    TranslateModule,
  ],
})
export class AppCommonModule {}
