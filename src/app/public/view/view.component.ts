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
      Object.keys(this.formData).forEach(
        (key: string): void => {
          if (typeof this.formData[key] == "string") {
            this.formData[key] = this.formData[key].replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;");
          }
        }
      )
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
        const formSchemaResp: any = await firstValueFrom(this.viewService.findPublicFormById("667a7778eb31fe541e761a46"))
        let oggettoNome = "";
        let oggettoUrl = "";
        let specsLink = "";
        let prodAttLink = "https://form.agid.gov.it/form/procedura-attuazione/" + id
        const date = new Date(this.formData['application-published-date']);
        this.formData['application-published-date'] = date.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });

        if (this.formData["device-type"] == 'website') {
          this.formData["device-type"] = "Sito web"
          oggettoNome = this.formData['website-name']
          oggettoUrl = this.formData['website-url']
          this.formData['application-framework'] = "N/A"
          this.formData['application-os'] = "N/A"
        } else if (this.formData["device-type"] == 'mobile-app') {
          this.formData["device-type"] = "Applicazione mobile"
          oggettoNome = this.formData['app-name']
          oggettoUrl = this.formData['app-url']
          this.formData['website-cms'] = "N/A"
        }

        if (this.formData["specs-version"] == "wcag-20") {
          this.formData["specs-version"] = "WCAG 2.0"
          specsLink = "https://www.w3.org/Translations/WCAG20-it/"
        } else if (this.formData["specs-version"] == "wcag-21") {
          this.formData["specs-version"] = "WCAG 2.1"
          specsLink = "https://www.w3.org/Translations/WCAG21-it/"
        }

        if (this.formData["compliance-status"] == "compliant") {
          this.formData["compliance-status"] = "Conforme"
          this.formData["accessible-alternatives"] = "N/A"
        } else if (this.formData["compliance-status"] == "partially-compliant") {
          this.formData["compliance-status"] = "Parzialmente conforme"
        } else if (this.formData["compliance-status"] == "non-compliant") {
          this.formData["compliance-status"] = "Non conforme"
        }

        if (this.formData['reason-42004'] == true || this.formData['reason-42004'] == "reason-42004") {
          this.formData['reason-42004'] = "Sì"
        } else {
          this.formData['reason-42004'] = "No"
          this.formData['reason-42004-text'] = "N/A"
        }

        if (this.formData['reason-disproportionate-burden'] == true || this.formData['reason-disproportionate-burden'] == "reason-disproportionate-burden") {
          this.formData['reason-disproportionate-burden'] = "Sì"
        } else {
          this.formData['reason-disproportionate-burden'] = "No"
          this.formData['reason-disproportionate-burden-text'] = "N/A"
        }

        if (this.formData['reason-no-law'] == true || this.formData['reason-no-law'] == "reason-no-law") {
          this.formData['reason-no-law'] = "No"
        } else {
          this.formData['reason-no-law'] = "Sì"
          this.formData['reason-no-law-text'] = "N/A"
        }

        if (this.formData["methodology-details"] == "methodology-third-party") {
          this.formData["methodology-details"] = "Valutazione effettuata da terzi"
        } else if (this.formData["methodology-details"] == "methodology-auto") {
          this.formData["methodology-details"] = "Autovalutazione effettuata direttamente dal soggetto erogatore"
        }

        if (this.formData['methodology-model'] == "si") {
          this.formData['methodology-model'] = "Sì"
        } else {
          this.formData['methodology-model'] = "No"
        }

        if (this.formData['application-usability-test'] == "si") {
          this.formData['application-usability-test'] = "Sì"
        } else {
          this.formData['application-usability-test'] = "No"
        }

        if (this.formData['website-cms'] == "other") {
          this.formData['website-cms'] = this.formData['website-cms-other']
        } else if (this.formData['website-cms'] == "none") {
          this.formData['website-cms'] = "Nessuno"
        } else {
          this.formData['website-cms'] = this.formData['website-cms'][0].toUpperCase() + this.formData['website-cms'].slice(1);
        }

        if (this.formData['application-framework'] == "other") {
          this.formData['application-framework'] = this.formData['application-framework-other']
        } else if (this.formData['application-framework'] == "none") {
          this.formData['application-framework'] = "Nessuno"
        } else {
          this.formData['application-framework'] = this.formData['application-framework'][0].toUpperCase() + this.formData['application-framework'].slice(1).replace("-", " ");;
        }

        if (!this.formData['people-expenditure']) {
          this.formData['people-expenditure'] = "N/A"
        }

        if (this.formData['manager-present'] == "si") {
          this.formData['manager-present'] = "Sì"
        } else {
          this.formData['manager-present'] = "No"
        }

        if (this.formData['manager-appointed'] == "si") {
          this.formData['manager-appointed'] = "Sì"
        } else {
          this.formData['manager-appointed'] = "No"
        }

        this.formData = { ...this.formData, oggettoNome, oggettoUrl, specsLink, prodAttLink }

        this.formSchema = formSchemaResp;
        let deviceType = this.formData['device-type'];

        let oggettoDichiarazione =
          deviceType === 'Sito web'
            ? this.translate.instant('AG_Accessibilita_Etichetta_Web')
            : this.translate.instant('AG_Accessibilita_Etichetta_App');
        let name =
          deviceType === 'Sito web'
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
          deviceType === 'Sito web'
            ? this.formData['website-url']
            : this.formData['app-url'];
      }
    } catch (e) {
      this.isError = true;
    }
  }
}
