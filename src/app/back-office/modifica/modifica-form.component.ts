import { Component, OnInit, ViewChild } from '@angular/core';
import { ElencoFormService } from '../../front-office/elenco-form/elenco-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SezioneMetadatiComponent } from '../components/sezione-metadati/sezione-metadati.component';
import { DatePipe } from '@angular/common';
import { SezioneBuilderComponent } from '../components/sezione-builder/sezione-builder.component';
import { IForm } from '../types/form.type';

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
    this.sezioneMetadatiComponent.metadati.titoloSchema = response.titolo;
    this.sezioneMetadatiComponent.metadati.descrizione = response.descrizione;
    this.sezioneMetadatiComponent.metadati.dataInizio = this.datePipe.transform(
      response.dataInizioValidita,
      'yyyy-MM-dd'
    );
    this.sezioneMetadatiComponent.metadati.dataFine = this.datePipe.transform(
      response.dataFineValidita,
      'yyyy-MM-dd'
    );
  }

  public buildFormRequest() {
    this.form.titolo = this.sezioneMetadatiComponent.metadati.titoloSchema;
    this.form.descrizione = this.sezioneMetadatiComponent.metadati.descrizione;
    this.form.dataInizioValidita = new Date(
      this.sezioneMetadatiComponent.metadati.dataInizio
    );
    this.form.dataFineValidita = new Date(
      this.sezioneMetadatiComponent.metadati.dataFine
    );
    this.form.components = this.sezioneBuilderComponent.form.components;
    this.form.dataUltimaModifica = new Date();
  }

  public onClickSalvaSchemaRilevazione() {
    if (!this.sezioneMetadatiComponent.validate()) {
      this.scrollToTop();
      return;
    }
    this.buildFormRequest();
    this.elencoFormService
      .updateForm(this.form._id, this.form)
      .subscribe(() => {
        this.ngOnInit();
        this.scrollToTop();
      });
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
