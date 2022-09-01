import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElencoFormService } from './elenco-form.service';
import { SessionStorageService } from '../../common/session-storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-elenco-form-fo',
  templateUrl: './elenco-form.component.html',
  styleUrls: ['./elenco-form.component.scss'],
})
export class ElencoFormFoComponent implements OnInit {
  public elencoForm: Array<any> = [];
  public dateExpiredForm: Array<any> = [];
  public isArchivio: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService,
    private sessionStorageService: SessionStorageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
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
              element.dataInserimento,
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

  public goToNuovaSottomissione(item: any) {
    this.sessionStorageService.setItem('titoloSottomissione', item.titolo);
    this.router.navigate([`./${item._id}/nuova-sottomissione`], {
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
