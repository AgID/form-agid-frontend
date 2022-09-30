import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';
import { ISottomissione } from './types/sottomissione.type';

@Injectable({
  providedIn: 'root',
})
export class FormFoService {
  constructor(private http: HttpClient) {}

  public padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  public formatDate(date: any) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  public findSottomissioni(payload: any): Observable<any> {
    return this.http.post(`${ENV.BACKEND_HOST}/v1/submission/search`, payload);
  }
}