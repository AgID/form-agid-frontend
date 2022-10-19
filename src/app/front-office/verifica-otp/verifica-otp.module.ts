import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { VerificaOtpComponent } from './verifica-otp.component';
import { VerificaOtpService } from './verifica-otp.service';

@NgModule({
  imports: [CommonModule, AppCommonModule],
  declarations: [VerificaOtpComponent],
  providers: [VerificaOtpService],
})
export class VerificaOtpModule {}
