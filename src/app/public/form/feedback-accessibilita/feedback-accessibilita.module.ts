import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { FeedbackAccessibilitaComponent } from './feedback-accessibilita.component';
import { FeedbackAccessibilitaService } from './feedback-accessibilita.service';

@NgModule({
  imports: [CommonModule, AppCommonModule],
  declarations: [FeedbackAccessibilitaComponent],
  providers: [FeedbackAccessibilitaService],
  exports: [FeedbackAccessibilitaComponent],
})
export class FeedbackAccessibilitaModule {}
