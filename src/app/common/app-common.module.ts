import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';
import { AlertComponent } from './alert/alert.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [PaginatorComponent, AlertComponent],
  imports: [CommonModule, GestioneDichiarazioniModule],
  exports: [PaginatorComponent, AlertComponent],
})
export class AppCommonModule {}
