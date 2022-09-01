import { Component, OnInit, ViewChild } from '@angular/core';
import { ElencoFormService } from '../../front-office/elenco-form/elenco-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SezioneMetadatiComponent } from '../components/sezione-metadati/sezione-metadati.component';
import { DatePipe } from '@angular/common';
import { SezioneBuilderComponent } from '../components/sezione-builder/sezione-builder.component';
import { IForm } from '../types/form.type';
import { IMetadatiType } from '../types/metadati.type';

@Component({
  selector: 'app-modifica-form',
  templateUrl: './modifica-form.component.html',
  styleUrls: ['./modifica-form.component.scss'],
})
export class ModificaFormComponent implements OnInit {
  @ViewChild('sezioneMetadatiComponent')
  public sezioneMetadatiComponent: SezioneMetadatiComponent;

  @ViewChild('sezioneBuilderComponent')
  public sezioneBuilderComponent: SezioneBuilderComponent;

  public form: IForm;
  public id: any;

  public metadati: IMetadatiType;

  public isModified: boolean = false;
  public message: Array<any> = [{ label: 'Modifica avvenuta con successo' }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.elencoFormService.getFormsById(this.id).subscribe((response) => {
      this.form = response;
      this.buildFormMetadati(response);
    });
  }

  private buildFormMetadati(response: any) {
    const {
      titolo,
      sezioniInformative,
      descrizione,
      dataInizioValidita,
      dataFineValidita,
    } = response;

    this.metadati = {
      titolo,
      descrizione,
      sezioniInformative,
      dataInizioValidita: this.datePipe.transform(
        dataInizioValidita,
        'yyyy-MM-dd'
      ),
      dataFineValidita: this.datePipe.transform(dataFineValidita, 'yyyy-MM-dd'),
    };
  }

  public buildFormRequest() {
    const {
      descrizione,
      titolo,
      dataFineValidita,
      dataInizioValidita,
      sezioniInformative,
    } = this.metadati;
    this.form = {
      ...this.form,
      titolo,
      sezioniInformative,
      descrizione,
      dataInizioValidita: new Date(dataInizioValidita),
      dataFineValidita: new Date(dataFineValidita),
      components: this.sezioneBuilderComponent.form.components,
      dataUltimaModifica: new Date(),
    };
  }

  public onClickSalvaBozzaSchemaRilevazione() {
    if (!this.sezioneMetadatiComponent.validate()) {
      this.scrollToTop();
      return;
    }
    this.buildFormRequest();
    this.form.stato = 'Bozza';
    this.elencoFormService
      .updateForm(this.form._id, this.form)
      .subscribe(() => {
        this.ngOnInit();
        this.isModified = true;
        this.scrollToTop();
      });
  }

  public onClickPubblicaSchemaRilevazione() {
    if (!this.sezioneMetadatiComponent.validate()) {
      this.scrollToTop();
      return;
    }
    this.buildFormRequest();
    this.form.stato = 'Pubblicato';
    this.elencoFormService
      .updateForm(this.form._id, this.form)
      .subscribe(() => {
        this.ngOnInit();
        this.isModified = true;
        this.scrollToTop();
      });
  }

  public changeMetadati(event: any) {
    this.isModified = false;
  }

  public changeForm(event: any) {
    this.isModified = false;
  }

  public goToTornaAllaRicerca() {
    this.router.navigate(['/admin']);
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
