import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';
import { AlertComponent } from './alert/alert.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { FormioRenderComponent } from './formio/formiojs-render/formio-render.component';
import { FormioBuilderComponent } from './formio/formiojs-builder/formio-builder.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
})
export class AppCommonModule {}
