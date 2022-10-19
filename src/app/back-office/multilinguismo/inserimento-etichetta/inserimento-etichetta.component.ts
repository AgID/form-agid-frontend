import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HashService } from 'src/app/common/hash.service';
import { RicercaEtichetteComponent } from '../../components/ricerca-etichetta/ricerca-etichette.component';
import { RisultatiEtichetteService } from '../../components/risultati-etichette/risultati-etichette.service';
import { ILabel } from '../../types/label.type';

@Component({
  selector: 'app-inserimento-etichetta',
  templateUrl: './inserimento-etichetta.component.html',
  styleUrls: ['./inserimento-etichetta.component.scss'],
})
export class InserimentoEtichettaComponent {
  @ViewChild('ricercaEtichetteComponent')
  ricercaEtichetteComponent: RicercaEtichetteComponent;

  public label: ILabel = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private risultatiEtichettaService: RisultatiEtichetteService,
    private datePipe: DatePipe,
    public hashService: HashService
  ) {}

  public onClickInserimentoEtichetta() {
    this.label = this.ricercaEtichetteComponent.filters;

    this.risultatiEtichettaService.createLabel(this.label).subscribe(
      (response) => {
        this.hashService.isModified = true;
        this.hashService.type = 'SUCCESS';
        this.hashService.message = [
          { label: 'Inserimento avvenuto con successo' },
        ];
        this.scrollToTop();
        this.router.navigate([
          `/multilanguage/modifica-etichetta/${response._id}`,
        ]);
      },
      (error) => {
        this.hashService.isModified = true;
        this.hashService.message = [{ label: 'Inserimento non avvenuto' }];
        this.hashService.type = 'DANGER';
      }
    );
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  public goToTornaAllaRicerca() {
    this.router.navigate(['/multilanguage']);
  }
}
