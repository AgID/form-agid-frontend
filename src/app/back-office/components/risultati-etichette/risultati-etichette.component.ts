import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageSelectorService } from 'src/app/common/language-selector/language-selector.service';
import { HashService } from 'src/app/common/hash.service';
import { RisultatiEtichetteService } from './risultati-etichette.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-risultati-etichette',
  templateUrl: './risultati-etichette.component.html',
  styleUrls: ['./risultati-etichette.component.scss'],
})
export class RisultatiEtichetteComponent {
  @Input()
  filters: any;

  @Input()
  languagesList: any;

  @Input()
  elencoEtichette: any;

  @Input()
  etichetteAvailable: any;

  @Output()
  updated: EventEmitter<unknown> = new EventEmitter();

  public etichettaToUpdate: any;
  public elencoLingue: Array<any>;
  public totalElements: number;
  public selectedPage = 1;

  public myModal: any; //Modal
  public selectedRow: any; //Modal
  public selectedForm: any; //Modal
  public languages: any = [];

  private file: File;

  constructor(
    private router: Router,
    private risultatiEtichetteService: RisultatiEtichetteService,
    private languageSlService: LanguageSelectorService,
    private route: ActivatedRoute,
    public hashService: HashService
  ) {}

  public onChangePage(e: any) {
    this.filters.pagination.currentPage = e;
  }

  public redirectPage() {
    this.myModal.hide();
  }

  public onClickEliminaEtichetta(item: any) {
    // Modale
    this.myModal = new (<any>window).bootstrap.Modal(
      document.getElementById('deleteModal'),
      {
        keyboard: false,
        backdrop: 'static',
      }
    );
    this.myModal.show();
    this.selectedForm = item;
  }

  public deleteEtichetta() {
    this.risultatiEtichetteService
      .deleteLabel(this.selectedForm._id)
      .subscribe(() => {
        this.totalElements--;
        if (
          this.filters.pagination.currentPage > 1 &&
          this.totalElements % this.filters.pagination.elementsForPage === 0
        )
          this.filters.pagination.currentPage--;
      })
      .add(() => {
        this.redirectPage();
      });
  }

  public importLabel(file: any, item: any) {
    this.hashService.isModified = false;
    const input = file.target;
    if (input.files.length === 1 && input.files[0].size > 0) {
      const reader = new FileReader();
      new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(input.files[0]);
      })
        .then((content: any) => {
          try {
            if (this.isJsonString(content)) {
              this.risultatiEtichetteService
                .findLabelsForParams(item.codice)
                .subscribe((response: any) => {
                  this.etichettaToUpdate = response;
                })
                .add(() => {
                  if (this.etichettaToUpdate) {
                    this.etichettaToUpdate.data = JSON.parse(content);
                    this.risultatiEtichetteService
                      .updateLabel(JSON.parse(content))
                      .subscribe(() => {
                        this.updated.emit({ updated: true });
                      });
                  } else {
                    if (JSON.parse(content)) {
                      let reqBody = JSON.parse(content);
                      this.risultatiEtichetteService
                        .createLabel(reqBody)
                        .subscribe(() => {
                          this.updated.emit({ updated: true });
                        });
                    }
                  }
                });
              this.hashService.isModified = true;
              this.hashService.message = [
                { label: 'Modifica avvenuta con successo' },
              ];
              this.hashService.type = 'SUCCESS';
            } else {
              this.hashService.isModified = true;
              this.hashService.message = [
                { label: 'Il json non è formattato correttamente' },
              ];
              this.hashService.type = 'DANGER';
            }
          } catch (error) {
            //gestione errore front end
            this.hashService.isModified = true;
            this.hashService.message = [{ label: 'Modifica non avvenuta' }];
            this.hashService.type = 'DANGER';
          }
        })
        .catch((error) => console.log(error));
      this.scrollToTop();
    }
  }

  public exportLabel(item: any) {
    if (item) {
      const fileContent = { lang: '', data: '' };
      const a = document.createElement('a');
      let contentData = this.elencoEtichette.filter(
        (element: any) => element.lang === item.codice
      )[0];
      fileContent.data = contentData.data;
      fileContent.lang = contentData.lang;
      const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
        type: 'application/json',
      });
      a.href = URL.createObjectURL(blob);
      a.download = item.descrizione + '.json';
      a.click();
    }
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  isJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
