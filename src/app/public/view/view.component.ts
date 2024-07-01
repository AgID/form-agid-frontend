import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ViewService } from './view.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private viewService: ViewService,
    private translate: TranslateService,
    private titleService: Title
  ) { }

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

  public isObiettiviAccessibilita = false;

  public isDichiarazioneAccessibilita = false;
  public preamboloDescrizioneDichiarazioneAccessibilitaHeader = '';
  public preamboloDescrizioneDichiarazioneAccessibilitaFooter = '';
  public preamboloDescrizioneDichiarazioneAccessibilitaSite = '';

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Dettaglio pubblicazione');
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
      this.isDichiarazioneAccessibilita = this.formSchema.titolo
        .toLowerCase()
        .includes('dichiarazione di accessibilit');
      this.isObiettiviAccessibilita = this.formSchema.titolo
        .toLowerCase()
        .includes('obiettivi di accessibilit');
      if (this.isDichiarazioneAccessibilita) {
        const formSchemaResp: any = await firstValueFrom(this.viewService.findFormById("667ac89a34ab6f99edd71b91"))
        this.formSchema = formSchemaResp;
        let deviceType = this.formData['device-type'];
        let oggettoDichiarazione =
          deviceType === 'website'
            ? this.translate.instant('AG_Accessibilita_Etichetta_Web')
            : this.translate.instant('AG_Accessibilita_Etichetta_App');
        let name =
          deviceType === 'website'
            ? this.formData['website-name']
            : this.formData['app-name'];
        this.preamboloDescrizioneDichiarazioneAccessibilitaHeader =
          this.translate
            .instant('AG_Accessibilita_Preambolo_Pubblico_Header')
            .replace('{{ente}}', `<strong>${this.submission.ente}</strong>`)
            .replace(
              '{{oggetto_dichiarazione}}',
              `<strong>${oggettoDichiarazione}</strong>`
            );
        this.preamboloDescrizioneDichiarazioneAccessibilitaFooter =
          this.translate
            .instant('AG_Accessibilita_Preambolo_Pubblico_Footer')
            .replace('{{name}}', `<strong>${name}</strong>`);
        this.preamboloDescrizioneDichiarazioneAccessibilitaSite =
          deviceType === 'website'
            ? this.formData['website-url']
            : this.formData['app-url'];
      }
    } catch (e) {
      this.isError = true;
    }
  }
}
