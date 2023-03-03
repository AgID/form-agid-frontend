import { Component, ViewEncapsulation } from '@angular/core';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { Pagination } from 'src/app/common/pagination.class';

@Component({
  selector: 'app-ricerca-sottomissioni',
  templateUrl: './ricerca-sottomissioni.component.html',
  styleUrls: ['./ricerca-sottomissioni.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RicercaSottomissioniComponent {
  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';

  public filters = {
    titolo: '',
    stato: '',
    dataInizio: '',
    dataFine: '',
    pagination: new Pagination({ elementsForPage: 200 }),
  };

  public isValid: any = {
    dataInizio: true,
    dataFine: true,
  };

  public onChangeTitoloCompilazione($e: any) {
    this.filters.titolo = $e.target.value;
  }

  public onChangeStato($e: any) {
    this.filters.stato = $e.target.value;
  }

  public onChangeDataInizio(e: any) {
    this.filters.dataInizio = e.target.value;
    this.isValid.dataInizio = true;
  }

  public onChangeDataFine(e: any) {
    this.filters.dataFine = e.target.value;
    this.isValid.dataFine = true;
  }
}
