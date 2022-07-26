import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {finalize, Observable} from 'rxjs';
import {NgxSpinnerService} from "ngx-spinner";


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  service_count = 0;

  constructor(private spinner: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.service_count++; // increment count for each intercepted http request. Also display spinner.
    this.spinner.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.service_count--;
        // decrement when http call is completed (success/failed both handled when finalize rxjs operator used)

        if (this.service_count === 0) {
          // Last http call completed so remove spinner
          this.spinner.hide();
        }
      }),
    );
  }
}
