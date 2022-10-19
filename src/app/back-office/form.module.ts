import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { AppCommonModule } from '../common/app-common.module';
import { GestioneDichiarazioniModule } from '../gestione-dichiarazioni/gestione-dichiarazioni.module';
import { RicercaFormComponent } from './components/ricerca-form/ricerca-form.component';
import { RicercaSottomissioniComponent } from './components/ricerca-sottomissioni/ricerca-sottomissioni.component';
import { RisultatiFormComponent } from './components/risultati-form/risultati-form.component';
import { SezioneBuilderComponent } from './components/sezione-builder/sezione-builder.component';
import { SezioneMetadatiComponent } from './components/sezione-metadati/sezione-metadati.component';
import { SezionePermessiComponent } from './components/sezione-permessi/sezione-permessi.component';
import { DettaglioFormComponent } from './dettaglio/dettaglio-form.component';
import { ElencoFormComponent } from './elenco-form/elenco-form.component';
import { GestioneUtenzeComponent } from './gestione-utenze/gestione-utenze.component';
import { InserimentoFormComponent } from './inserimento/inserimento-form.component';
import { SharedService } from './inserimento/shared.service';
import { ContenutiDinamiciComponent } from './modifica/contenuti-dinamici/contenuti-dinamici.component';
import { ModificaFormComponent } from './modifica/modifica-form.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { RicercaEtichetteComponent } from './components/ricerca-etichetta/ricerca-etichette.component';
import { ElencoEtichetteComponent } from './multilinguismo/elenco-etichette/elenco-etichette.component';
import { RisultatiEtichetteComponent } from './components/risultati-etichette/risultati-etichette.component';
import { ModificaEtichettaComponent } from './multilinguismo/modifica-etichetta/modifica-etichetta.component';
import { InserimentoEtichettaComponent } from './multilinguismo/inserimento-etichetta/inserimento-etichetta.component';

@NgModule({
  declarations: [
    ElencoFormComponent,
    ElencoEtichetteComponent,
    RicercaFormComponent,
    RicercaEtichetteComponent,
    RisultatiFormComponent,
    RisultatiEtichetteComponent,
    ModificaFormComponent,
    ModificaEtichettaComponent,
    InserimentoFormComponent,
    InserimentoEtichettaComponent,
    SezioneBuilderComponent,
    SezioneMetadatiComponent,
    SezionePermessiComponent,
    ContenutiDinamiciComponent,
    DettaglioFormComponent,
    RicercaSottomissioniComponent,
    GestioneUtenzeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    AppCommonModule,
    HttpClientModule,
    FormioModule,
    GestioneDichiarazioniModule,
    FormsModule, // make sure FormsModule is imported to make ngModel work
    LMarkdownEditorModule,
  ],
  providers: [HttpClient, DatePipe, SharedService],
})
export class FormModule {}
