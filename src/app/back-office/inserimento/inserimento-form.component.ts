import { Component, ViewChild } from '@angular/core';
import { SezioneMetadatiComponent } from '../components/sezione-metadati/sezione-metadati.component';
import { ElencoFormService } from '../../front-office/elenco-form/elenco-form.service';
import { SezioneBuilderComponent } from '../components/sezione-builder/sezione-builder.component';
import { IForm } from '../types/form.type';
import { Router } from '@angular/router';
import { IMetadatiType } from '../types/metadati.type';

@Component({
  selector: 'app-inserimento-form',
  templateUrl: './inserimento-form.component.html',
  styleUrls: ['./inserimento-form.component.scss'],
})
export class InserimentoFormComponent {
  @ViewChild('sezioneMetadatiComponent')
  public sezioneMetadatiComponent: SezioneMetadatiComponent;

  @ViewChild('sezioneBuilderComponent')
  public sezioneBuilderComponent: SezioneBuilderComponent;

  public form: IForm = {};
  public metadati: IMetadatiType;

  public isModified: boolean = false;
  public message: Array<any> = [{ label: 'Inserimento avvenuto con successo' }];

  constructor(
    private elencoFormService: ElencoFormService,
    private router: Router
  ) {}

  public onClickSalvaSchemaRilevazione() {
    if (!this.sezioneMetadatiComponent.validate()) {
      this.scrollToTop();
      return;
    }
    this.metadati = this.sezioneMetadatiComponent.metadati;

    this.buildFormRequest();

    this.elencoFormService.createForm(this.form).subscribe((response) => {
      // this.router.navigate([`/admin/dettaglio-form/${response._id}`]);
      this.isModified = true;
      this.scrollToTop();
    });
  }

  public buildFormRequest() {
    const {
      descrizione,
      titolo,
      dataFineValidita,
      dataInizioValidita,
      sezioniInformative,
    } = this.metadati;

    this.form = {
      ...this.form,
      titolo,
      descrizione,
      sezioniInformative,
      dataInizioValidita: new Date(dataInizioValidita),
      dataFineValidita: new Date(dataFineValidita),
      components: this.sezioneBuilderComponent.form.components,
      codiceUtenteInserimento: 'SYSTEM',
      dataInserimento: new Date(),
      codiceUtenteModifica: 'SYSTEM',
      dataUltimaModifica: new Date(),
      //TODO: MOCK
      acl: { tipo: 'pubblico', valore: 'true' },
      verificaPubblicazione: {
        abilitata: true,
        campoUrlTarget: 'url',
      },
      versione: 0,
      stato: 'Bozza',
      scheduling: {
        giorni_attesa: 1,
        dataInizio: new Date(),
        dataFine: new Date(),
      },
    };
  }

  public changeMetadati(event: any) {
    this.isModified = false;
  }

  public changeForm(event: any) {
    this.isModified = false;
  }

  public goToTornaAllaRicerca() {
    this.router.navigate(['/admin']);
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
