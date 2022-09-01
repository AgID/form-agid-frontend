import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AlertType } from '../alert/types/alert.type';
import { IAlertMessageType } from '../alert/types/message.type';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from './input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [UNIQUE_ID_PROVIDER],
})
export class InputComponent {
  constructor(@Inject(UNIQUE_ID) public ident: string) {}

  @Input()
  public label: string;

  @Input()
  public value: string = '';

  @Input()
  public isValid: boolean = true;

  @Input()
  public type: 'text' | 'email' | 'number' | 'tel' | 'date' | 'time' = 'text';

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
