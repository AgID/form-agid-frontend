import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import FormioExport from 'formio-export';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { v1 as uuidv1 } from 'uuid';
import { ElencoFormService } from '../../elenco-form.service';
import './dettaglio-sottomissione.component.scss';
import { IdentificaAmministrazioneService } from 'src/app/front-office/identifica-amministrazione/identifica-amministrazione.service';

@Component({
  selector: 'app-dettaglio-sottomissione',
  templateUrl: './dettaglio-sottomissione.component.html',
  styleUrls: ['./dettaglio-sottomissione.component.scss'],
})
export class DettaglioSottomissioneComponent implements OnInit {
  public errorMessage: Array<any> = [
    {
      label:
        '<strong>Attenzione</strong> Alcuni campi inseriti sono da controllare.',
    },
  ];

  public id: string;
  public DataInserimentoForm: string;
  public uuidLink: string = 'UUID_PLACEHOLDER';

  public isModifica: boolean;
  public isPublished: boolean;
  public isArchivio: any;
  public modifyEqualsPublish: boolean;
  public isPubblicazioneAbilitata: boolean;

  public RTDemail: string;
  public response: any;

  // Formio
  public formSchema: any; // From BE
  public formData: unknown; // From BE
  public myModal: any; //Modal
  public actualFormData: any;
  public renderOptions: any = {};
  public component: any = {
    type: 'form',
    title: '',
    display: 'form',
    components: [],
  };
  public data = {};
  public options = {
    formio: {
      ignoreLayout: true,
      emptyValue: 'n/a',
    },
  };

  public config: {
    download: true;
    filename: 'Sottomissione.pdf';
    margin: 10;
    html2canvas: {
      scale: 2;
      logging: false;
    };
    jsPDF: {
      orientation: 'p';
      unit: 'mm';
      format: 'a4';
    };
  };

