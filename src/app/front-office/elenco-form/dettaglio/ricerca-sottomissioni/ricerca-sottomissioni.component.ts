import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/common/pagination.class';
import { SessionStorageService } from 'src/app/common/session-storage.service';
import { FormFoService } from 'src/app/front-office/form-fo.service';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { ElencoFormService } from '../../elenco-form.service';

@Component({
  selector: 'app-ricerca-sottomissioni',
  templateUrl: './ricerca-sottomissioni.component.html',
  styleUrls: ['./ricerca-sottomissioni.component.scss'],
})
export class RicercaSottomissioniComponent implements OnInit {
  public id = '';
  public titolo = '';
  public elencoForm: Array<ISottomissione> = [];
  public filters = {
    idForm: '',
    pagination: new Pagination(),
  };

  public selectedPage = 1;
  public totalElements: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formFoService: FormFoService,
    private elencoFormService: ElencoFormService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.filters.idForm = this.id;
    this.titolo = this.sessionStorageService.getItem('titoloSottomissione');
    this.fetchSottomissioni();
  }

  private fetchSottomissioni() {
    this.formFoService.findSottomissioni(this.filters).subscribe((response) => {
      this.elencoForm = response.extraParams;
      this.totalElements = response?.totalElements[0]?.totalElements;
    });
  }

  public goToInserimentoSottomissione() {
    this.router.navigate([`../nuova-sottomissione`], {
      relativeTo: this.route,
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

  public eliminaSottomissione(item: any) {
    this.elencoFormService.deleteSottomissioneById(item._id).subscribe(() => {
      this.fetchSottomissioni();
    });
  }

  onPageChange(e: any) {
    this.filters.pagination.currentPage = e;
    this.fetchSottomissioni();
  }
}
