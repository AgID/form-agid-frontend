import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModificaFormComponent } from './modifica/modifica-form.component';
import { SezioneBuilderComponent } from './components/sezione-builder/sezione-builder.component';
import { SezioneMetadatiComponent } from './components/sezione-metadati/sezione-metadati.component';
import { InserimentoFormComponent } from './inserimento/inserimento-form.component';
import { RicercaFormComponent } from './components/ricerca-form/ricerca-form.component';
import { RisultatiFormComponent } from './components/risultati-form/risultati-form.component';
import { ElencoFormComponent } from './elenco-form/elenco-form.component';
import { ContenutiDinamiciComponent } from './modifica/contenuti-dinamici/contenuti-dinamici.component';
import { DettaglioFormComponent } from './dettaglio/dettaglio-form.component';
import { AppCommonModule } from '../common/app-common.module';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormioModule } from '@formio/angular';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';

@NgModule({
  declarations: [
    ElencoFormComponent,
    RicercaFormComponent,
    RisultatiFormComponent,
    ModificaFormComponent,
    InserimentoFormComponent,
    SezioneBuilderComponent,
    SezioneMetadatiComponent,
    ContenutiDinamiciComponent,
    DettaglioFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppCommonModule,
    HttpClientModule,
    FormioModule,
    GestioneDichiarazioniModule,
  ],
  providers: [HttpClient, DatePipe],
})
export class FormModule {}
