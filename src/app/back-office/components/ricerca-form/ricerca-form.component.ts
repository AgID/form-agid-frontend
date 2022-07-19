import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Pagination } from 'src/app/common/pagination.class';

@Component({
  selector: 'app-ricerca-form',
  templateUrl: './ricerca-form.component.html',
  styleUrls: ['./ricerca-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RicercaFormComponent {
  public filters = {
    titolo: '',
    descrizione: '',
    stato: '',
    pagination: new Pagination(),
  };

  public onChangeTitolo($e: any) {
    this.filters.titolo = $e.target.value;
  }

  public onChangeDescrizione($e: any) {
    this.filters.descrizione = $e.target.value;
  }

  public onChangeStato($e: any) {
    this.filters.stato = $e.target.value;
  }
}
