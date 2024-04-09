import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { AuthService } from 'src/app/common/auth/auth.service';
import { HashService } from 'src/app/common/hash.service';
import { VerificaMailService } from '../verifica-mail/verifica-mail.service';
import { IdentificaAmministrazioneService } from './identifica-amministrazione.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-identifica-amministrazione',
  templateUrl: './identifica-amministrazione.component.html',
  styleUrls: ['./identifica-amministrazione.component.scss'],
})
export class IdentificaAmministrazioneComponent implements OnInit {
  public haveKey: string = '';
  public authorizationSend = '';
  public key = '';
  public radioText = '';
  public userMail: string = '';
  public cod_categoria: string = '';
  public isValidKey = true;
  public showKeyChoose = false;
  public flagOnConfirm = false;
  public isPEC = false;
  public codiciIpa: Array<any>;

  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';
  public selectElement: any;
  public entity: any;

  constructor(
    public hashService: HashService,
    private authService: AuthService,
    private identAmmService: IdentificaAmministrazioneService,
    private verificaMailService: VerificaMailService,
    private translateService: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('AGID Form | Identifica amministrazione');
    this.selectElement = document.querySelector('#accessibleAutocomplete');

    setTimeout(() => {   
      new (<any>window).bootstrap.SelectAutocomplete(this.selectElement, {
      showAllValues: true,
      defaultValue: '',
      autoselect: true,
      dropdownArrow: () => '',
      source: (query: string, populateResults: Function) => {
        const formattedQuery = query.replace(/\'/g, '');
        this.debouncedSearch(formattedQuery, populateResults);
      },
      onConfirm: (data: any) => {
        this.flagOnConfirm = true;
        if (this.flagOnConfirm) {
          if (data) {
            this.hashService.isModified = false;
            this.entity = {
              Codice_Categoria: data.Codice_Categoria,
              Codice_IPA: data.Codice_IPA,
              Denominazione_ente: data.Denominazione_ente,
              Codice_fiscale_ente: data.Codice_fiscale_ente,
              Tipologia: data.Tipologia,
              Acronimo: data.Acronimo,
              Sito_istituzionale: data.Sito_istituzionale,
            };
            if (data.Codice_Categoria && data.Codice_Categoria === 'L33') {
              //scuole
              this.getMail(data);
              this.flagOnConfirm = false;
            } else if (data && data.Codice_Categoria) {
              this.identAmmService
                .getCategorieEnti(data.Codice_Categoria)
                .subscribe(
                  (res: any) => {
                    if (
                      res.result.records[0] &&
                      res.result.records[0].UTD === 'A'
                    ) {
                      this.getMail(data);
                      this.flagOnConfirm = false;
                    } else if (
                      res.result.records[0] &&
                      res.result.records[0].UTD === 'P'
                    ) {
                      this.identAmmService.getRTD(data.Codice_IPA).subscribe(
                        (res: any) => {
                          this.getMail(res.result.records[0]);
                          this.flagOnConfirm = false;
                        },
                        (err) => {
                          this.hashService.isModified = true;
                          this.hashService.message = [
                            {
                              label:
                                this.translateService.instant(
                                  'AG_Errore_Generico'
                                ),
                            },
                          ];
                          this.hashService.type = 'DANGER';
                          this.scrollToTop();
                        }
                      );
                    }
                  },
                  (err) => {
                    this.hashService.isModified = true;
                    this.hashService.message = [
                      {
                        label:
                          this.translateService.instant('AG_Errore_Generico'),
                      },
                    ];
                    this.hashService.type = 'DANGER';
                    this.scrollToTop();
                  }
                );
              this.cod_categoria = data.Codice_Categoria;
            }
          }
          return data;
        }
      },
      templates: {
        inputValue: (data: any) => {
          if (data && data.Denominazione_ente) {
            this.showKeyChoose = true;
          }
          this.flagOnConfirm = false;
          return data?.Denominazione_ente;
        },
        suggestion: (data: any) => {
          return data.Denominazione_ente;
        },
      },
      placeholder: 'Nome o codice IPA...',
    });
  }, 100);


    // Traduzioni
    this.radioText = this.translateService.instant(
      'AG_Mail_Chiave_Accesso_RTD'
    );
  }

  private debounce(fn: Function, ms = 500) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  private debouncedSearch = this.debounce(this.autocompleteSearch);

  private autocompleteSearch(query: string, populateResults: Function) {
    if (!this.flagOnConfirm) {
      if (!query) return populateResults([]);
      this.identAmmService.getAmministrazioniCodiceIpa(query).subscribe(
        (res: any) => {
          this.hashService.isModified = false;
          this.flagOnConfirm = true;
          this.codiciIpa = res.result.records
          this.identAmmService.getAmministrazioniDenominazioneEnte(query).subscribe(
            (res: any) => {
              this.hashService.isModified = false;
              this.flagOnConfirm = true;
              populateResults([...this.codiciIpa, ...res.result.records]);
            },
            (err) => {
              this.hashService.isModified = true;
              this.hashService.message = [
                {
                  label: this.translateService.instant('AG_Errore_Generico'),
                },
              ];
              this.hashService.type = 'DANGER';
              this.scrollToTop();
            }
          );
          populateResults(res.result.records);
        },
        (err) => {
          this.hashService.isModified = true;
          this.hashService.message = [
            {
              label: this.translateService.instant('AG_Errore_Generico'),
            },
          ];
          this.hashService.type = 'DANGER';
          this.scrollToTop();
        }
      );
    }
  }

  public getMail(data: any) {
    this.radioText = this.translateService.instant(
      'AG_Mail_Chiave_Accesso_RTD'
    );
    if (data && data['Mail_responsabile']) {
      this.userMail = data['Mail_responsabile'];
      this.radioText = this.radioText + ' ' + this.userMail;
    } else if (data && data['Mail1']) {
      if (data['Tipo_Mail1'] == "Altro") {
        this.userMail = data['Mail1'];
        this.radioText = this.radioText + ' ' + this.userMail;
      } else {
        for (let i = 2; i <= 5; i++) {
          if (data['Mail' + [i]] && data['Tipo_Mail' + [i]] == "Altro") {
            this.userMail = data['Mail' + [i]];
            this.radioText = this.radioText + ' ' + this.userMail;
            return
          }
        }
        this.userMail = data['Mail1'];
        this.radioText = this.radioText + ' ' + this.userMail;
        this.isPEC = true
      }
    } else {
      this.hashService.isModified = true;
      this.hashService.message = [
        {
          label: this.translateService.instant(
            'AG_Creazione_Profilo_Mail_Assente'
          ),
        },
      ];
      this.hashService.type = 'DANGER';
    }
  }

  public onChangeYesKey($e: any) {
    this.haveKey = $e.target.value;
    this.hashService.isModified = false;
    this.authorizationSend = '';
  }

  public onChangeNoKey($e: any) {
    if (this.isPEC == true) {
      this.hashService.isModified = true;
      this.haveKey = $e.target.value;
      this.hashService.message = [
        {
          label: this.translateService.instant(
            'AG_Chiave_Accesso_PEC'
          ),
        },
      ];
      this.hashService.type = 'DANGER';
    } else {
      this.hashService.isModified = false;
      this.haveKey = $e.target.value;
    }
  }

  public onChangeRadio($e: any) {
    this.hashService.isModified = false;
    this.authorizationSend = $e.target.checked;
  }

  public onKeyUpKey(e: any) {
    this.hashService.isModified = false;
    this.key = e.target.value;
    this.isValidKey = true;
  }

  public onClickAnnulla() {
    window.location.reload();
  }

  public onClickInviaMail() {
    if (this.userMail) {
      this.identAmmService
        .nuovoProfiloRtd({
          email: this.userMail,
          cod_categoria: this.cod_categoria,
          entity: this.entity,
        })
        .subscribe((res: any) => {
          this.haveKey = 'Y';
        });
    } else {
      this.hashService.isModified = true;
      this.hashService.message = [
        {
          label: this.translateService.instant('AG_Mail_Amm_Assente'),
        },
      ];
      this.hashService.type = 'DANGER';
    }
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  public onClickAccedi() {
    this.identAmmService
      .validazioneAggiornamentoUtente({ codiceValidazione: this.key })
      .subscribe({
        next: () => {
          this.authService.getUserInfo();
        },
        error: () => {
          this.hashService.isModified = true;
          this.hashService.message = [
            {
              label: this.translateService.instant('AG_Errore_Generico'),
            },
          ];
          this.hashService.type = 'DANGER';
          this.scrollToTop();
        },
      });
  }
}
