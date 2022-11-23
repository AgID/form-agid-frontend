import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlertType } from '../alert/types/alert.type';
import { IAlertMessageType } from '../alert/types/message.type';

import {
  LanguageSelectorService,
  UNIQUE_ID,
  UNIQUE_ID_PROVIDER,
} from './language-selector.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  providers: [UNIQUE_ID_PROVIDER, LanguageSelectorService],
})
export class LanguageSelectorComponent implements OnInit {
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

  public languages: Array<{ descrizione: string; codice: string }> = [];

  @Output()
  public changeLanguage: EventEmitter<string> = new EventEmitter();

  constructor(
    @Inject(UNIQUE_ID) public ident: string,
    private languageSelectorService: LanguageSelectorService
  ) {}

  ngOnInit(): void {
    this.languageSelectorService.getLanguages().subscribe((response) => {
      this.languages = response.slice();
    });
  }

  public onChangeSelectedLanguage(data: Event) {
    if (!data?.target) return;
    const target: any = data.target;
    const parentElement = target.closest('li');
    const selectedLanguage = parentElement.dataset.lingua;

    //si va settare la lingua scelta nel local storage
    localStorage.setItem('lang', selectedLanguage);

    this.changeLanguage.emit(selectedLanguage);
  }
}
