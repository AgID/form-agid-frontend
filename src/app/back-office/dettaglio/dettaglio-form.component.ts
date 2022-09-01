import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FormFoService } from '../../front-office/form-fo.service';
import { ElencoFormService } from '../../front-office/elenco-form/elenco-form.service';
import { ISottomissione } from '../../front-office/types/sottomissione.type';
import { Pagination } from '../../common/pagination.class';
import { IForm } from '../types/form.type';
import { RicercaSottomissioniComponent } from '../components/ricerca-sottomissioni/ricerca-sottomissioni.component';

@Component({
  selector: 'app-dettaglio-form-bo',
  templateUrl: './dettaglio-form.component.html',
  styleUrls: ['./dettaglio-form.component.scss'],
})
export class DettaglioFormComponent implements OnInit {
  @ViewChild('ricercaSottomissioniComponent')
  ricercaSottomissioniComponent: RicercaSottomissioniComponent;

  public id: string;
  public form: IForm;
  public totalElements: number;
  public selectedPage = 1;

  public myModal: any; //Modal
  public selectedRow: any; //Modal
  public formatoEsportazione: string;

  public filters = {
    idForm: '',
    pagination: new Pagination(),
  };
  public elencoForm: Array<ISottomissione> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formFoService: FormFoService,
    private elencoFormService: ElencoFormService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.filters.idForm = this.id;
    forkJoin({
      formDettaglio: this.elencoFormService.getFormsById(this.id),
      findSottomissioni: this.formFoService.findSottomissioni(this.filters),
    }).subscribe((response) => {
      this.form = response.formDettaglio;
      this.elencoForm = response.findSottomissioni.extraParams;
      this.totalElements =
        response.findSottomissioni.totalElements[0]?.totalElements;
    });
  }

  private fetchSottomissioni() {
    this.formFoService.findSottomissioni(this.filters).subscribe((response) => {
      this.elencoForm = response.extraParams;
      this.totalElements = response?.totalElements[0]?.totalElements;
    });
  }

  public goToDettaglioSottomissione(item: any) {
    this.router.navigate([`../sottomissione/${item._id}`], {
      queryParams: {
        isPublished: true,
      },
      relativeTo: this.route,
    });
  }

  public goToModificaSottomissione(item: any) {
    this.router.navigate([`../sottomissione/${item._id}`], {
      queryParams: {
        isModifica: true,
      },
      relativeTo: this.route,
    });
  }

  public goToTornaAllaRicercaSchemi() {
    this.router.navigate(['/admin']);
  }

  public eliminaSottomissione(item: any) {
    this.elencoFormService.deleteSottomissioneById(item._id).subscribe(() => {
      this.fetchSottomissioni();
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

  public onPageChange(e: any) {
    this.filters.pagination.currentPage = e;
    this.fetchSottomissioni();
  }

  public onChangeFormato($e: any) {
    this.formatoEsportazione = $e.target.value;
  }

  public searchForm() {
    this.filters = {
      ...this.filters,
      ...this.ricercaSottomissioniComponent.filters,
    };
    this.fetchSottomissioni();
  }
}
