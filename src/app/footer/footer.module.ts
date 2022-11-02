import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { AppCommonModule } from '../common/app-common.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, AppCommonModule],
  exports: [FooterComponent],
})
export class FooterModule {}
