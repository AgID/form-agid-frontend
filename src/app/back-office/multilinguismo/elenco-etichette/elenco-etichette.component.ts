import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { HashService } from 'src/app/common/hash.service';
import { LanguageSelectorService } from 'src/app/common/language-selector/language-selector.service';
import { RicercaEtichetteComponent } from '../../components/ricerca-etichetta/ricerca-etichette.component';
import { RisultatiEtichetteService } from '../../components/risultati-etichette/risultati-etichette.service';
import { Title } from '@angular/platform-browser';

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
    private risultatiEtichetteService: RisultatiEtichetteService,
    public hashService: HashService,
    private titleService: Title
  ) {}

  public filters: any;
  public updated: boolean = false;
  public labels: any = [];
  public languagesList: any;
  public elencoEtichette: any;
  public etichetteAvailable: any = [];

  public searchEtichetta(resetAlert: boolean = false) {
    if (resetAlert) {
      this.hashService.isModified = false;
    }
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

  public updatedLabels(e: any) {
    this.updated = e.updated;
    if (this.updated) this.searchEtichetta();
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

  public goToTornaAllaRicerca() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Multilinguismo');
  }
}
