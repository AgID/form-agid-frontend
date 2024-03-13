import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Pagina non trovata');
  }
}
