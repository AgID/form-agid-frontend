import { Component, OnInit, ViewChild } from '@angular/core';
import { ElencoFormService } from '../../front-office/elenco-form/elenco-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SezioneMetadatiComponent } from '../components/sezione-metadati/sezione-metadati.component';
import { DatePipe } from '@angular/common';
import { SezioneBuilderComponent } from '../components/sezione-builder/sezione-builder.component';
import { IForm } from '../types/form.type';
import { IMetadatiType } from '../types/metadati.type';
import { Utils } from 'formiojs';

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
  public initialComponentsForm: any;
  public id: any;

  public metadati: IMetadatiType;

  public isModified: boolean = false;
  public hasSottomissioni: boolean = false;
  public message: Array<any> = [{ label: 'Modifica avvenuta con successo' }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.elencoFormService
      .getFormsById(this.id)
      .subscribe((response) => {
        this.form = response;
        this.initialComponentsForm = Utils.flattenComponents(
          this.form.components,
          false
        );
        this.buildFormMetadati(response);
      })
      .add(() => {
        //elenco sottomissioni
        this.elencoFormService.hasSubmissions(this.id).subscribe(
          (res: any) => {
            this.hasSottomissioni = res;
          },
          (err) => console.log(err)
        );
      });
  }

  private buildFormMetadati(response: any) {
    const {
      titolo,
      titoloPattern,
      sezioniInformative,
      descrizione,
      abilitaStatistiche,
      dataInizioValidita,
      acl,
      dataFineValidita,
      verificaPubblicazione,
      stato,
      versione,
    } = response;

    this.metadati = {
      titolo,
      titoloPattern,
      descrizione,
      sezioniInformative,
      abilitaStatistiche,
      verificaPubblicazione,
      stato,
      acl,
      versione,
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
      titoloPattern,
      abilitaStatistiche,
      dataFineValidita,
      acl,
      dataInizioValidita,
      sezioniInformative,
      verificaPubblicazione,
      versione,
    } = this.metadati;
    this.form = {
      ...this.form,
      titolo,
      titoloPattern,
      sezioniInformative,
      descrizione,
      acl,
      abilitaStatistiche,
      versione,
      verificaPubblicazione,
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
        this.isModified = true;
      })
      .add(() => {
        this.ngOnInit();
        this.scrollToTop();
      });
  }

  public onClickPubblicaSchemaRilevazione() {
    if (!this.sezioneMetadatiComponent.validate()) {
      this.scrollToTop();
      return;
    }
    let finalComponentsForm = Utils.flattenComponents(
      this.form.components,
      false
    );
    this.buildFormRequest();
    if (
      this.form.stato === 'Pubblicato' &&
      this.hasSottomissioni &&
      this.componentChanged(finalComponentsForm)
    ) {
      this.form.versione++;
    }
    this.form.stato = 'Pubblicato';
    this.elencoFormService
      .updateForm(this.form._id, this.form)
      .subscribe(() => {
        this.isModified = true;
      })
      .add(() => {
        this.ngOnInit();
        this.scrollToTop();
      });
  }

  public componentChanged(fc: any): boolean {
    if (
      Object.keys(this.initialComponentsForm).length === Object.keys(fc).length
    ) {
      for (const key of Object.keys(fc)) {
        if (
          !this.initialComponentsForm[key] ||
          this.initialComponentsForm[key].type !== fc[key].type
        )
          return true;
      }
    } else {
      return true;
    }
    return false;
  }

  public changeMetadati(event: any) {
    this.metadati = event;
    this.isModified = false;
  }

  public changeAcl(event: any) {
    this.metadati.acl = event;
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
