import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
  public isError: boolean = false;

  ngOnInit() {
    const idForm = this.route.snapshot.params['id'];
    this.findSottomissione(idForm);
  }

  public onChangeFormio(data: any) {
    if (data.data) {
      this.actualFormData = data;
    }
  }

  private async findSottomissione(id: string) {
    try {
      const res: any = await firstValueFrom(
        this.viewService.findSottomissioneById(id)
      );
      this.formSchema = res.form[0];
      this.formData = res.datiPubblicati;
      this.submission = res;
      this.redattaIl = res.dataUltimaModifica
        ? new Date(res.dataUltimaModifica).toLocaleDateString()
        : new Date(res.dataInserimento).toLocaleDateString();
    } catch (e) {
      this.isError = true;
    }
  }
}
