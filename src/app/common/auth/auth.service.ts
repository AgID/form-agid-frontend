import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    setTimeout(() => {
      this.getUserInfo();
    }, 1000);

    this.canActivateProtectedRoutes$.subscribe((_) => {
      this.userInfo = this.oauthService.getIdentityClaims() as User;
      const userProvider = this.getUserProvider();
      //Gestione utente SPID/CIE/CNS e ha la policy vuota
      if (
        ((this.userInfo && userProvider === 'SPID') ||
          userProvider === 'CIE' ||
          userProvider === 'CNS') &&
        (this.userInfo.user_policy?.length === 0 ||
          (this.userInfo.user_policy?.length &&
            Object.keys(this.userInfo.user_policy[0].policy).length === 0))
      ) {
        this.router.navigate(['/identifica-amministrazione']);
        // this.router.navigate(['/scelta-utente']);
      }
      //Se è un cittadino in pending deve inserire l'OTP
      else if (
        ((this.userInfo && userProvider === 'SPID') ||
          userProvider === 'CIE' ||
          userProvider === 'CNS') &&
        this.userInfo.user_policy?.length &&
        this.userInfo.user_policy[0].policy.role === 'CITTADINO' &&
        this.userInfo.user_policy[0].policy.status === 'Pending'
      ) {
        this.router.navigate(['/verifica-otp']);
      }
      //Se è un cittadino in active accede direttamente all'elenco-form se la rotta non è su "view"
      else if (
        ((this.userInfo && userProvider === 'SPID') ||
          userProvider === 'CIE' ||
          userProvider === 'CNS') &&
        this.userInfo.user_policy?.length &&
        this.userInfo.user_policy[0].policy.role === 'CITTADINO' &&
        this.userInfo.user_policy[0].policy.status === 'Active'
      ) {
        if (!window.location.pathname.includes('/view/')) {
          this.router.navigate(['/elenco-form']);
        }
      }
      //Se è un RTD in pending deve essere dirottato sulla scelta dell'amministrazione
      else if (
        ((this.userInfo && userProvider === 'SPID') ||
          userProvider === 'CIE' ||
          userProvider === 'CNS') &&
        this.userInfo.user_policy?.length &&
        this.userInfo.user_policy[0].policy.role === 'RTD' &&
        this.userInfo.user_policy[0].policy.status === 'Pending'
      ) {
        this.router.navigate(['/identifica-amministrazione']);
      }
      //Se è un RTD in active deve essere dirottato sull'elenco-form'
      else if (
        ((this.userInfo && userProvider === 'SPID') ||
          userProvider === 'CIE' ||
          userProvider === 'CNS') &&
        this.userInfo.user_policy?.length &&
        this.userInfo.user_policy[0].policy.role === 'RTD' &&
        this.userInfo.user_policy[0].policy.status === 'Active'
      ) {
        if (!window.location.pathname.includes('/view/')) {
          this.router.navigate(['/elenco-form']);
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  private getUserProvider(): 'SPID' | 'CIE' | 'CNS' | 'MICROSOFT' {
    return this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) as any;
  }

  async getUserInfo() {
    this.oauthService.userinfoEndpoint = `${ENV.BACKEND_HOST}/v1/profile/info`; // Sovrascrittura endpoint
    this.oauthService.requireHttps = false;
    if (this.oauthService.hasValidAccessToken()) {
      await this.oauthService.loadUserProfile();
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
    }
  }

  async initAuth(): Promise<any> {
    return this.oauthService.loadDiscoveryDocument().then(() => {
      try {
        this.oauthService
          .tryLogin()
          .then(() => this.isDoneLoadingSubject$.next(true));
      } catch (e) {}
    });
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
