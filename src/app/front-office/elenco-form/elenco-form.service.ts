import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';
import { ISottomissione } from '../types/sottomissione.type';

@Injectable({
  providedIn: 'root',
})
export class ElencoFormService {
  constructor(private http: HttpClient) {}

  public getForms(): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/form`);
  }

  public getFormsExpired(): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/form/expired`);
  }

  public getFormsById(id: any): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/form/${id}`);
  }

  public createForm(data: any): Observable<any> {
    return this.http.post(`${ENV.BACKEND_HOST}/v1/form`, data);
  }

  public updateForm(id: string, data: any): Observable<any> {
    return this.http.put(`${ENV.BACKEND_HOST}/v1/form/${id}`, data);
  }

  public deleteForm(id: string): Observable<any> {
    return this.http.delete(`${ENV.BACKEND_HOST}/v1/form/${id}`);
  }

  public getStatistichePubblicati(): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/form/statistiche/pubblicati`);
  }

  public createSubmission(payload: any): Observable<any> {
    return this.http.post(`${ENV.BACKEND_HOST}/v1/submission`, payload);
  }

  public updateSottomissione(
    id: string,
    body: Pick<
      ISottomissione,
      'stato' | 'versione' | 'datiPubblicati' | 'datiBozza'
    >
  ) {
    return this.http.put(`${ENV.BACKEND_HOST}/v1/submission/${id}`, body);
  }

  public findSottomissioneById(id: string) {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/submission/${id}`);
  }

  public deleteSottomissioneById(id: string) {
    return this.http.delete(`${ENV.BACKEND_HOST}/v1/submission/${id}`);
  }

  public extractForm(fileType: any, idForm: any): Observable<any> {
    let url = `${ENV.BACKEND_HOST}/v1/submission/extract/${fileType}/${idForm}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  public hasSubmissions(idForm: any): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/form/submission/${idForm}`);
  }
}
