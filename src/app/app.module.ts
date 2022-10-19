import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormioAppConfig } from '@formio/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { FormModule } from './back-office/form.module';
import { CommonModule } from '@angular/common';
import { FormFoModule } from './front-office/form-fo.module';
import { AppCommonModule } from './common/app-common.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ViewComponent } from './public/view/view.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';

const AppConfig = {};

@NgModule({
  declarations: [AppComponent, BreadcrumbComponent, ViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormModule,
    FormFoModule,
    HeaderModule,
    FooterModule,
    CommonModule,
    AppCommonModule,
    NoopAnimationsModule,
  ],
  providers: [
    { provide: FormioAppConfig, useValue: AppConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
