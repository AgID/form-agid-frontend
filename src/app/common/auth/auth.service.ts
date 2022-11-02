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
        this.oauthService.userinfoEndpoint = `${ENV.BACKEND_HOST}/v1/profile/info`; // Sovrascrittura endpoint
        this.oauthService.loadUserProfile();
      });

    this.canActivateProtectedRoutes$.subscribe((_) => {
      this.userInfo = this.oauthService.getIdentityClaims() as User;
      if (this.userInfo.id && !this.userInfo.email) {
        console.log({ userInfo: this.userInfo });
        this.router.navigate(['/verifica-mail']);
      }
    });
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
