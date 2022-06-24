import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderComponent } from '../render/render.component';
import { FormioModule } from '@formio/angular';

@NgModule({
  declarations: [RenderComponent],
  imports: [CommonModule, FormioModule],
})
export class RenderModule {}
