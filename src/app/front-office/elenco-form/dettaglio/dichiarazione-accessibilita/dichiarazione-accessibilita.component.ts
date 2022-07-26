import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HashService } from 'src/app/common/hash.service';
import { ElencoFormService } from '../../elenco-form.service';

@Component({
  selector: 'app-dichiacazione-accessibilita',
  templateUrl: './dichiarazione-accessibilita.component.html',
  styleUrls: ['./dichiarazione-accessibilita.component.scss'],
})
export class FormDichiarazioneAccessibilitaComponent implements OnInit {
  public id = '';
  public sezioneInformativaHome = '';
  public titoloSottomissione: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hashService: HashService,
    private elencoFormService: ElencoFormService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.elencoFormService.getFormsById(this.id).subscribe((res) => {
      this.titoloSottomissione = res.titolo;
      this.sezioneInformativaHome = res.sezioniInformative.home;
    });
  }
}
