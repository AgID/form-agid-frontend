import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment as ENV } from 'src/environments/environment';

export function AppInitializer(
  translate: TranslateService,
  http: HttpClient
): () => Promise<any> {
  return () =>
    new Promise(async (resolve, reject) => {
      let messages: any;
      // TODO: Ottenere la lista delle etichette / lingue dal Backend
      // TODO: Settare la lingua hardcoded in base a quello che prenderemo dai cookie
      http
        .get(`${ENV.BACKEND_HOST}/v1/messages/ITA`)
        .subscribe((res: any) => {
          messages = res[0].data;
        })
        .add(() => {
          const currentLang = localStorage.getItem('lang') || 'it';
          translate.setTranslation(currentLang, messages);
          translate.use(currentLang);
          resolve(null);
        });
    });
}
