import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { CambioEnteComponent } from './cambio-ente.component';
import { CambioEnteService } from './cambio-ente.service';

@NgModule({
  imports: [CommonModule, AppCommonModule],
  declarations: [CambioEnteComponent],
  providers: [CambioEnteService],
})
export class CambioEnteModule {}