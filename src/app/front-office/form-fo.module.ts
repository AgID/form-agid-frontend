import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { MarkdownModule } from 'ngx-markdown';
import { AppCommonModule } from '../common/app-common.module';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';
import { DettaglioFormFoComponent } from './elenco-form/dettaglio/dettaglio-form.component';
import { DettaglioSottomissioneComponent } from './elenco-form/dettaglio/dettaglio-sottomissione/dettaglio-sottomissione.component';
import { SezioneInformativaHomeComponent } from './elenco-form/dettaglio/dichiarazione-accessibilita/sezione-informativa-home.component';
import { FaqComponent } from './elenco-form/dettaglio/faq/faq.component';
import { NuovaSottomissioneComponent } from './elenco-form/dettaglio/nuova-sottomissione/nuova-sottomissione.component';
import { RicercaSottomissioniComponent } from './elenco-form/dettaglio/ricerca-sottomissioni/ricerca-sottomissioni.component';
import { ElencoFormFoComponent } from './elenco-form/elenco-form.component';
import { ROUTES } from './form-fo.routes';
import { FormFoService } from './form-fo.service';
import { HomeComponent } from './home/home.component';
import { VerificaMailModule } from './verifica-mail/verifica-mail.module';
import { VerificaOtpModule } from './verifica-otp/verifica-otp.module';

@NgModule({
  declarations: [
    HomeComponent,
    ElencoFormFoComponent,
    DettaglioFormFoComponent,
    NuovaSottomissioneComponent,
    RicercaSottomissioniComponent,
    DettaglioSottomissioneComponent,
    FaqComponent,
    SezioneInformativaHomeComponent,
  ],
  providers: [FormFoService],
  imports: [
    CommonModule,
    AppCommonModule,
    VerificaMailModule,
    VerificaOtpModule,
    GestioneDichiarazioniModule,
    FormioModule,
    RouterModule.forChild(ROUTES),
    MarkdownModule.forChild(),
  ],
})
export class FormFoModule {}
