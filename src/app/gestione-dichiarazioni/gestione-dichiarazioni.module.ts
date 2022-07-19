import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioModule } from '@formio/angular';
import { GestioneDichiarazioniComponent } from './gestione-dichiarazioni.component';

@NgModule({
  declarations: [GestioneDichiarazioniComponent],
  imports: [CommonModule, FormioModule],
  exports: [GestioneDichiarazioniComponent],
})
export class GestioneDichiarazioniModule {}
