import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormioAppConfig } from '@formio/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { FooterModule } from './footer/footer.module';
import { FormModule } from './form/form.module';
import { FormioBuilderModule } from './formio-builder/formio-builder.module';
import { GestioneDichiarazioniModule } from './gestione-dichiarazioni/gestione-dichiarazioni.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { RenderModule } from './render/render.module';

const AppConfig = {};

@NgModule({
  declarations: [AppComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FormioBuilderModule,
    FormModule,
    GestioneDichiarazioniModule,
    RenderModule,
    HeaderModule,
    FooterModule,
  ],
  providers: [{ provide: FormioAppConfig, useValue: AppConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
