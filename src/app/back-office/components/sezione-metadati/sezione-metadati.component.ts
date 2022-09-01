import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { ModificaFormComponent } from '../../modifica/modifica-form.component';
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

  @Input()
  public metadati: IMetadatiType = {
    titolo: '',
    descrizione: '',
    dataFineValidita: '',
    dataInizioValidita: '',
    sezioniInformative: {
      faq: '',
      home: '',
    },
  };

  public isValid: any = {
    home: true,
    faq: true,
    titolo: true,
    descrizione: true,
    dataInizioValidita: true,
    dataFineValidita: true,
  };

  public onKeyUpTitolo(e: any) {
    this.metadati.titolo = e.target.value;
    this.isValid.titolo = true;
    this.changeMetadati.emit(this.metadati);
  }

  public onKeyUpHome(e: any) {
    this.metadati.sezioniInformative.home = e.target.value;
    this.isValid.home = true;
    this.changeMetadati.emit(this.metadati);
  }

  public onKeyUpFaq(e: any) {
    this.metadati.sezioniInformative.faq = e.target.value;
    this.isValid.faq = true;
    this.changeMetadati.emit(this.metadati);
  }

  public onKeyUpDescrizione(e: any) {
    this.metadati.descrizione = e.target.value;
    this.isValid.descrizione = true;
    this.changeMetadati.emit(this.metadati);
  }

  public onKeyDataInizio(e: any) {
    this.metadati.dataInizioValidita = e.target.value;
    this.isValid.dataInizioValidita = true;
    this.changeMetadati.emit(this.metadati);
  }

  public onKeyUpDataFine(e: any) {
    this.metadati.dataFineValidita = e.target.value;
    this.isValid.dataFineValidita = true;
    this.changeMetadati.emit(this.metadati);
  }

  public validate(): boolean {
    this.isValid.titolo = !!this.metadati.titolo;
    this.isValid.descrizione = !!this.metadati.descrizione;
    this.isValid.home = !!this.metadati.sezioniInformative.home;
    this.isValid.faq = !!this.metadati.sezioniInformative.faq;
    return (
      this.isValid.titolo &&
      this.isValid.descrizione &&
      this.isValid.home &&
      this.isValid.faq
    );
  }
}
