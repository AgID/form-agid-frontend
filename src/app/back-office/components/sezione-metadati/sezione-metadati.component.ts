import { Component, EventEmitter, Output } from '@angular/core';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { IMetadatiType } from '../../types/metadati.type';

@Component({
  selector: 'app-sezione-metadati',
  templateUrl: './sezione-metadati.component.html',
  styleUrls: ['./sezione-metadati.component.scss'],
})
export class SezioneMetadatiComponent {
  @Output()
  public changeMetadati: EventEmitter<unknown> = new EventEmitter();

  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';
  public metadati: IMetadatiType = {};

  public isValid: any = {
    home: true,
    faq: true,
    titoloSchema: true,
    descrizione: true,
    dataInizio: true,
    dataFine: true,
  };

  constructor() {}

  public onKeyUpTitolo(e: any) {
    this.metadati.titoloSchema = e.target.value;
    this.isValid.titoloSchema = true;
  }

  public onKeyUpHome(e: any) {
    this.metadati.home = e.target.value;
    this.isValid.home = true;
  }

  public onKeyUpFaq(e: any) {
    this.metadati.faq = e.target.value;
    this.isValid.faq = true;
  }

  public onKeyUpDescrizione(e: any) {
    this.metadati.descrizione = e.target.value;
    this.isValid.descrizione = true;
  }

  public onKeyDataInizio(e: any) {
    this.metadati.dataInizio = e.target.value;
    this.isValid.dataInizio = true;
  }

  public onKeyUpDataFine(e: any) {
    this.metadati.dataFine = e.target.value;
    this.isValid.dataFine = true;
  }

  public validate(): boolean {
    this.isValid.titoloSchema = !!this.metadati.titoloSchema;
    this.isValid.descrizione = !!this.metadati.descrizione;
    this.isValid.dataInizio = !!this.metadati.dataInizio;
    this.isValid.home = !!this.metadati.home;
    this.isValid.faq = !!this.metadati.faq;
    return (
      this.isValid.titoloSchema &&
      this.isValid.descrizione &&
      this.isValid.dataInizio &&
      this.isValid.home &&
      this.isValid.faq
    );
  }
}
