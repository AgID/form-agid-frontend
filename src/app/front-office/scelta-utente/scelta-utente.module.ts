import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { SceltaUtenteComponent } from './scelta-utente.component';
import { SceltaUtenteService } from './scelta-utente.service';

@NgModule({
  imports: [CommonModule, AppCommonModule],
  declarations: [SceltaUtenteComponent],
  providers: [SceltaUtenteService],
})
export class SceltaUtenteModule {}
