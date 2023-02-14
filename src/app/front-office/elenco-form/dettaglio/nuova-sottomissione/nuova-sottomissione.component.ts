import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElencoFormService } from '../../elenco-form.service';

@Component({
  selector: 'app-nuova-sottomissione',
  templateUrl: './nuova-sottomissione.component.html',
  styleUrls: ['./nuova-sottomissione.component.scss'],
})
export class NuovaSottomissioneComponent implements OnInit {
  public id = '';
  public form: any = {};
  public dataForm: any = {};
  public payloadNewSubmission: any = {
    idForm: '',
    versione: 0,
    versioneForm: 0,
    codiceUtenteInserimento: 'string',
    dataInserimento: new Date(),
    codiceUtenteModifica: 'string',
    dataUltimaModifica: new Date(),
    stato: '',
    verificaPubblicazione: false,
    idPubblicazione: 'UID',
    datiPubblicati: {},
    datiBozza: {},
  };

  public data = {};

  public renderOptions = {
    // readOnly: true,
    // renderMode: 'html'
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.elencoFormService
      .getFormsById(this.id)
      .subscribe((res) => (this.form = res));
  }

  public onChangeFormio(ev: any) {
    if (ev.data) {
      this.dataForm = ev;
    }
  }

  public salvaBozza() {
    this.payloadNewSubmission.idForm = this.id;
    this.payloadNewSubmission.stato = 'Bozza';
    this.payloadNewSubmission.datiBozza = this.dataForm.data;
    this.payloadNewSubmission.versioneForm = this.form.versione;
    this.elencoFormService
      .createSubmission(this.payloadNewSubmission)
      .subscribe((response) =>
        this.router.navigate([
          `/elenco-form/${response.idForm}/sottomissione/${response._id}`,
        ])
      );
  }
}
