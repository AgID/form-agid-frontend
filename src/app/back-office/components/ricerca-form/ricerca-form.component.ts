import { Component, ViewEncapsulation } from '@angular/core';
import { Pagination } from 'src/app/common/pagination.class';

@Component({
  selector: 'app-ricerca-form',
  templateUrl: './ricerca-form.component.html',
  styleUrls: ['./ricerca-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RicercaFormComponent {
  constructor() {}

  public filters = {
    titolo: '',
    dataInizioValidita: '',
    dataFineValidita: '',
    stato: '',
    pagination: new Pagination(),
  };

  public onChangeTitolo($e: any) {
    this.filters.titolo = $e.target.value;
    this.filters = {
      ...this.filters,
    };
  }

  public onChangeDataInizio(e: any) {
    this.filters.dataInizioValidita = e.target.value;
    this.filters = {
      ...this.filters,
    };
  }

  public onChangeDataFine(e: any) {
    this.filters.dataFineValidita = e.target.value;
    this.filters = {
      ...this.filters,
    };
  }

  public onChangeStato($e: any) {
    this.filters.stato = $e.target.value;
    this.filters = {
      ...this.filters,
    };
  }
}
