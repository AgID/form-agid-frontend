import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RisultatiFormService } from './risultati-form.service';

@Component({
  selector: 'app-risultati-form',
  templateUrl: './risultati-form.component.html',
  styleUrls: ['./risultati-form.component.scss'],
})
export class RisultatiFormComponent implements OnInit {
  @Input()
  filters: any;

  public elencoForm: Array<any> = [];
  public totalElements: number;
  public selectedPage = 1;

  constructor(
    private router: Router,
    private risultatiFormService: RisultatiFormService
  ) {}

  ngOnInit(): void {
    this.risultatiFormService
      .findFormForParams(this.filters)
      .subscribe((response: any) => {
        this.elencoForm = response.extraParams;
        this.totalElements = response.totalElements[0].totalElements;
      });
  }

  public goToInserimentoForm() {
    this.router.navigate(['/admin/inserimento-form']);
  }

  public onChangePage(e: any) {
    this.filters.pagination.currentPage = e;
    this.ngOnInit();
  }
}
