import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IMetadatiType } from '../../types/metadati.type';

@Component({
  selector: 'app-sezione-permessi',
  templateUrl: './sezione-permessi.component.html',
  styleUrls: ['./sezione-permessi.component.scss'],
})
export class SezionePermessiComponent implements AfterViewInit {
  @Output()
  public changeAcl: EventEmitter<unknown> = new EventEmitter();

  @Input()
  public metadati: IMetadatiType = {
    lingua: '',
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
    acl: {
      tipo: '',
      valore: '',
    },
  };

  public acl = {
    tipo: '',
    valore: '',
  };

  public ngAfterViewInit(): void {
    this.acl.tipo = this.metadati?.acl.tipo;
  }

  public onChangeRadioPubblico(e: any) {
    this.acl.tipo = e.target.value;
    this.changeAcl.emit(this.acl);
  }

  public onChangeRadioPrivato(e: any) {
    this.acl.tipo = e.target.value;
    this.changeAcl.emit(this.acl);
  }

  // public onChangeRadioToken(e: any) {
  //   this.acl.tipo = e.target.value;
  //   this.changeAcl.emit(this.acl);
  // }

  // public onChangeToken(e: any) {
  //   this.acl.valore = e.target.value;
  //   this.changeAcl.emit(this.acl);
  // }
}
