import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { ViewComponent } from './view.component';
import { ViewService } from './view.service';

@NgModule({
  imports: [CommonModule, AppCommonModule],
  declarations: [ViewComponent],
  providers: [ViewService],
  exports: [ViewComponent],
})
export class ViewModule {}
