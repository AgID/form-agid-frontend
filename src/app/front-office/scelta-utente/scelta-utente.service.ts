import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SceltaUtenteService {
  constructor(private http: HttpClient) {}

  public nuovoProfiloCittadino(body: any) {
    return this.http.post(
      `${ENV.BACKEND_HOST}/v1/profile/new-profile-cittadino`,
      body,
      {
        headers: {
          access_token: `${localStorage.getItem('access_token')}`,
        },
      }
    );
  }
}
