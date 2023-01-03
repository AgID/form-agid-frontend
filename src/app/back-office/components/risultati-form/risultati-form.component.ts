import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RisultatiFormService } from './risultati-form.service';
import { ElencoFormService } from '../../../front-office/elenco-form/elenco-form.service';

@Component({
  selector: 'app-risultati-form',
  templateUrl: './risultati-form.component.html',
  styleUrls: ['./risultati-form.component.scss'],
})
export class RisultatiFormComponent implements OnInit {
  @Input()
  filters: any;

  public elencoForm: Array<any>;
  public totalElements: number;
  public selectedPage = 1;

  public myModal: any; //Modal
  public selectedRow: any; //Modal
  public selectedForm: any; //Modal
  public formatoEsportazione: string;

  constructor(
    private router: Router,
    private risultatiFormService: RisultatiFormService,
    private elencoFormService: ElencoFormService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedPage = this.filters.pagination?.currentPage || 1;
    this.risultatiFormService
      .findFormForParams(this.filters)
      .subscribe((response: any) => {
        this.elencoForm = response.extraParams || [];
        this.totalElements = response.totalElements[0].totalElements;
      });
  }

  public onChangePage(e: any) {
    this.filters.pagination.currentPage = e;
    this.ngOnInit();
  }

  public goToModificaForm(item: any) {
    this.router.navigate([`/admin/modifica-form/${item._id}`], {
      relativeTo: this.route,
    });
  }

  public goToDettaglioForm(item: any) {
    this.router.navigate([`/admin/dettaglio-form/${item._id}`], {
      relativeTo: this.route,
    });
  }

  public esportaSottomissione(item: any) {
    // Modale
    this.myModal = new (<any>window).bootstrap.Modal(
      document.getElementById('exportModal'),
      {
        keyboard: false,
        backdrop: 'static',
      }
    );
    this.myModal.show();
    this.selectedRow = item;
  }

  public Export() {
    this.elencoFormService
      .extractForm(this.formatoEsportazione, this.selectedRow._id)
      .subscribe(
        (res) => {
          this.downloadFile(res);
        },
        (err) => console.log(err)
      );
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  public redirectPage() {
    this.myModal.hide();
  }

  public onChangeFormato($e: any) {
    this.formatoEsportazione = $e.target.value;
  }

  public duplicaSottomissione(form: any) {
    console.log('duplicato', form);
    const { _id } = form;
    this.router.navigate(['./inserimento-form'], {
      queryParams: {
        duplica: _id,
      },
      relativeTo: this.route,
    });
  }

  public onClickEliminaForm(item: any) {
    // Modale
    this.myModal = new (<any>window).bootstrap.Modal(
      document.getElementById('deleteModal'),
      {
        keyboard: false,
        backdrop: 'static',
      }
    );
    this.myModal.show();
    this.selectedForm = item;
  }

  public deleteForm() {
    this.elencoFormService
      .deleteForm(this.selectedForm._id)
      .subscribe(() => {
        this.totalElements--;
        if (
          this.filters.pagination.currentPage > 1 &&
          this.totalElements % this.filters.pagination.elementsForPage === 0
        )
          this.filters.pagination.currentPage--;
        this.ngOnInit();
      })
      .add(() => {
        this.redirectPage();
      });
  }
}
