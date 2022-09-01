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
    console.log(`Esportato in ${this.formatoEsportazione}`);
    console.log(this.selectedRow);
  }

  public redirectPage() {
    this.myModal.hide();
  }

  public onChangeFormato($e: any) {
    this.formatoEsportazione = $e.target.value;
  }

  public duplicaSottomissione($e: any) {
    console.log('duplicato');
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
        this.ngOnInit();
      })
      .add(() => {
        this.redirectPage();
      });
  }
}
