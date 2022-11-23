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
      const currentLang = localStorage.getItem('lang') || 'ITA';
      // TODO: Ottenere la lista delle etichette / lingue dal Backend
      //TODO: Settare la lingua hardcoded in base a quello che prenderemo dai cookie
      http
        .get(`${ENV.BACKEND_HOST}/v1/messages/${currentLang}`)
        .subscribe((res: any) => {
          if (res) {
            messages = res;
          }
        })
        .add(() => {
          translate.setTranslation(currentLang, messages);
          translate.use(currentLang);
          resolve(null);
        });
    });
}
