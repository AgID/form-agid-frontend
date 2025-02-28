import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminEmailService {
  constructor(private http: HttpClient) {}

  public sendEmail(data: any): Observable<any> {
    return this.http.post(`${ENV.BACKEND_HOST}/v1/email/send`, data);
  }

  public getSmtpAccounts(): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/email/find-smtp-accounts`);
  }

  public deleteSmtpAccounts(id: string): Observable<any> {
    return this.http.delete(`${ENV.BACKEND_HOST}/v1/email/${id}`);
  }

  public updateSmtpAccount(id: string, data: any): Observable<any> {
    return this.http.put(`${ENV.BACKEND_HOST}/v1/email/${id}`, data);
  }

  public addSmtpAccount(data: any): Observable<any> {
    return this.http.post(
      `${ENV.BACKEND_HOST}/v1/email/add-smtp-account`,
      data
    );
  }
}
