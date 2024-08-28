import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
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

    const publicPages = ['/media-policy', '/note-legali', '/privacy-policy', '/not-found']
    const routerIgnoreCondition: boolean = publicPages.includes(window.location.pathname);

    this.canActivateProtectedRoutes$.subscribe((_) => {
      this.userInfo = this.oauthService.getIdentityClaims() as User;
      const userProvider = this.getUserProvider();
      const policy = this.userInfo.user_policy.find(userPolicy => userPolicy.entity === null)?.policy;;
      if (
        this.checkRoleStatus(policy, 'RTD', 'Active') && window.location.pathname.includes('/aggiungi-amministrazione')) {
        this.router.navigate(['/aggiungi-amministrazione']);
      }
      else if (
        this.checkRoleStatus(policy, 'RTD', 'Active') && window.location.pathname.includes('/lista-amministrazioni')) {
        this.router.navigate(['/lista-amministrazioni']);
      }
      //Gestione utente SPID/CIE/CNS e ha la policy vuota
      else if (
        this.checkProvider(userProvider) &&
        (this.userInfo.user_policy?.length === 0 ||
          (this.userInfo.user_policy?.length && policy?.entity?.length === 0))
      ) {
        this.router.navigate(['/identifica-amministrazione']);
        // this.router.navigate(['/scelta-utente']);
      }
      //Se è un RTD in pending deve essere dirottato sulla scelta dell'amministrazione
      else if (
        this.checkProvider(userProvider) &&
        this.checkRoleStatus(policy, 'RTD', 'Pending')
      ) {
        this.router.navigate(['/identifica-amministrazione']);
      }
      //Se è un RTD in active deve essere dirottato sull'elenco-form'
      else if (
        this.checkProvider(userProvider) &&
        policy?.entity?.some((entity: { role: string; status: string; }) => entity.role === 'RTD' && entity.status === 'Active')
      ) {
        if (!window.location.pathname.includes('/view/') && !routerIgnoreCondition &&
          !window.location.pathname.includes('/elenco-form')) {
          this.router.navigate(['/elenco-form']);
        }
      } else if (!routerIgnoreCondition) {
        this.router.navigate(['/']);
      }
    });
  }

  private checkProvider(userProvider: String) {
    return (this.userInfo && userProvider === 'SPID') ||
      userProvider === 'CIE' ||
      userProvider === 'CNS'
  }

  private getUserProvider(): 'SPID' | 'CIE' | 'CNS' | 'MICROSOFT' {
    return this.userInfo?.sub.slice(0, this.userInfo.sub.indexOf(':')) as any;
  }

  private checkRoleStatus(policy: any, role: String, status: String) {
    return policy?.entity?.some((entity: { role: string; status: string; }) => entity.role === role && entity.status === status)
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
      } catch (e) { }
    });
  }

  public login(targetUrl?: string) {
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public logout() {
    this.oauthService.logOut();
  }

  public hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }
}
