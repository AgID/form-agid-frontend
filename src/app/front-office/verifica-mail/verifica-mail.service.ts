import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VerificaMailService {
  constructor(private http: HttpClient) {}

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

  public getStatoValidazione() {
    return this.http.get(
      `${ENV.BACKEND_HOST}/v1/profile/mail/stato-validazione`,
      {
        headers: {
          'access-token': `${localStorage.getItem('access_token')}`,
        },
      }
    );
  }
}
