import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { LanguageSelectorService } from 'src/app/common/language-selector/language-selector.service';
import { RicercaEtichetteComponent } from '../../components/ricerca-etichetta/ricerca-etichette.component';
import { RisultatiEtichetteService } from '../../components/risultati-etichette/risultati-etichette.service';

@Component({
  selector: 'app-elenco-etichette',
  templateUrl: './elenco-etichette.component.html',
  styleUrls: ['./elenco-etichette.component.scss'],
})
export class ElencoEtichetteComponent {
  @ViewChild('ricercaEtichetteComponent')
  ricercaEtichetteComponent: RicercaEtichetteComponent;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private languageSlService: LanguageSelectorService,
    private risultatiEtichetteService: RisultatiEtichetteService
  ) {}

  public filters: any;
  public labels: any = [];
  public languagesList: any;
  public elencoEtichette: any;
  public etichetteAvailable: any = [];

  public searchEtichetta() {
    this.filters = this.ricercaEtichetteComponent.filters;
    this.risultatiEtichetteService.findAll().subscribe((response: any) => {
      this.elencoEtichette = response;
    });
    if (this.filters.lingua) {
      this.languageSlService
        .getLanguageByCode(this.filters.lingua)
        .subscribe((response) => {
          this.languagesList = response;
        })
        .add(() => {
          this.availableExportButton();
        });
    } else {
      this.languageSlService
        .getLanguages()
        .subscribe((response) => {
          this.languagesList = response;
        })
        .add(() => {
          this.availableExportButton();
        });
    }
  }

  public goToInserimentoEtichetta() {
    this.router.navigate(['/multilanguage/inserimento-etichetta']);
  }

  private availableExportButton() {
    for (let i = 0; i < this.languagesList.length; i++) {
      let codeLanguage = this.languagesList[i].codice;
      let labelsArrTemp = this.elencoEtichette.filter(
        (element: { lang: any }) => element.lang === codeLanguage
      );
      if (labelsArrTemp.length > 0) {
        this.etichetteAvailable[i] = false;
      } else {
        this.etichetteAvailable[i] = true;
      }
    }
  }
}
