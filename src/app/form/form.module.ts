import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { AppCommonModule } from '../common/app-common.module';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, AppCommonModule],
})
export class FormModule {}
