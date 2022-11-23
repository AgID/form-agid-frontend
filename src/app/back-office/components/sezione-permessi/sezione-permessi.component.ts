import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IAlertMessageType } from 'src/app/common/alert/types/message.type';
import { FormFoService } from 'src/app/front-office/form-fo.service';
import { IdentificaAmministrazioneService } from 'src/app/front-office/identifica-amministrazione/identifica-amministrazione.service';
import { IMetadatiType } from '../../types/metadati.type';

@Component({
  selector: 'app-sezione-permessi',
  templateUrl: './sezione-permessi.component.html',
  styleUrls: ['./sezione-permessi.component.scss'],
})
export class SezionePermessiComponent implements AfterViewInit, OnChanges {
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

  public flagOnConfirm = false;
  public emailValid = true;
  public emailValue = '';
  public tipoDestinatario = '';
  public emailErrorMessage: Array<IAlertMessageType> = [
    {
      label: 'Email non valida',
    },
  ];

  constructor(
    private formFoService: FormFoService,
    private identAmmService: IdentificaAmministrazioneService
  ) {}

  public ngAfterViewInit(): void {
    this.initAutocomplete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['metadati']) {
      if (this.metadati?.acl?.tipo === 'privato_categoria') {
        setTimeout(() => {
          this.initAutocompleteCategorieEnti();
        });
      } else if (this.metadati?.acl?.tipo === 'privato_amministrazione') {
        setTimeout(() => {
          this.initAutocompleteAmministrazioni();
        });
      }
    }
  }

  public onChangeRadioPubblico(e: any) {
    this.metadati.acl.tipo = e.target.value;
    this.tipoDestinatario = '';
    this.initAutocomplete();
  }

  public onChangeRadioPrivato(e: any) {
    this.tipoDestinatario = e.target.value;
    this.metadati.acl.tipo = '';
    this.initAutocomplete();
  }

  public onChangeRadioPrivatoCategoria(e: any) {
    this.metadati.acl.tipo = 'privato_' + e.target.value;
    this.initAutocomplete();
  }

  public onChangeRadioPrivatoAmministrazione(e: any) {
    this.metadati.acl.tipo = 'privato_' + e.target.value;
    this.initAutocomplete();
  }

  public onChangeRadioToken(e: any) {
    this.metadati.acl.tipo = e.target.value;
    this.tipoDestinatario = '';
    this.initAutocomplete();
  }

  public onChangeRadioIncludiTutteCategorieEnti(e: any) {
    this.metadati.acl.valore = e.target.checked ? '*' : [];
  }

  public onChangeRadioIncludiTutteAmministrazioni(e: any) {
    this.metadati.acl.valore = e.target.checked ? '*' : [];
  }

  public onChangeEmail(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.emailValue = input.value;
    this.emailValid = true;
  }

  public onClickRimuoviCategoriaEnte(categoriaEnte: any) {
    this.metadati.acl.valore = this.metadati.acl.valore.filter(
      (el: any) => el.codice !== categoriaEnte.codice
    );
  }

  public onClickRimuoviAmministrazione(amministrazione: any) {
    this.metadati.acl.valore = this.metadati.acl.valore.filter(
      (el: any) => el.codice !== amministrazione.codice
    );
  }

  public cutNewLines() {
    let countCharNewLineBefore = 0;
    let countCharNewLineAfter = 0;
    for (let i = 0; i < this.emailValue.length - 1; i++) {
      if (this.emailValue[i] === '\n') {
        countCharNewLineBefore++;
      } else break;
    }
    for (let i = this.emailValue.length - 1; i > 0; i--) {
      if (this.emailValue[i] === '\n') {
        countCharNewLineAfter++;
      } else break;
    }
    this.emailValue = this.emailValue.substring(
      countCharNewLineBefore,
      this.emailValue.length - countCharNewLineAfter
    );
  }

  public onClickInserisciEmail() {
    const regex = /\w+\@\w+(\.it|\.com)/g;
    let emails = [];
    let countCharNewLineAfter = 0;
    let countCharNewLineBefore = 0;
    let copia: any;
    let flag = true;
    this.emailValid = true;
    this.cutNewLines();
    emails = this.emailValue.split('\n');
    emails.forEach((element, i) => {
      if (element.match(regex)) {
        if (this.metadati.acl.valore.length > 0) {
          this.metadati.acl.valore.forEach((valore: string) => {
            if (valore === element) {
              flag = false;
              copia = valore;
            } else if (flag || copia != element) {
              flag = true;
            }
          });
        }
        if (flag) {
          this.metadati.acl.valore.push(element);
          if (i === emails.length - 1) {
            this.emailValue = this.emailValue.replace(element, '');
          } else {
            this.emailValue = this.emailValue.replace(element + '\n', '');
          }
        }
      } else {
        this.emailValid = false;
      }
    });
  }

  public onClickRimuoviEmail(email: string) {
    this.metadati.acl.valore = this.metadati.acl.valore.filter(
      (el: any) => el !== email
    );
  }

  private initAutocomplete() {
    const currentPermission = this.metadati?.acl?.tipo;
    switch (currentPermission) {
      case 'pubblico':
        break;
      case 'privato_categoria':
        this.metadati.acl.valore = '*';
        setTimeout(() => {
          this.initAutocompleteCategorieEnti();
        });
        break;
      case 'privato_amministrazione':
        this.metadati.acl.valore = '*';
        setTimeout(() => {
          this.initAutocompleteAmministrazioni();
        });
        break;
      case 'token':
        this.metadati.acl.valore = [];
        this.emailValue = '';
        break;
    }
  }

  private initAutocompleteCategorieEnti() {
    const selectElement = document.querySelector('#autocompleteEnti');
    new (<any>window).bootstrap.SelectAutocomplete(selectElement, {
      showAllValues: true,
      defaultValue: '',
      autoselect: false,
      dropdownArrow: () => '',
      source: (query: string, populateResults: Function) => {
        if (!query) return populateResults([]);
        this.formFoService.getCategorieEnti(query).subscribe((res: any) => {
          populateResults(res.result.records);
        });
      },
      onConfirm: (data: any) => {
        if (!data?.Codice_categoria) return data;
        if (!Array.isArray(this.metadati.acl.valore))
          this.metadati.acl.valore = [];
        this.metadati.acl.valore.push({
          codice: data.Codice_categoria,
          descrizione: data.Nome_categoria,
        });
        return data;
      },
      templates: {
        inputValue: (data: any) => {
          return '';
        },
        suggestion: (data: any) => {
          return data.Nome_categoria;
        },
      },
      placeholder: 'Nome categoria ente...',
    });
  }

  private initAutocompleteAmministrazioni() {
    const selectElement = document.querySelector(
      '#autocompleteAmministrazioni'
    );
    new (<any>window).bootstrap.SelectAutocomplete(selectElement, {
      showAllValues: true,
      defaultValue: '',
      autoselect: false,
      dropdownArrow: () => '',
      source: (query: string, populateResults: Function) => {
        if (!this.flagOnConfirm) {
          if (!query) return populateResults([]);
          this.identAmmService
            .getAmministrazioni(query)
            .subscribe((res: any) => {
              populateResults(res.result.records);
            });
        }
      },
      onConfirm: (data: any) => {
        this.flagOnConfirm = true;
        if (this.flagOnConfirm) {
          if (!data?.Codice_IPA) return data;
          if (!Array.isArray(this.metadati.acl.valore))
            this.metadati.acl.valore = [];
          this.metadati.acl.valore.push({
            codice: data.Codice_IPA,
            descrizione: data.Denominazione_ente,
          });
          return data;
        }
      },
      templates: {
        inputValue: (data: any) => {
          this.flagOnConfirm = false;
          return '';
        },
        suggestion: (data: any) => {
          return data.Denominazione_ente;
        },
      },
      placeholder: 'Nome amministrazione...',
    });
  }
}
