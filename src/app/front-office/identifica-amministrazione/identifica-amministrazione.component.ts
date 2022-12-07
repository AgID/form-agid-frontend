import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { AuthService } from 'src/app/common/auth/auth.service';
import { HashService } from 'src/app/common/hash.service';
import { VerificaMailService } from '../verifica-mail/verifica-mail.service';
import { IdentificaAmministrazioneService } from './identifica-amministrazione.service';

@Component({
  selector: 'app-identifica-amministrazione',
  templateUrl: './identifica-amministrazione.component.html',
  styleUrls: ['./identifica-amministrazione.component.scss'],
})
export class IdentificaAmministrazioneComponent implements OnInit {
  public haveKey: string = '';
  public authorizationSend = '';
  public key = '';
  public radioText = `Richiedo che venga inviata la chiave di accesso alla casella
  email del Responsabile della Transizione Digitale:`;
  public userMail: string = '';
  public cod_categoria: string = '';
  public isValidKey = true;
  public showKeyChoose = false;
  public flagOnConfirm = false;

  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';
  public selectElement: any;
  public entity: any;

  constructor(
    public hashService: HashService,
    private authService: AuthService,
    private identAmmService: IdentificaAmministrazioneService,
    private verificaMailService: VerificaMailService
  ) {}

  ngOnInit(): void {
    this.selectElement = document.querySelector('#accessibleAutocomplete');
    new (<any>window).bootstrap.SelectAutocomplete(this.selectElement, {
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
              this.flagOnConfirm = true;
              populateResults(res.result.records);
            });
        }
      },
      onConfirm: (data: any) => {
        this.flagOnConfirm = true;
        if (this.flagOnConfirm) {
          console.log('ONCONFIRM', data);
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
                .subscribe((res: any) => {
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
                    this.identAmmService
                      .getRTD(data.Codice_IPA)
                      .subscribe((res: any) => {
                        this.getMail(res.result.records[0]);
                        this.flagOnConfirm = false;
                      });
                  }
                });
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
  }

  public getMail(data: any) {
    // let i = 0;
    // do {
    //   i++;
    //   if (data && data['Tipo_Mail' + i] === 'Altro') {
    if (data && data['Mail_responsabile'])
      this.userMail = data['Mail_responsabile'];
    else {
      this.hashService.isModified = true;
      this.hashService.message = [
        {
          label:
            '“Non è possibile creare un profilo RTD, bisogna prima inserire un indirizzo email nell’indice PA',
        },
      ];
      this.hashService.type = 'DANGER';
    }
    //   }
    // } while (!data['Tipo_Mail' + i] || data['Tipo_Mail' + i] === 'Altro');
  }

  public onChangeYesKey($e: any) {
    this.haveKey = $e.target.value;
    this.authorizationSend = '';
  }

  public onChangeNoKey($e: any) {
    this.radioText = this.radioText + ' ' + this.userMail;
    this.haveKey = $e.target.value;
  }

  public onChangeRadio($e: any) {
    this.authorizationSend = $e.target.checked;
  }

  public onKeyUpKey(e: any) {
    this.key = e.target.value;
    this.isValidKey = true;
  }

  public onClickAnnulla() {
    window.location.reload();
  }

  public onClickInviaMail() {
    if (this.userMail) {
      this.verificaMailService.inviaCodiceOTP(this.userMail).subscribe(() => {
        this.identAmmService
          .nuovoProfiloRtd({
            email: this.userMail,
            cod_categoria: this.cod_categoria,
            entity: this.entity,
          })
          .subscribe((res: any) => {
            this.haveKey = 'Y';
          });
      });
    } else {
      this.hashService.isModified = true;
      this.hashService.message = [
        {
          label: "La mail dell'amministrazione non esiste",
        },
      ];
      this.hashService.type = 'DANGER';
    }
  }

  public onClickAccedi() {
    this.identAmmService
      .validazioneAggiornamentoUtente({ codiceValidazione: this.key })
      .subscribe(() => {
        this.authService.getUserInfo();
      });
  }
}
