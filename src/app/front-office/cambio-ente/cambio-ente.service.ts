import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

interface PatchPayload {
    entity: Entity[];
}

interface Entity {
  Codice_Categoria: string;
  Codice_IPA: string;
  Denominazione_ente: string;
  email: string;
  isActiveEntity: boolean;
  status: "Active" | "Pending" | "Disabled";
  role: "RTD"  | "AMMINISTRATORE_DELEGATO"  | "DIRIGENTE_SCOLATISCO"  | "ADMIN"  | "SUPER_ADMIN";
  valid_from: string;
  valid_to: null
}

@Injectable({
  providedIn: 'root',
})

export class CambioEnteService {
  private base64AuthKey = "";

  constructor(private http: HttpClient) {}

  updateActiveEntity(entities: any[]): Observable<any> {
    const patchPayload: PatchPayload =  {
        entity: entities
    };

    console.log("patchPayload", patchPayload);

    return this.http.patch(`${ENV.BACKEND_HOST}/v1/profile/modify-profile`, patchPayload, {
      headers: {
        Authorization: "Basic " + this.base64AuthKey,
      },
    });
  }
}
