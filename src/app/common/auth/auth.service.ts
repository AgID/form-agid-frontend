import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, filter, Observable } from 'rxjs';
import { Router } from '@angular/router';
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
  ]).pipe(map((values) => values.every((b) => b)));

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
      .subscribe((e) => this.oauthService.loadUserProfile());
  }

  async initAuth(): Promise<any> {
    return this.oauthService
      .loadDiscoveryDocument()
      .then(() => new Promise<void>((resolve) => resolve()))
      .then(() => this.oauthService.tryLogin())
      .catch(() => this.isDoneLoadingSubject$.next(true));
  }

  public identityClaims() {
    this.userInfo = this.oauthService.getIdentityClaims() as any;
    return this.userInfo;
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
