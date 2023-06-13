import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackAccessibilitaService {
  constructor(private http: HttpClient) {}

  public getModuloFeedbackByIdAccessibilita(id: string): Observable<any> {
    return this.http.get(
      `${ENV.BACKEND_HOST}/v1/submission/feedback-accessibilita/${id}`
    );
  }

  public insertFeedback(submission: ISottomissione): Observable<any> {
    return this.http.post(
      `${ENV.BACKEND_HOST}/v1/submission/feedback-accessibilita`,
      submission
    );
  }
}
