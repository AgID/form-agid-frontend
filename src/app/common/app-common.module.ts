import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';
import { AlertComponent } from './alert/alert.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PaginatorComponent, AlertComponent],
  imports: [
    CommonModule,
    GestioneDichiarazioniModule,
    NgxSpinnerModule,
    RouterModule,
  ],
  exports: [PaginatorComponent, AlertComponent, NgxSpinnerModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
})
export class AppCommonModule {}
