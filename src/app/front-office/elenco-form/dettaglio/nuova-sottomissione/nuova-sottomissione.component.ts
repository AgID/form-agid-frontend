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
    codiceUtenteInserimento: 'string',
    dataInserimento: new Date(),
    codiceUtenteModifica: 'string',
    dataUltimaModifica: new Date(),
    stato: '',
    verificaPubblicazione: {
      abilitata: true,
      campoUrlTarget: 'string',
    },
    idPubblicazione: 'UID',
    dati_pubblicati: {},
    dati_bozza: {},
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

  public onChangeFormio(data: any) {
    this.dataForm = data;
    console.log(data);
  }

  public salvaBozza() {
    this.payloadNewSubmission.idForm = this.id;
    this.payloadNewSubmission.stato = 'Bozza';
    this.payloadNewSubmission.dati_bozza = this.dataForm.data;
    this.elencoFormService
      .createSubmission(this.payloadNewSubmission)
      .subscribe((response) =>
        this.router.navigate([
          `./${response.idForm}/sottomissione/${response._id}`,
        ])
      );
  }
}
