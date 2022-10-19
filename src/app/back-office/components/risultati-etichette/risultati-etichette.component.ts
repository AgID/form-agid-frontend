import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RisultatiEtichetteService } from './risultati-etichette.service';

@Component({
  selector: 'app-risultati-etichette',
  templateUrl: './risultati-etichette.component.html',
  styleUrls: ['./risultati-etichette.component.scss'],
})
export class RisultatiEtichetteComponent implements OnInit {
  @Input()
  filters: any;

  public elencoEtichette: Array<any>;
  public totalElements: number;
  public selectedPage = 1;

  public myModal: any; //Modal
  public selectedRow: any; //Modal
  public selectedForm: any; //Modal

  constructor(
    private router: Router,
    private risultatiEtichetteService: RisultatiEtichetteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.risultatiEtichetteService
      .findLabelsForParams(this.filters)
      .subscribe((response: any) => {
        this.elencoEtichette = response.extraParams || [];
        this.totalElements = response.totalElements[0].totalElements;
      });
  }

  public onChangePage(e: any) {
    this.filters.pagination.currentPage = e;
    this.ngOnInit();
  }

  public goToModificaEtichetta(item: any) {
    // this.router.navigate([`/admin/modifica-etichetta/${item._id}`], {
    //   relativeTo: this.route,
    // });
  }

  public redirectPage() {
    this.myModal.hide();
  }

  public onClickEliminaEtichetta(item: any) {
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

  public deleteEtichetta() {
    this.risultatiEtichetteService
      .deleteLabel(this.selectedForm._id)
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
