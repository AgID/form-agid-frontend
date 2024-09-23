import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../common/session-storage.service';
import { ElencoFormService } from './elenco-form.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { IAlertMessageType } from '../../common/alert/types/message.type';

@Component({
  selector: 'app-elenco-form-fo',
  templateUrl: './elenco-form.component.html',
  styleUrls: ['./elenco-form.component.scss'],
})
export class ElencoFormFoComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService,
    private sessionStorageService: SessionStorageService,
    private translate: TranslateService,
    private datePipe: DatePipe,
    private titleService: Title
  ) { }

  public elencoForm: Array<any> = [];
  public dateExpiredForm: Array<any> = [];
  public isArchivio: any;
  public enteAssociatoUtente = '';
  public alertMessages: IAlertMessageType[] = [];



  ngOnInit(): void {
    this.titleService.setTitle('AGID Form | Elenco form');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.queryParams.subscribe((params) => {
      this.isArchivio = params['isArchivio'];
    });
    if (this.isArchivio) {
      this.elencoFormService.getFormsExpired().subscribe((response: any) => {
        this.elencoForm = response;
        this.elencoForm.forEach((element, index) => {
          this.dateExpiredForm.push({
            dataFineValidita: this.datePipe.transform(
              element.dataFineValidita,
              'dd/MM/yyyy'
            ),
          });
        });
      });
    } else {
      this.elencoFormService.getForms().subscribe((response: any) => {
        this.elencoForm = response;
      });
    }

    const userInfo = this.elencoFormService.getUserInfo();
    let ente = " ";
    if (userInfo?.user_policy?.length) {
      const entities = userInfo.user_policy.find((userPolicy: { entity: null; }) => userPolicy.entity === null)?.policy.entity;
      const activeEntity = entities?.find((entity: { isActiveEntity: boolean; }) => entity.isActiveEntity);
      if (activeEntity) { ente = activeEntity.Denominazione_ente ?? "Dato non disponibile" }
    }
    
    this.enteAssociatoUtente = this.translate
      .instant('AG_RTD_Associato')
      .replace('{{ente}}', `<b>${ente}</b>`);
    this.alertMessages.push({ htmlContent: this.enteAssociatoUtente });
  }

  public goToRender(item: any) {
    this.sessionStorageService.setItem('titoloSottomissione', item.titolo);
    if (this.isArchivio) {
      this.router.navigate([`./${item._id}`], {
        queryParams: {
          isArchivio: true,
        },
        relativeTo: this.route,
      });
    } else {
      this.router.navigate([`./${item._id}`], {
        relativeTo: this.route,
      });
    }
  }

  public goToRenderSubmission(item: any) {
    this.sessionStorageService.setItem('titoloSottomissione', item.titolo);
    if (this.isArchivio) {
      this.router.navigate([`./${item._id}/nuova-sottomissione`], {
        queryParams: {
          isArchivio: true,
        },
        relativeTo: this.route,
      });
    } else {
      this.router.navigate([`./${item._id}/nuova-sottomissione`], {
        relativeTo: this.route,
      });
    }
  }

  // NON MI PARE SI USI DA NESSUNA PARTE
  // public isAdmin(): boolean {
  //   return this.authService.userInfo?.user_policy.some(
  //     (el) => el.policy.is_admin
  //   );
  // }

  // public goToNuovaSottomissione(item: any) {
  //   this.sessionStorageService.setItem('titoloSottomissione', item.titolo);
  //   this.router.navigate([`./${item._id}/nuova-sottomissione`], {
  //     relativeTo: this.route,
  //   });
  // }

  public goToElencoForm() {
    this.router.navigate([`./`], {
      relativeTo: this.route,
    });
  }

  public goToArchivio() {
    this.router.navigate([`./`], {
      queryParams: {
        isArchivio: true,
      },
      relativeTo: this.route,
    });
  }
}
