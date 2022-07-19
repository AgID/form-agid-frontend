import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { InserimentoFormComponent } from '../../inserimento/inserimento-form.component';

@Component({
  selector: 'app-sezione-metadati',
  templateUrl: './sezione-metadati.component.html',
  styleUrls: ['./sezione-metadati.component.scss'],
})
export class SezioneMetadatiComponent {
  constructor(
    @Inject(InserimentoFormComponent)
    public inserimentoForm: InserimentoFormComponent
  ) {}

  @Input()
  public metadati: Object = {};

  @Output()
  public changeMetadati: EventEmitter<unknown> = new EventEmitter();

  public errorMessage: string = "Errore nell'inserimento";
  public typeAlert: AlertType = 'DANGER';
  public titolo = '';
  public descrizione = '';

  public onKeyUpTitolo(e: any) {
    this.titolo = e.target.value;
    this.inserimentoForm.isValidTitoloForm = true;
  }

  public onKeyUpDescrizione(e: any) {
    this.descrizione = e.target.value;
    this.inserimentoForm.isValidDescrizioneForm = true;
  }

  public validate(): boolean {
    return true;
  }
}
