import { Component, OnInit, ViewChild } from '@angular/core';
import { SezioneMetadatiComponent } from '../components/sezione-metadati/sezione-metadati.component';
import { ElencoFormService } from '../../front-office/elenco-form/elenco-form.service';
import { SezioneBuilderComponent } from '../components/sezione-builder/sezione-builder.component';
import { IForm } from '../types/form.type';
import { ActivatedRoute, Router } from '@angular/router';
import { IMetadatiType } from '../types/metadati.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inserimento-form',
  templateUrl: './inserimento-form.component.html',
  styleUrls: ['./inserimento-form.component.scss'],
})
export class InserimentoFormComponent implements OnInit {
  @ViewChild('sezioneMetadatiComponent')
  public sezioneMetadatiComponent: SezioneMetadatiComponent;

  @ViewChild('sezioneBuilderComponent')
  public sezioneBuilderComponent: SezioneBuilderComponent;

  public form: IForm = {};
  public metadati: IMetadatiType = {
    titolo: '',
    titoloPattern: '',
    descrizione: '',
    dataFineValidita: '',
    dataInizioValidita: '',
    stato: '',
    versione: 0,
    abilitaStatistiche: false,
    sezioniInformative: {
      faq: '',
      home: '',
    },
    verificaPubblicazione: {
      abilitata: false,
      campoUrlTarget: '',
    },
    acl: {
      tipo: '',
      valore: '',
    },
  };

  public isModified: boolean = false;
  public message: Array<any> = [{ label: 'Inserimento avvenuto con successo' }];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private elencoFormService: ElencoFormService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const idFormDaDuplicare = this.route.snapshot.queryParamMap.get('duplica');
    if (idFormDaDuplicare) {
      this.elencoFormService
        .getFormsById(idFormDaDuplicare)
        .subscribe((res) => {
          this.buildFormMetadati(res);
          this.form = { components: res.components };
        });
    }
  }

  private buildFormMetadati(response: any) {
    const {
      titolo,
      titoloPattern,
      sezioniInformative,
      descrizione,
      abilitaStatistiche,
      dataInizioValidita,
      dataFineValidita,
      verificaPubblicazione,
      stato,
      versione,
    } = response;

    this.metadati = {
      titolo,
      titoloPattern,
      descrizione,
      sezioniInformative,
      abilitaStatistiche,
      verificaPubblicazione,
      stato,
      versione,
      dataInizioValidita: this.datePipe.transform(
        dataInizioValidita,
        'yyyy-MM-dd'
      ),
      dataFineValidita: this.datePipe.transform(dataFineValidita, 'yyyy-MM-dd'),
    };
  }

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
      titoloPattern,
      abilitaStatistiche,
      dataFineValidita,
      dataInizioValidita,
      acl,
      sezioniInformative,
      verificaPubblicazione,
    } = this.metadati;

    this.form = {
      ...this.form,
      titolo,
      titoloPattern,
      descrizione,
      sezioniInformative,
      dataInizioValidita: new Date(dataInizioValidita),
      dataFineValidita: new Date(dataFineValidita),
      components: this.sezioneBuilderComponent.form.components,
      codiceUtenteInserimento: 'SYSTEM',
      dataInserimento: new Date(),
      codiceUtenteModifica: 'SYSTEM',
      dataUltimaModifica: new Date(),
      acl,
      //modificare pubblicazione
      verificaPubblicazione,
      abilitaStatistiche,
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

  public changeAcl(event: any) {
    this.metadati.acl = event;
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
