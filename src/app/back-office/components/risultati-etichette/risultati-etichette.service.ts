import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RisultatiEtichetteService {
  constructor(private http: HttpClient) {}

  public createLabel(data: any): Observable<any> {
    return this.http.post(`${ENV.BACKEND_HOST}/v1/label`, data);
  }

  public findLabelsForParams(payload: any): Observable<any> {
    return this.http.post(`${ENV.BACKEND_HOST}/v1/labels/search`, payload);
  }

  public getLabelsById(id: any): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/label/${id}`);
  }

  public deleteLabel(id: string): Observable<any> {
    return this.http.delete(`${ENV.BACKEND_HOST}/v1/label/${id}`);
  }
}
