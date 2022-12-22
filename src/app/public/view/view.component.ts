import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElencoFormService } from 'src/app/front-office/elenco-form/elenco-form.service';
import { ViewService } from './view.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private viewService: ViewService
  ) {}

  public actualFormData: any;
  public formSchema: any;
  public renderOptions: any = {
    readOnly: true,
    renderMode: 'html',
  };
  public formData: any;
  public submission: any;
  public redattaIl: string = null;

  ngOnInit() {
    const idForm = this.route.snapshot.params['id'];
    this.findSottomissione(idForm);
  }

  public onChangeFormio(data: any) {
    if (data.data) {
      this.actualFormData = data;
    }
  }

  private findSottomissione(id: string) {
    this.viewService.findSottomissioneById(id).subscribe((res: any) => {
      this.formSchema = res.form[0];
      this.formData = res.datiPubblicati;
      this.submission = res;
      this.redattaIl = res.dataUltimaModifica
        ? new Date(res.dataUltimaModifica).toLocaleDateString()
        : new Date(res.dataInserimento).toLocaleDateString();
    });
  }
}
