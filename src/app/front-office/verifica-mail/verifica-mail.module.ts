import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';

import { VerificaMailComponent } from './verifica-mail.component';
import { VerificaMailService } from './verifica-mail.service';

@NgModule({
  imports: [CommonModule, AppCommonModule],
  declarations: [VerificaMailComponent],
  providers: [VerificaMailService],
})
export class VerificaMailModule {}
