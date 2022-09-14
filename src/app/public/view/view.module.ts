import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewComponent } from './view.component';
import { ViewService } from './view.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ViewComponent],
  providers: [ViewService],
  exports: [ViewComponent],
})
export class ViewModule {}
