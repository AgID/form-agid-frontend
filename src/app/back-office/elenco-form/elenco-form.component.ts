import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RicercaFormComponent } from '../components/ricerca-form/ricerca-form.component';
@Component({
  selector: 'app-elenco-form-bo',
  templateUrl: './elenco-form.component.html',
  styleUrls: ['./elenco-form.component.scss'],
})
export class ElencoFormComponent {
  @ViewChild('ricercaFormComponent') ricercaFormComponent: RicercaFormComponent;

  constructor(public route: ActivatedRoute, private router: Router) {}

  public filters: any;

  public searchForm() {
    this.filters = null;
    setTimeout(() => {
      this.filters = this.ricercaFormComponent.filters;
    });
  }

  public goToInserimentoForm() {
    this.router.navigate(['/admin/inserimento-form']);
  }
}
