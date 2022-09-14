import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChildren,
} from '@angular/core';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { SharedService } from '../../inserimento/shared.service';
import { IMetadatiType } from '../../types/metadati.type';
import { SezioneBuilderComponent } from '../sezione-builder/sezione-builder.component';

@Component({
  selector: 'app-sezione-metadati',
  templateUrl: './sezione-metadati.component.html',
  styleUrls: ['./sezione-metadati.component.scss'],
})
export class SezioneMetadatiComponent {
  constructor(private _sharedService: SharedService) {}

  @Input()
  public metadati: IMetadatiType = {
    titolo: '',
    titoloPattern: '',
    descrizione: '',
    dataFineValidita: '',
    dataInizioValidita: '',
    stato: '',
    versione: 0,
    abilitaStatistiche: false,
    sezioniInformative: {
      faq: '',
      home: '',
    },
    verificaPubblicazione: {
      abilitata: false,
      campoUrlTarget: '',
    },
  };

  @Output()
  public changeMetadati: EventEmitter<unknown> = new EventEmitter();

  @ViewChildren('sezioneBuilderComponent')
  sezioneBuilderComponent: SezioneBuilderComponent;

  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';

  public optionsCampoTarget: any = this._sharedService.optionsCampoTarget;
  public optionsTitolo: any = this._sharedService.optionsTitolo;

  public isValid: any = {
    home: true,
    faq: true,
    titolo: true,
    titoloPattern: true,
    descrizione: true,
    dataInizioValidita: true,
    dataFineValidita: true,
  };

  public onKeyUpTitolo(e: any) {
    this.metadati.titolo = e.target.value;
    this.isValid.titolo = true;
    this.changeMetadati.emit(this.metadati);
  }

  public onKeyUpTitoloPattern(e: any) {
    this.metadati.titoloPattern = e.target.value;
    this.isValid.titoloPattern = true;
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

  public onChangeAbilitaStatistiche(e: any) {
    this.metadati.abilitaStatistiche = e.target.checked;
    this.changeMetadati.emit(this.metadati);
  }

  public onChangeVerificaPubblicazione(e: any) {
    this.metadati.verificaPubblicazione.abilitata = e.target.checked;
    if (!this.metadati.verificaPubblicazione.abilitata)
      this.metadati.verificaPubblicazione.campoUrlTarget = '';
  }

  public onChangeCampoTarget(e: any) {
    this.metadati.verificaPubblicazione.campoUrlTarget = e.target.value;
  }

  public validate(): boolean {
    this.isValid.titoloPattern = this.verificaSegnapostiTitolo();
    this.isValid.titolo = !!this.metadati.titolo;
    this.isValid.descrizione = !!this.metadati.descrizione;
    this.isValid.home = !!this.metadati.sezioniInformative.home;
    this.isValid.faq = !!this.metadati.sezioniInformative.faq;
    this.isValid.verificaPubblicazione = this.metadati.verificaPubblicazione
      ?.abilitata
      ? this.metadati.verificaPubblicazione?.campoUrlTarget
      : true;
    return (
      this.isValid.titolo &&
      this.isValid.descrizione &&
      this.isValid.home &&
      this.isValid.faq &&
      this.isValid.verificaPubblicazione &&
      this.isValid.titoloPattern
    );
  }

  public verificaSegnapostiTitolo() {
    if (!this.metadati.titoloPattern) return false;

    const regex = /\{\{(.*?)\}\}/g;
    const invalidKeys = [];
    let match = regex.exec(this.metadati.titoloPattern);
    while (match != null) {
      const [_, key] = match;
      if (!this._sharedService.optionsTitolo.some((el) => el.option === key)) {
        invalidKeys.push(key);
      }
      match = regex.exec(this.metadati.titoloPattern);
    }
    if (invalidKeys.length) {
      this.isValid.titoloPattern = false;
    }
    return !invalidKeys.length;
  }
}
