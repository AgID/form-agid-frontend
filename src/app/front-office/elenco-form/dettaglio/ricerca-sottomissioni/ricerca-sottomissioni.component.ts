import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/common/pagination.class';
import { SessionStorageService } from 'src/app/common/session-storage.service';
import { FormFoService } from 'src/app/front-office/form-fo.service';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { Title } from '@angular/platform-browser';
import { ElencoFormService } from '../../elenco-form.service';

@Component({
  selector: 'app-ricerca-sottomissioni',
  templateUrl: './ricerca-sottomissioni.component.html',
  styleUrls: ['./ricerca-sottomissioni.component.scss'],
})
export class RicercaSottomissioniComponent implements OnInit {
  public id = '';
  public titolo = '';
  public isArchivio: any;
  public elencoForm: Array<ISottomissione> = [];
  public filters = {
    idForm: '',
    pagination: new Pagination(),
  };

  public selectedPage = 1;
  public totalElements: number;

  public myModal: any; //Modal
  public selectedSubmission: any; //Modal

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formFoService: FormFoService,
    private elencoFormService: ElencoFormService,
    private titleService: Title,
    private sessionStorageService: SessionStorageService,
    @Inject('Window') private window: Window
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('AGID Form | Gestione compilazioni');

    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((params) => {
      this.isArchivio = params['isArchivio'];
    });
    this.filters.idForm = this.id;
    this.titolo = this.sessionStorageService.getItem('titoloSottomissione');
    this.fetchSottomissioni();   
  }

  getLocation(): string {
    return this.window.location.origin;
  }

  get isDichiarazioneObiettivi(): boolean {
    return this.elencoForm?.some(item => item.idForm === '633a9e4a435bb1b2ad44be35' || item.idForm === '633aa0471332d9221c08a2ea');
  }
  
  private fetchSottomissioni() {
    this.formFoService.findSottomissioni(this.filters).subscribe((response) => {
      this.elencoForm = response.extraParams;
      this.totalElements = response?.totalElements[0]?.totalElements;
    });
  }

  public goToDettaglioSottomissione(item: any) {
    if (!this.isArchivio) {
      this.router.navigate([`../sottomissione/${item._id}`], {
        queryParams: {
          isPublished: true,
        },
        relativeTo: this.route,
      });
    } else {
      this.router.navigate([`../sottomissione/${item._id}`], {
        queryParams: {
          isPublished: true,
          isArchivio: true,
        },
        relativeTo: this.route,
      });
    }
  }

  public goToModificaSottomissione(item: any) {
    this.router.navigate([`../sottomissione/${item._id}`], {
      queryParams: {
        isModifica: true,
      },
      relativeTo: this.route,
    });
  }

  public redirectPage() {
    this.myModal.hide();
  }

  public deleteSubmission() {
    this.elencoFormService
      .deleteSottomissioneById(this.selectedSubmission._id)
      .subscribe(() => {
        this.fetchSottomissioni();
      })
      .add(() => {
        this.redirectPage();
      });
  }

  public eliminaSottomissione(item: any) {
    // Modale
    this.myModal = new (<any>window).bootstrap.Modal(
      document.getElementById('deleteModal'),
      {
        keyboard: false,
        backdrop: 'static',
      }
    );
    this.myModal.show();
    this.selectedSubmission = item;
  }

  onPageChange(e: any) {
    this.filters.pagination.currentPage = e;
    this.fetchSottomissioni();
  }
}
