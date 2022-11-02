import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AlertType } from '../alert/types/alert.type';
import { IAlertMessageType } from '../alert/types/message.type';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from './language-selector.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  providers: [UNIQUE_ID_PROVIDER],
})
export class LanguageSelectorComponent {
  constructor(@Inject(UNIQUE_ID) public ident: string) {}

  @Input()
  public label: string;

  @Input()
  public value: string = '';

  @Input()
  public isInsideForm: boolean = true;

  @Input()
  public isValid: boolean = true;

  @Input()
  public errorType: AlertType = 'DANGER';

  @Input()
  public errorMessage: Array<IAlertMessageType> = [
    { label: 'Campo obbligatorio' },
  ];

  @Output()
  public changeLanguage: EventEmitter<string> = new EventEmitter();

  public onChangeSelectedLanguage(data: Event) {
    if (!data?.target) return;
    const target: any = data.target;
    const parentElement = target.closest('li');
    const selectedLanguage = parentElement.dataset.lingua;

    this.changeLanguage.emit(selectedLanguage);
  }
}
