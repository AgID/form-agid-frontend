import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AlertType } from '../alert/types/alert.type';
import { IAlertMessageType } from '../alert/types/message.type';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from './textarea.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [UNIQUE_ID_PROVIDER],
})
export class TextareaComponent {
  constructor(@Inject(UNIQUE_ID) public ident: string) {}

  @Input()
  public label: string;

  @Input()
  public value: string;

  @Input()
  public isValid: boolean = true;

  @Input()
  public rows: number = 3;

  @Input()
  public errorType: AlertType = 'DANGER';

  @Input()
  public errorMessage: Array<IAlertMessageType> = [
    { label: 'Campo obbligatorio' },
  ];

  @Output()
  public changeInput: EventEmitter<Event> = new EventEmitter();

  public onChangeInput($ev: Event) {
    this.changeInput.emit($ev);
  }
}
