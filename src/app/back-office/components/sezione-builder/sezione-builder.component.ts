import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormioOptions } from '@formio/angular';
import { ModificaFormComponent } from '../../modifica/modifica-form.component';

@Component({
  selector: 'app-sezione-builder',
  templateUrl: './sezione-builder.component.html',
  styleUrls: ['./sezione-builder.component.scss'],
})
export class SezioneBuilderComponent {
  @Output()
  public changeForm: EventEmitter<unknown> = new EventEmitter();

  public formOptions: FormioOptions = {};

  @Input()
  public form: any = {};

  onChange(event?: any) {
    this.form = { ...this.form };
    this.changeForm.emit(this.form);
  }
}
