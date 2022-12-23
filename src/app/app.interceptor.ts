import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AuthService } from './common/auth/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  public constructor(public authService: AuthService) {}
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    const modifiedReq =
      accessToken && !request.url.includes('openid-configuration')
        ? request.clone({
            headers: request.headers.set('access-token', accessToken),
          })
        : request;
    return next.handle(modifiedReq).pipe(
      catchError((err) => {
        // onError
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403 || err.status === 401) {
            alert(
              'Il token è scaduto, si prega di effettuare di nuovo il login'
            );
            this.authService.login();
          }
        }
        throw new Error(err);
      })
    );
  }
}
