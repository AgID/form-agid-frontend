import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProceduraAttuazioneAccessibilitaService {
  constructor(private http: HttpClient) {}

  public getModuloProceduraAttuazioneByIdAccessibilita(
    id: string
  ): Observable<any> {
    return this.http.get(
      `${ENV.BACKEND_HOST}/v1/submission/procedura-attuazione/${id}`
    );
  }

  public insertProceduraAttuazione(
    submission: ISottomissione
  ): Observable<any> {
    return this.http.post(
      `${ENV.BACKEND_HOST}/v1/submission/procedura-attuazione`,
      submission
    );
  }
}
