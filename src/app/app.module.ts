import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormioAppConfig } from '@formio/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { FooterModule } from './footer/footer.module';
import { FormioBuilderModule } from './formio-builder/formio-builder.module';
import { HeaderModule } from './header/header.module';
import { FormModule } from './back-office/form.module';
import { CommonModule } from '@angular/common';
import { FormFoModule } from './front-office/form-fo.module';

const AppConfig = {};
@NgModule({
  declarations: [AppComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormioBuilderModule,
    FormModule,
    FormFoModule,
    HeaderModule,
    FooterModule,
    CommonModule,
  ],
  providers: [{ provide: FormioAppConfig, useValue: AppConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
