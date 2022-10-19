import { Component, ViewEncapsulation } from '@angular/core';
import { Pagination } from 'src/app/common/pagination.class';

@Component({
  selector: 'app-ricerca-etichette',
  templateUrl: './ricerca-etichette.component.html',
  styleUrls: ['./ricerca-etichette.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RicercaEtichetteComponent {
  constructor() {}

  public filters = {
    lingua: '',
    pagination: new Pagination(),
  };

  public onChangeLingua($e: any) {
    this.filters.lingua = $e.target.value;
    this.filters = {
      ...this.filters,
    };
  }
}
