import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NavBarTopService {
  public constructor(private http: HttpClient) {}

  public getLabelsByLang(lang: string) {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/messages/${lang}`);
  }
}
