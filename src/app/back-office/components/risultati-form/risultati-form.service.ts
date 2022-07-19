import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RisultatiFormService {
  constructor(private http: HttpClient) {}

  public findFormForParams(payload: any): Observable<any> {
    return this.http.post(`${ENV.BACKEND_HOST}/v1/form/search`, payload);
  }
}
