import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { ElencoFormService } from '../../elenco-form.service';
import './dettaglio-sottomissione.component.scss';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dettaglio-sottomissione',
  templateUrl: './dettaglio-sottomissione.component.html',
  styleUrls: ['./dettaglio-sottomissione.component.scss'],
})
export class DettaglioSottomissioneComponent implements OnInit {
  public id: string;
  public DataInserimentoForm: string;
  public uuidLink: string = 'UUID_PLACEHOLDER';

  public isModifica: boolean;
  public isPublished: boolean;
  public modifyEqualsPublish: boolean;

  public response: any;

  // Formio
  public formSchema: unknown; // From BE
  public formData: unknown; // From BE
  public myModal: any; //Modal
  public actualFormData: any;
  public renderOptions: any = {};

  //Alert
  public statusMessage: Array<any> = [];
  public htmlMessage: string;
  public typeAlert: AlertType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService,
    private datePipe: DatePipe
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
  }

  private findSottomissione() {
    this.elencoFormService
      .findSottomissioneById(this.id)
      .subscribe((res: any) => {
        this.response = res;
        if (this.isPublished) {
          this.formData = this.response.dati_pubblicati;
        } else {
          this.formData = this.response.dati_bozza;
        }
        this.formSchema = this.response.form[0];
        this.modifyEqualsPublish =
          btoa(JSON.stringify(this.response.dati_bozza)) ===
          btoa(JSON.stringify(this.response.dati_pubblicati));
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
    if (
      this.isPublished &&
      this.response.dati_pubblicati &&
      !this.modifyEqualsPublish
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
    } else if (this.response.dati_pubblicati && !this.modifyEqualsPublish) {
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
    } else if (!this.isModifica && !this.response.dati_pubblicati) {
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
    this.actualFormData = data;
  }

  public onClickSalvaBozza() {
    const updateBody: ISottomissione = {
      dati_bozza: this.actualFormData.data,
    };
    this.elencoFormService
      .updateSottomissione(this.id, updateBody)
      .subscribe(() => {
        if (this.response.dati_pubblicati) {
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

  public onClickPubblica() {
    const updateBody: ISottomissione = {
      dati_pubblicati: this.formData,
      stato: 'Pubblicato',
      versione: (this.response.versione || 0) + 1,
    };
    this.elencoFormService
      .updateSottomissione(this.id, updateBody)
      .subscribe((response) => {
        if (!this.response.dati_pubblicati) {
          // TODO da generare lato BE
          this.uuidLink = `https://form.agid.gov.it/view/${updateBody.idPubblicazione}`;
          // Modale
          this.myModal = new (<any>window).bootstrap.Modal(
            document.getElementById('publishModal'),
            {
              keyboard: false,
              backdrop: 'static',
            }
          );
          this.myModal.show();
        }
      });
  }

  public redirectPage() {
    this.myModal.hide();
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
}
