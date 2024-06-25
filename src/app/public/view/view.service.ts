import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  constructor(private http: HttpClient) { }

  public findSottomissioneById(id: string) {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/submission/view/${id}`);
  }

  public findFormById(id: string) {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/form/${id}`);
  }
}
