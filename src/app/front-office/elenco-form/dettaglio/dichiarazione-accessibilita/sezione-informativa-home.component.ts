import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElencoFormService } from '../../elenco-form.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sezione-informativa-home',
  templateUrl: './sezione-informativa-home.component.html',
  styleUrls: ['./sezione-informativa-home.component.scss'],
})
export class SezioneInformativaHomeComponent implements OnInit {
  public id = '';
  public sezioneInformativaHome = '';
  public titoloSottomissione: string;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private elencoFormService: ElencoFormService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('AGID Form | Descrizione form');
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.elencoFormService.getFormsById(this.id).subscribe((res) => {
      this.titoloSottomissione = res.titolo;
      this.sezioneInformativaHome = res.sezioniInformative.home;
    });
  }
}
