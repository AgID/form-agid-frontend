import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormioModule } from '@formio/angular';
import { FormioBuilderComponent } from './formio-builder.component';

@NgModule({
  declarations: [
    FormioBuilderComponent,
  ],
  imports: [
    BrowserModule, 
    CommonModule,
    FormioModule,
  ]
})
export class FormioBuilderModule { }
