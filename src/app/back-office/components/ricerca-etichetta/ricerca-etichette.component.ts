import { Component, ViewEncapsulation } from '@angular/core';
import { Pagination } from 'src/app/common/pagination.class';
import { HashService } from 'src/app/common/hash.service';
import { LanguageSelectorService } from 'src/app/common/language-selector/language-selector.service';

@Component({
  selector: 'app-ricerca-etichette',
  templateUrl: './ricerca-etichette.component.html',
  styleUrls: ['./ricerca-etichette.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RicercaEtichetteComponent {
  constructor(
    public hashService: HashService,
    public languageSlService: LanguageSelectorService
  ) {}

  public filters = {
    lingua: '',
    pagination: new Pagination(),
  };

  public onChangeLingua($e: any) {
    this.filters.lingua = $e.target.value;
    this.filters = {
      ...this.filters,
    };
  }

  public onChangeLang(lingua: any) {
    this.filters.lingua = lingua;
  }
}
