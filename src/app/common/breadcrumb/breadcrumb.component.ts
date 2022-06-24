import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from './breadcrumb.service';
import { Breadcrumb } from './types/breadcrumb.type';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }
}