  //Alert
  public statusMessage: Array<any> = [];
  public htmlMessage: string;
  public typeAlert: AlertType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService,
    private datePipe: DatePipe,
    private identAmmService: IdentificaAmministrazioneService
  ) {}

  private overwriteRoutingBehaviour() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  private readParams() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isModifica = this.route.snapshot.queryParamMap.get('isModifica')
      ? this.route.snapshot.queryParamMap
          .get('isModifica')
          .toLocaleLowerCase() === 'true'
      : false;
    this.isPublished = this.route.snapshot.queryParamMap.get('isPublished')
      ? this.route.snapshot.queryParamMap
          .get('isPublished')
          .toLocaleLowerCase() === 'true'
      : false;
    this.route.queryParams.subscribe((params) => {
      this.isArchivio = params['isArchivio'];
    });
  }

  private findSottomissione() {
    this.elencoFormService
      .findSottomissioneById(this.id)
      .subscribe((res: any) => {
        this.response = res;
        if (
          this.isPublished ||
          (this.isModifica &&
            this.response.datiBozza &&
            Object.keys(this.response.datiBozza).length === 0) ||
          (!this.isPublished &&
            !this.isModifica &&
            this.response.datiPubblicati &&
            Object.keys(this.response.datiPubblicati).length !== 0 &&
            Object.keys(this.response.datiBozza).length === 0)
        ) {
          this.formData = this.response.datiPubblicati;
        } else {
          this.formData = this.response.datiBozza;
        }
        //PDF
        this.component.title = this.response.form[0].titolo;
        this.data = this.formData;
        this.formSchema = this.response.form[0];
        this.component.components = this.formSchema.components;

        this.isPubblicazioneAbilitata =
          this.formSchema.verificaPubblicazione.abilitata;
        this.modifyEqualsPublish =
          btoa(JSON.stringify(this.response.datiBozza)) ===
          btoa(JSON.stringify(this.response.datiPubblicati));
      })
      .add(() => {
        //composizione messaggio o modale in base allo stato della pagina
        this.initStatusPage();
      });
  }

  private initFormioOptions() {
    if (!this.isModifica) {
      this.renderOptions = {
        readOnly: true,
        renderMode: 'html',
      };
    }
  }

  private initStatusPage() {
    if (this.isArchivio) {
      this.typeAlert = 'WARNING';
      this.statusMessage.push({
        label: `Questa sottomissione è scaduta.`,
      });
    } else if (
      this.isPublished &&
      this.response.datiPubblicati &&
      !this.modifyEqualsPublish &&
      Object.keys(this.response.datiBozza).length !== 0
    ) {
      //pubblicato con bozza
      this.typeAlert = 'WARNING';
      this.statusMessage.push({
        label: `Alcune modifiche al contenuto non sono ancora state pubblicate.`,
      });
      this.statusMessage.push({
        label: `visualizza il contenuto con le ultime modifiche`,
        routerlink: true,
        link: './',
      });
    } else if (
      this.response.datiPubblicati &&
      !this.modifyEqualsPublish &&
      Object.keys(this.response.datiBozza).length !== 0
    ) {
      //Bozza ma è pubblicata
      this.typeAlert = 'WARNING';
      this.statusMessage.push({
        label: `Il contenuto visualizzato presenta alcune modifiche rispetto alla versione pubblicata.`,
        routerlink: false,
      });
      this.statusMessage.push({
        label: `visualizza la versione pubblicata del contenuto`,
        routerlink: true,
        link: './',
        params: { isPublished: true },
      });
    } else if (this.isPublished && this.modifyEqualsPublish) {
      //pubblicato senza bozza
      this.DataInserimentoForm = this.datePipe.transform(
        this.response.dataInserimento,
        'dd/MM/yyyy'
      );
    } else if (!this.isModifica && !this.response.datiPubblicati) {
      this.typeAlert = 'WARNING';
      this.statusMessage.push({
        label: `Il contenuto visualizzato risulta ancora in bozza.`,
      });
    }
  }

  ngOnInit(): void {
    this.overwriteRoutingBehaviour();
    this.readParams();
    this.findSottomissione();
    this.initFormioOptions();
  }

  public onChangeFormio(data: any) {
    if (data.data) {
      this.actualFormData = data;
    }
  }

  public onClickSalvaBozza() {
    const updateBody: ISottomissione = {
      datiBozza: this.actualFormData.data,
      versioneForm: this.response.form[0].versione,
    };
    this.elencoFormService
      .updateSottomissione(this.id, updateBody)
      .subscribe(() => {
        if (this.response.datiPubblicati) {
          this.router.navigate([`./`], {
            queryParams: {
              isPublished: true,
            },
            relativeTo: this.route,
          });
        } else {
          this.router.navigate([`./`], {
            relativeTo: this.route,
          });
        }
      });
  }

  public onClickVisualizza() {
    this.router.navigate([`./`], {
      relativeTo: this.route,
    });
  }

  public downloadPDF() {
    let exporter = new FormioExport(
      this.component,
      this.formData,
      this.options
    );
    exporter.toPdf(this.config).then((pdf: any) => {
      // download the pdf file
      pdf.save();
    });
  }

  public getMail(data: any) {
    if (data && data['Mail_responsabile']) {
      this.RTDemail = data['Mail_responsabile'];
    } else if (data && data['Mail1']) {
      if (data['Tipo_Mail1'] == 'Altro') {
        this.RTDemail = data['Mail1'];
      } else {
        for (let i = 2; i <= 5; i++) {
          if (data['Mail' + [i]] && data['Tipo_Mail' + [i]] == 'Altro') {
            this.RTDemail = data['Mail' + [i]];
            return;
          }
        }
        this.RTDemail = data['Mail1'];
      }
    }
  }

  public onClickPubblica() {
    const codiceIPA = this.response.gruppo;
    this.identAmmService
      .getAmministrazioniCodiceIpa(codiceIPA)
      .subscribe((dataEnte: any) => {
        if (dataEnte.success && dataEnte.result.records.length > 0) {
          const firstRecord = dataEnte.result.records[0];
          if (firstRecord['Codice_Categoria'] === 'L33') {
            this.getMail(firstRecord);
            this.pubblicaSottomissione();
          } else {
            this.identAmmService
              .getCategorieEnti(firstRecord.Codice_Categoria)
              .subscribe((res: any) => {
                if (
                  res.result.records[0] &&
                  res.result.records[0].UTD === 'A'
                ) {
                  this.getMail(firstRecord);
                  this.pubblicaSottomissione();
                } else if (
                  res.result.records[0] &&
                  res.result.records[0].UTD === 'P'
                ) {
                  this.identAmmService
                    .getRTD(firstRecord.Codice_IPA)
                    .subscribe((dataRTD: any) => {
                      if (
                        dataRTD.success &&
                        dataRTD.result.records.length > 0
                      ) {
                        const firstRTDRecord = dataRTD.result.records[0];
                        this.getMail(firstRTDRecord);
                        this.pubblicaSottomissione();
                      }
                    });
                }
              });
          }
        }
      });
  }

  public pubblicaSottomissione() {
    const idPubblicazione = this.isPubblicazioneAbilitata ? uuidv1() : '';

    const updateBody: ISottomissione = {
      datiPubblicati: this.formData,
      stato: 'Pubblicato',
      emailRTD: this.RTDemail,
      versione: (this.response.versione || 0) + 1,
      versioneForm: this.response.form[0].versione,
      idPubblicazione: idPubblicazione,
    };

    this.elencoFormService
      .updateSottomissione(this.id, updateBody)
      .subscribe((response) => {
        if (!this.response.datiPubblicati && this.isPubblicazioneAbilitata) {
          const location = window.location.origin + '/view/';
          this.uuidLink = `${location}${updateBody.idPubblicazione}`;
          // Modale
          this.myModal = new (<any>window).bootstrap.Modal(
            document.getElementById('publishModal'),
            {
              keyboard: false,
              backdrop: 'static',
            }
          );
          this.myModal.show();
        } else {
          this.redirectPage();
        }
      });
  }

  public redirectPage() {
    if (this.myModal) this.myModal.hide();
    this.router.navigate([`./`], {
      queryParams: {
        isPublished: true,
      },
      relativeTo: this.route,
    });
  }

  public onClickModifica() {
    this.router.navigate([`./`], {
      queryParams: {
        isModifica: true,
      },
      relativeTo: this.route,
    });
  }

  public onClickCopiaUUIDClipboard() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(this.uuidLink);
  }
}
