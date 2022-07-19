import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ElencoFormService {
  constructor(private http: HttpClient) {}

  public getForms(): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/form`);
  }

  public getFormsById(id: any): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/form/${id}`);
  }
}
