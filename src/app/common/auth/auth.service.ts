import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, combineLatest, filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as ENV } from 'src/environments/environment';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$,
  ]).pipe(
    map((values) => values.every((b) => b)),
    filter((e) => !!e)
  );

  public userInfo: User;

  constructor(
    private oauthService: OAuthService,
    private authConfig: AuthConfig,
    private router: Router
  ) {
    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
    });

    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe((e) => {
        this.getUserInfo();
      });
    this.canActivateProtectedRoutes$.subscribe((_) => {
      this.userInfo = this.oauthService.getIdentityClaims() as User;
      //Gestione utente SPID/CIE/CNS e ha la policy vuota
      if (
        ((this.userInfo &&
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'SPID') ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CIE' ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CNS') &&
        this.userInfo.user_policy &&
        Object.keys(this.userInfo.user_policy[0].policy).length === 0
      ) {
        this.router.navigate(['/scelta-utente']);
      }
      //Se è un cittadino in pending deve inserire l'OTP
      else if (
        ((this.userInfo &&
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'SPID') ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CIE' ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CNS') &&
        this.userInfo.user_policy &&
        this.userInfo.user_policy[0].policy.role === 'CITTADINO' &&
        this.userInfo.user_policy[0].policy.status === 'Pending'
      ) {
        this.router.navigate(['/verifica-otp']);
      }
      //Se è un cittadino in active accede direttamente all'elenco-form
      else if (
        ((this.userInfo &&
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'SPID') ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CIE' ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CNS') &&
        this.userInfo.user_policy &&
        this.userInfo.user_policy[0].policy.role === 'CITTADINO' &&
        this.userInfo.user_policy[0].policy.status === 'Active'
      ) {
        this.router.navigate(['/elenco-form']);
      }
      //Se è un RTD in pending deve essere dirottato sulla scelta dell'amministrazione
      else if (
        ((this.userInfo &&
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'SPID') ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CIE' ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CNS') &&
        this.userInfo.user_policy &&
        this.userInfo.user_policy[0].policy.role === 'RTD' &&
        this.userInfo.user_policy[0].policy.status === 'Pending'
      ) {
        this.router.navigate(['/identifica-amministrazione']);
      }
      //Se è un RTD in active deve essere dirottato sull'elenco-form'
      else if (
        ((this.userInfo &&
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'SPID') ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CIE' ||
          this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) ===
            'CNS') &&
        this.userInfo.user_policy &&
        this.userInfo.user_policy[0].policy.role === 'RTD' &&
        this.userInfo.user_policy[0].policy.status === 'Active'
      ) {
        this.router.navigate(['/elenco-form']);
      }
    });

  }

  async getUserInfo() {
    this.oauthService.userinfoEndpoint = `${ENV.BACKEND_HOST}/v1/profile/info`; // Sovrascrittura endpoint
    return this.oauthService.loadUserProfile();
  }

  async initAuth(): Promise<any> {
    return this.oauthService
      .loadDiscoveryDocument()
      .then(() => this.oauthService.tryLogin())
      .then(() => this.isDoneLoadingSubject$.next(true));
  }

  public login(targetUrl?: string) {
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public logout() {
    this.oauthService.revokeTokenAndLogout();
  }

  public hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }
}
