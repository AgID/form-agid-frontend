import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { IdentificaAmministrazioneComponent } from './identifica-amministrazione.component';
import { IdentificaAmministrazioneService } from './identifica-amministrazione.service';

@NgModule({
  imports: [CommonModule, AppCommonModule],
  declarations: [IdentificaAmministrazioneComponent],
  providers: [IdentificaAmministrazioneService],
})
export class IdentificaAmministrazioneModule {}
