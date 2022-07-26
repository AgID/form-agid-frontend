import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { AppCommonModule } from '../common/app-common.module';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';
import { DichiarazioneComponent } from './dichiarazione/dichiarazione.component';
import { DettaglioFormFoComponent } from './elenco-form/dettaglio/dettaglio-form.component';
import { DettaglioSottomissioneComponent } from './elenco-form/dettaglio/dettaglio-sottomissione/dettaglio-sottomissione.component';
import { FormDichiarazioneAccessibilitaComponent } from './elenco-form/dettaglio/dichiarazione-accessibilita/dichiarazione-accessibilita.component';
import { FaqComponent } from './elenco-form/dettaglio/faq/faq.component';
import { NuovaSottomissioneComponent } from './elenco-form/dettaglio/nuova-sottomissione/nuova-sottomissione.component';
import { RicercaSottomissioniComponent } from './elenco-form/dettaglio/ricerca-sottomissioni/ricerca-sottomissioni.component';
import { ElencoFormFoComponent } from './elenco-form/elenco-form.component';
import { ROUTES } from './form-fo.routes';
import { FormFoService } from './form-fo.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    DichiarazioneComponent,
    HomeComponent,
    ElencoFormFoComponent,
    DettaglioFormFoComponent,
    NuovaSottomissioneComponent,
    RicercaSottomissioniComponent,
    DettaglioSottomissioneComponent,
    FaqComponent,
    FormDichiarazioneAccessibilitaComponent,
  ],
  providers: [FormFoService],
  imports: [
    CommonModule,
    AppCommonModule,
    GestioneDichiarazioniModule,
    FormioModule,
    RouterModule.forChild(ROUTES),
  ],
})
export class FormFoModule {}
