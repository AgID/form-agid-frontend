import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RicercaEtichetteComponent } from '../../components/ricerca-etichetta/ricerca-etichette.component';

@Component({
  selector: 'app-elenco-etichette',
  templateUrl: './elenco-etichette.component.html',
  styleUrls: ['./elenco-etichette.component.scss'],
})
export class ElencoEtichetteComponent {
  @ViewChild('ricercaEtichetteComponent')
  ricercaEtichetteComponent: RicercaEtichetteComponent;

  constructor(public route: ActivatedRoute, private router: Router) {}

  public filters: any;

  public searchEtichetta() {
    this.filters = null;
    setTimeout(() => {
      this.filters = this.ricercaEtichetteComponent.filters;
    });
  }

  public goToInserimentoEtichetta() {
    this.router.navigate(['/multilanguage/inserimento-etichetta']);
  }
}
