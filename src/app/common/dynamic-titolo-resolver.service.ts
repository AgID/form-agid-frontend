import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DynamicTitoloResolverService implements Resolve<any> {
  public titoloSottomissione: string;

  constructor(private sessionStorageService: SessionStorageService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.titoloSottomissione = this.sessionStorageService.getItem(
      'titoloSottomissione'
    );

    return of({
      titoloSottomissione: this.titoloSottomissione,
    });
  }
}
