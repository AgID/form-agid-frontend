import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { ProceduraAttuazioneAccessibilitaComponent } from './procedura-attuazione.component';
import { ProceduraAttuazioneAccessibilitaService } from './procedura-attuazione.service';

@NgModule({
  imports: [CommonModule, AppCommonModule],
  declarations: [ProceduraAttuazioneAccessibilitaComponent],
  providers: [ProceduraAttuazioneAccessibilitaService],
  exports: [ProceduraAttuazioneAccessibilitaComponent],
})
export class ProceduraAttuazioneAccessibilitaModule {}
