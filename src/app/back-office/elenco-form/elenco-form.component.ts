import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RicercaFormComponent } from '../components/ricerca-form/ricerca-form.component';
@Component({
  selector: 'app-elenco-form',
  templateUrl: './elenco-form.component.html',
  styleUrls: ['./elenco-form.component.scss'],
})
export class ElencoFormComponent {
  @ViewChild('ricercaFormComponent') ricercaFormComponent: RicercaFormComponent;

  constructor(public route: ActivatedRoute) {}

  public filters: any;

  public searchForm() {
    this.filters = null;
    setTimeout(() => {
      this.filters = this.ricercaFormComponent.filters;
    });
  }
}
