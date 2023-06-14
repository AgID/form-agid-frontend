import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { FeedbackAccessibilitaComponent } from './feedback-accessibilita.component';
import { FeedbackAccessibilitaService } from './feedback-accessibilita.service';
import { VerificaOtpModule } from 'src/app/front-office/verifica-otp/verifica-otp.module';

@NgModule({
  imports: [CommonModule, AppCommonModule, VerificaOtpModule],
  declarations: [FeedbackAccessibilitaComponent],
  providers: [FeedbackAccessibilitaService],
  exports: [FeedbackAccessibilitaComponent],
})
export class FeedbackAccessibilitaModule {}
