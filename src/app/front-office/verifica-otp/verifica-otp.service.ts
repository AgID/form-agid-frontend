import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VerificaOtpService {
  constructor(private http: HttpClient) {}

  public effettuaValidazione(data: any) {
    return this.http.post(
      `${ENV.BACKEND_HOST}/v1/profile/mail/effettua-validazione`,
      data,
      {
        headers: {
          access_token: `${localStorage.getItem('access_token')}`,
        },
      }
    );
  }
}
