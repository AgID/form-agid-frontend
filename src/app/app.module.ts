import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormioAppConfig } from '@formio/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitializer } from './app.inizializer';
import { AppInterceptor } from './app.interceptor';
import { FormModule } from './back-office/form.module';
import { AppCommonModule } from './common/app-common.module';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { FooterModule } from './footer/footer.module';
import { FormFoModule } from './front-office/form-fo.module';
import { HeaderModule } from './header/header.module';
import { NgChartsModule } from 'ng2-charts';
import { ViewModule } from './public/view/view.module';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';
import { NotFoundComponent } from './public/not-found/not-found.component';
import { FeedbackAccessibilitaModule } from './public/form/feedback-accessibilita/feedback-accessibilita.module';
import { ProceduraAttuazioneAccessibilitaModule } from './public/form/procedura-attuazione/procedura-attuazione.module';
import { CambioEnteModule } from './front-office/cambio-ente/cambio-ente.module';

const AppConfig = {};

@NgModule({
  declarations: [AppComponent, BreadcrumbComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormModule,
    FormFoModule,
    HeaderModule,
    FooterModule,
    CommonModule,
    AppCommonModule,
    CambioEnteModule,
    ViewModule,
    FeedbackAccessibilitaModule,
    ProceduraAttuazioneAccessibilitaModule,
    NoopAnimationsModule,
    TranslateModule.forRoot(),
    NgChartsModule,
    NgDompurifyModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializer,
      deps: [TranslateService, HttpClient],
      multi: true,
    },
    { provide: FormioAppConfig, useValue: AppConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
