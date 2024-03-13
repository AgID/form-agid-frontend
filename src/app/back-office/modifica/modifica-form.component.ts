import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'formiojs';
import { HashService } from 'src/app/common/hash.service';
import { ElencoFormService } from '../../front-office/elenco-form/elenco-form.service';
import { SezioneBuilderComponent } from '../components/sezione-builder/sezione-builder.component';
import { SezioneMetadatiComponent } from '../components/sezione-metadati/sezione-metadati.component';
import { IForm } from '../types/form.type';
import { IMetadatiType } from '../types/metadati.type';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-modifica-form',
  templateUrl: './modifica-form.component.html',
  styleUrls: ['./modifica-form.component.scss'],
})
export class ModificaFormComponent implements OnInit {
  @ViewChild('sezioneMetadatiComponent')
  public sezioneMetadatiComponent: SezioneMetadatiComponent;

  @ViewChild('sezioneBuilderComponent')
  public sezioneBuilderComponent: SezioneBuilderComponent;

  public form: IForm;
  public initialComponentsForm: any;
  public id: any;

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

  public titleTooltip: string = '';
  public hasSottomissioni: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService,
    private datePipe: DatePipe,
    private translateService: TranslateService,
    public hashService: HashService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Modifica form');
    this.id = this.route.snapshot.paramMap.get('id');
    this.elencoFormService
      .getFormsById(this.id)
      .subscribe((response) => {
        this.form = response;
        this.initialComponentsForm = Utils.flattenComponents(
          this.form.components,
          false
        );
        this.buildFormMetadati(response);
        //Inizializzazione tooltip
        setTimeout(() => {
          let tooltip$ = document.getElementById('tooltip');
          let titleTooltip = new (window as any).bootstrap.Tooltip(tooltip$, {
            title: `Stato : ${this.metadati.stato} - Versione : ${this.metadati.versione}`,
          });
        }, 500);
      })
      .add(() => {
        //elenco sottomissioni
        this.elencoFormService.hasSubmissions(this.id).subscribe(
          (res: any) => {
            this.hasSottomissioni = res;
          },
          (err) => console.log(err)
        );
      });
  }

  private buildFormMetadati(response: any) {
    const {
      lingua,
      titolo,
      titoloPattern,
      sezioniInformative,
      descrizione,
      abilitaStatistiche,
      dataInizioValidita,
      acl,
      dataFineValidita,
      verificaPubblicazione,
      stato,
      versione,
    } = response;

    this.metadati = {
      lingua,
      titolo,
      titoloPattern,
      descrizione,
      sezioniInformative,
      abilitaStatistiche,
      verificaPubblicazione,
      stato,
      acl,
      versione,
      dataInizioValidita: this.datePipe.transform(
        dataInizioValidita,
        'yyyy-MM-dd'
      ),
      dataFineValidita: this.datePipe.transform(dataFineValidita, 'yyyy-MM-dd'),
    };
  }

  public buildFormRequest() {
    const {
      descrizione,
      titolo,
      titoloPattern,
      abilitaStatistiche,
      dataFineValidita,
      acl,
      lingua,
      dataInizioValidita,
      sezioniInformative,
      verificaPubblicazione,
      versione,
    } = this.metadati;
    this.form = {
      ...this.form,
      titolo,
      titoloPattern,
      sezioniInformative,
      descrizione,
      lingua,
      acl,
      abilitaStatistiche,
      versione,
      verificaPubblicazione,
      dataInizioValidita: new Date(dataInizioValidita),
      dataFineValidita: new Date(dataFineValidita),
      components: this.sezioneBuilderComponent.form.components,
      dataUltimaModifica: new Date(),
    };
  }

  public onClickSalvaBozzaSchemaRilevazione() {
    if (!this.sezioneMetadatiComponent.validate()) {
      this.scrollToTop();
      return;
    }
    this.buildFormRequest();
    this.form.stato = 'Bozza';
    this.elencoFormService
      .updateForm(this.form._id, this.form)
      .subscribe(
        () => {
          this.hashService.isModified = true;
          this.hashService.message = [
            { label: this.translateService.instant('AG_Operazione_Successo') },
          ];
          this.hashService.type = 'SUCCESS';
        },
        (err) => {
          this.hashService.isModified = true;
          const { error } = err;
          this.hashService.message = [
            { label: this.translateService.instant('AG_Operazione_Errore') },
            { label: `${error.error} - ${error.message[0]}` },
          ];
          this.hashService.type = 'DANGER';
        }
      )
      .add(() => {
        this.ngOnInit();
        this.scrollToTop();
      });
  }

  public onClickPubblicaSchemaRilevazione() {
    if (!this.sezioneMetadatiComponent.validate()) {
      this.scrollToTop();
      return;
    }
    let finalComponentsForm = Utils.flattenComponents(
      this.form.components,
      false
    );
    this.buildFormRequest();
    if (
      this.form.stato === 'Pubblicato' &&
      this.hasSottomissioni &&
      this.componentChanged(finalComponentsForm)
    ) {
      this.form.versione++;
    }
    this.form.stato = 'Pubblicato';
    this.elencoFormService
      .updateForm(this.form._id, this.form)
      .subscribe({
        next: () => {
          this.hashService.isModified = true;
          this.hashService.message = [
            { label: this.translateService.instant('AG_Operazione_Successo') },
          ];
          this.hashService.type = 'SUCCESS';
        },
        error: (err) => {
          this.hashService.isModified = true;
          const { error } = err;
          this.hashService.message = [
            { label: this.translateService.instant('AG_Operazione_Errore') },
            { label: `${error.error} - ${error.message[0]}` },
          ];
          this.hashService.type = 'DANGER';
        },
      })
      .add(() => {
        this.ngOnInit();
        setTimeout(() => {
          this.scrollToTop();
        }, 300);
      });
  }

  public componentChanged(fc: any): boolean {
    if (
      Object.keys(this.initialComponentsForm).length === Object.keys(fc).length
    ) {
      for (const key of Object.keys(fc)) {
        if (
          !this.initialComponentsForm[key] ||
          this.initialComponentsForm[key].type !== fc[key].type
        )
          return true;
      }
    } else {
      return true;
    }
    return false;
  }

  public changeMetadati(event: any) {
    this.metadati = event;
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
