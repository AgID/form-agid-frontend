import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HashService } from 'src/app/common/hash.service';
import { RisultatiEtichetteService } from '../../components/risultati-etichette/risultati-etichette.service';
import { ILabel } from '../../types/label.type';

@Component({
  selector: 'app-modifica-eticheta',
  templateUrl: './modifica-etichetta.component.html',
  styleUrls: ['./modifica-etichetta.component.scss'],
})
export class ModificaEtichettaComponent implements OnInit {
  public label: ILabel;
  public id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private risultatiEtichettaService: RisultatiEtichetteService,
    private datePipe: DatePipe,
    public hashService: HashService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.risultatiEtichettaService
      .getLabelsById(this.id)
      .subscribe((response) => {
        this.label = response;
      });
  }

  public goToTornaAllaRicerca() {
    this.hashService.isModified = false;
    this.router.navigate(['/multilanguage']);
  }

  public onClickSalvaEtichetta() {}
}
