import { Component, OnInit, ViewChild } from '@angular/core';
import { SezioneMetadatiComponent } from '../components/sezione-metadati/sezione-metadati.component';
import { ElencoFormService } from '../../front-office/elenco-form/elenco-form.service';
import { SezioneBuilderComponent } from '../components/sezione-builder/sezione-builder.component';
import { IForm } from '../types/form.type';
import { ActivatedRoute, Router } from '@angular/router';
import { IMetadatiType } from '../types/metadati.type';
import { DatePipe } from '@angular/common';
import { HashService } from 'src/app/common/hash.service';
import { Title } from '@angular/platform-browser';

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
    lingua: '',
    titolo: '',
    titoloPattern: '',
    descrizione: '',
    dataFineValidita: '',
    dataInizioValidita: '',
    stato: '',
    versione: 1,
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private elencoFormService: ElencoFormService,
    private datePipe: DatePipe,
    public hashService: HashService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Nuovo inserimento');
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
      lingua,
      titolo,
      titoloPattern,
      sezioniInformative,
      descrizione,
      acl,
      abilitaStatistiche,
      dataInizioValidita,
      dataFineValidita,
      verificaPubblicazione,
    } = response;

    this.metadati = {
      lingua,
      titolo,
      titoloPattern,
      descrizione,
      sezioniInformative,
      abilitaStatistiche,
      acl,
      verificaPubblicazione,
      stato: 'Bozza',
      versione: 1,
      dataInizioValidita: this.datePipe.transform(
        dataInizioValidita,
        'yyyy-MM-dd'
      ),
      dataFineValidita: this.datePipe.transform(dataFineValidita, 'yyyy-MM-dd'),
    };
  }

  public onClickSalvaSchemaRilevazione() {
    console.log(this.sezioneMetadatiComponent.validate());
    if (!this.sezioneMetadatiComponent.validate()) {
      this.hashService.isModified = true;
      this.hashService.type = 'DANGER';
      this.hashService.message = [{ label: "Errore durante l'inserimento" }];
      this.scrollToTop();
      return;
    }
    this.metadati = this.sezioneMetadatiComponent.metadati;

    this.buildFormRequest();

    this.elencoFormService.createForm(this.form).subscribe(
      (response) => {
        this.hashService.isModified = true;
        this.hashService.type = 'SUCCESS';
        this.hashService.message = [
          { label: 'Inserimento avvenuto con successo' },
        ];
        this.scrollToTop();
        this.router.navigate([`/admin/modifica-form/${response._id}`]);
      },
      (error) => {
        this.hashService.isModified = true;
        this.hashService.message = [{ label: 'Inserimento non avvenuto' }];
        this.hashService.type = 'DANGER';
      }
    );
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
      lingua,
    } = this.metadati;

    this.form = {
      ...this.form,
      lingua,
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
      versione: 1,
      stato: 'Bozza',
      scheduling: {
        giorni_attesa: 1,
        dataInizio: new Date(),
        dataFine: new Date(),
      },
    };
  }

  public changeMetadati(event: any) {
    this.hashService.isModified = false;
  }

  public changeForm(event: any) {
    this.hashService.isModified = false;
  }

  public goToTornaAllaRicerca() {
    this.hashService.isModified = false;
    this.router.navigate(['/admin']);
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
