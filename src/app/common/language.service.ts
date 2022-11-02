import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private lang: string = 'it';
  private dictionary: object = {};
  public dictionary$ = new Subject<object>();

  constructor(private translateService: TranslateService) {}

  public translate(code: string): string {
    let lang = this.getCurrentLang();
    let dictionary: any = this.getDictionary();
    let translations = dictionary[lang];
    return translations[code] || '';
  }

  public reactive(
    code: string | Array<string>
  ): Observable<string | Array<string>> {
    return this.translateService.stream(code);
  }

  public setCurrentLang(lang: string): void {
    this.lang = lang;
  }

  public getCurrentLang(): string {
    return this.lang;
  }

  public setDictionary(dictionary: object): void {
    this.dictionary = dictionary;
  }

  public getDictionary(): object {
    return this.dictionary;
  }

  public formMessage(
    formMessageObject: any,
    type: string,
    title: { label: string; oldValue?: any; newValue?: any },
    body: { label: string; oldValue?: any; newValue?: any }
  ) {
    this.translateService
      .stream([title.label, body.label])
      .subscribe((list) => {
        let innerTitle = list[title.label];
        let innerBody = list[body.label];
        if (title.oldValue && title.newValue) {
          if (Array.isArray(title.oldValue) && Array.isArray(title.newValue)) {
            title.oldValue.forEach((str, index) => {
              innerTitle = innerTitle.replace(str, title.newValue[index]);
            });
          } else {
            innerTitle = innerTitle.replace(title.oldValue, title.newValue);
          }
        }
        if (body.oldValue && body.newValue) {
          if (Array.isArray(body.oldValue) && Array.isArray(body.newValue)) {
            body.oldValue.forEach((str, index) => {
              innerBody = innerBody.replace(str, body.newValue[index]);
            });
          } else {
            innerBody = innerBody.replace(body.oldValue, body.newValue);
          }
        }
        formMessageObject.title = innerTitle;
        formMessageObject.body = innerBody;
        formMessageObject.type = type;
      });
  }
}
