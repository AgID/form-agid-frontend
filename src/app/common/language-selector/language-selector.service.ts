import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment as ENV } from 'src/environments/environment';

let NB_INSTANCES = 0;

export const UNIQUE_ID = new InjectionToken<string>('UNIQUE_ID');

export function uniqueIdFactorySlider() {
  return 'language-selector-id-' + NB_INSTANCES++;
}

export const UNIQUE_ID_PROVIDER = {
  provide: UNIQUE_ID,
  useFactory: uniqueIdFactorySlider,
};
@Injectable({
  providedIn: 'root',
})
export class LanguageSelectorService {
  constructor(private http: HttpClient) {}

  public getLanguages(): Observable<any> {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/languages`);
  }

  public getLanguageByCode(lang: string) {
    return this.http.get(`${ENV.BACKEND_HOST}/v1/languages/`.concat(lang));
  }
}
