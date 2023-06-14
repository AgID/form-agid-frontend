import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { ProceduraAttuazioneAccessibilitaComponent } from './procedura-attuazione.component';
import { ProceduraAttuazioneAccessibilitaService } from './procedura-attuazione.service';
import { VerificaOtpModule } from 'src/app/front-office/verifica-otp/verifica-otp.module';

@NgModule({
  imports: [CommonModule, AppCommonModule, VerificaOtpModule],
  declarations: [ProceduraAttuazioneAccessibilitaComponent],
  providers: [ProceduraAttuazioneAccessibilitaService],
  exports: [ProceduraAttuazioneAccessibilitaComponent],
})
export class ProceduraAttuazioneAccessibilitaModule {}
