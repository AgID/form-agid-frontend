import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IdentificaAmministrazioneService {
  constructor(private http: HttpClient) {}

  public getAmministrazioni(_text: string = '') {
    let text = _text.toLowerCase();
    return this.http.get(
      `${ENV.BACKEND_AMM}/v1/ipadati?sql=SELECT * from "d09adf99-dc10-4349-8c53-27b1e5aa97b6" WHERE LOWER("Codice_IPA") LIKE '%${text}%' OR LOWER("Denominazione_ente") LIKE '%${text}%' LIMIT 10`
    );
  }

  public getCategorieEnti(text: string) {
    return this.http.get(
      `${ENV.BACKEND_AMM}/v1/ipadati?sql=SELECT * from "84ebb2e7-0e61-427b-a1dd-ab8bb2a84f07" WHERE "Codice_categoria" LIKE '${text}%' LIMIT 10`
    );
  }

  public getRTD(text: string) {
    return this.http.get(
      `${ENV.BACKEND_AMM}/v1/ipadati?sql=SELECT * from "41553dea-0701-429e-b906-8b71e441a281" WHERE "Codice_IPA" LIKE '${text}%' LIMIT 10`
    );
  }

  public inviaCodiceOTP(email: string) {
    return this.http.post(
      `${ENV.BACKEND_HOST}/v1/profile/mail/richiedi-validazione`,
      { email },
      {
        headers: {
          'access-token': `${localStorage.getItem('access_token')}`,
        },
      }
    );
  }

  public nuovoProfiloRtd(body: any) {
    return this.http.post(
      `${ENV.BACKEND_HOST}/v1/profile/new-profile-rtd`,
      body,
      {
        headers: {
          'access-token': `${localStorage.getItem('access_token')}`,
        },
      }
    );
  }

  public validazioneAggiornamentoUtente(body: any) {
    return this.http.post(
      `${ENV.BACKEND_HOST}/v1/profile/validazione-aggiornamento-utente`,
      body,
      {
        headers: {
          'access-token': `${localStorage.getItem('access_token')}`,
        },
      }
    );
  }
}
