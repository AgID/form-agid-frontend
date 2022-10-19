import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HashService } from '../hash.service';
import { BreadcrumbService } from './breadcrumb.service';
import { Breadcrumb } from './types/breadcrumb.type';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private hashService: HashService
  ) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  public resetMessage() {
    this.hashService.isModified = false;
    this.hashService.type = '';
    this.hashService.message = [{ label: '' }];
  }
}
