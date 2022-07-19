import { Component, ViewChild } from '@angular/core';
import { SezioneMetadatiComponent } from '../components/sezione-metadati/sezione-metadati.component';

@Component({
  selector: 'app-inserimento-form',
  templateUrl: './inserimento-form.component.html',
  styleUrls: ['./inserimento-form.component.scss'],
})
export class InserimentoFormComponent {
  @ViewChild('sezioneMetadatiComponent')
  sezioneMetadatiComponent: SezioneMetadatiComponent;

  public isValidTitoloForm = true;
  public isValidDescrizioneForm = true;
  public metadati = {};
  public form = {};

  public onClickSalvaSchemaRilevazione() {
    this.isValidTitoloForm = this.sezioneMetadatiComponent.titolo
      ? true
      : false;
    this.isValidDescrizioneForm = this.sezioneMetadatiComponent.descrizione
      ? true
      : false;

    //Scroll Top
    if (!this.isValidTitoloForm || !this.isValidDescrizioneForm) {
      document.documentElement.scrollTop = 0;
    }
  }
}
