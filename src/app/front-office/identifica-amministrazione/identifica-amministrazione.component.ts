import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { AuthService } from 'src/app/common/auth/auth.service';
import { HashService } from 'src/app/common/hash.service';
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
  public isValidKey = true;
  public showKeyChoose = false;

  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';
  public selectElement: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hashService: HashService,
    private authService: AuthService,
    private identAmmService: IdentificaAmministrazioneService
  ) {}

  ngOnInit(): void {
    this.selectElement = document.querySelector('#accessibleAutocomplete');
    new (<any>window).bootstrap.SelectAutocomplete(this.selectElement, {
      showAllValues: true,
      defaultValue: '',
      autoselect: false,
      dropdownArrow: () => '',
      source: (query: string, populateResults: Function) => {
        if (!query) return populateResults([]);
        this.identAmmService.getAmministrazioni(query).subscribe((res: any) => {
          populateResults(res.result.records);
        });
      },
      onConfirm: (data: any) => {
        //TODO:prelevare la mail e concatenare alla stringa iniziale
        if (data && data.Codice_Categoria && data.Codice_Categoria === 'L33') {
          //scuole
          this.getMail(data);
        } else {
          this.identAmmService
            .getCategorieEnti(data?.Codice_Categoria)
            .subscribe((res: any) => {
              if (res.result.records[0] && res.result.records[0].UTD === 'A') {
                this.getMail(data);
              } else if (
                res.result.records[0] &&
                res.result.records[0].UTD === 'P'
              ) {
                this.identAmmService
                  .getRTD(data?.Codice_IPA)
                  .subscribe((res: any) => {
                    this.getMail(res.result.records[0]);
                  });
              }
            });
          this.radioText = this.radioText + ' ' + this.userMail;
        }
        return data;
      },
      templates: {
        inputValue: (data: any) => {
          if (data && data.Denominazione_ente) {
            this.showKeyChoose = true;
          }
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
    let i = 0;
    do {
      i++;
      if (data && data['Tipo_Mail' + i] === 'Altro') {
        this.userMail = data['Mail' + i];
      }
    } while (!data['Tipo_Mail' + i] || data['Tipo_Mail' + i] === 'Altro');
  }

  public onChangeYesKey($e: any) {
    this.haveKey = $e.target.value;
    this.authorizationSend = '';
  }

  public onChangeNoKey($e: any) {
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

  public onClickInviaMail() {}

  public onClickAccedi() {}
}
