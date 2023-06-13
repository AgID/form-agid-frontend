import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackAccessibilitaService } from './feedback-accessibilita.service';
import { firstValueFrom } from 'rxjs';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { v1 as uuidv1 } from 'uuid';

@Component({
  selector: 'app-feedback-accessibilita',
  templateUrl: './feedback-accessibilita.component.html',
  styleUrls: ['./feedback-accessibilita.component.scss'],
})
export class FeedbackAccessibilitaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private feedbackAccessibilitaService: FeedbackAccessibilitaService,
    private router: Router
  ) {}

  public actualFormData: any = {};
  public formSchema: any = {};
  public renderOptions: any = {};
  public formData: any = {};
  public myModal: any; //Modal
  public uuidLink = '';
  public submission: any;
  public redattaIl: string = null;
  public isError: boolean = false;

  ngOnInit() {
    const idFormAccessibilita = this.route.snapshot.params['id'];
    this.getModuloFeedbackByIdAccessibilita(idFormAccessibilita);
  }

  private async getModuloFeedbackByIdAccessibilita(id: string) {
    try {
      const { form, submission } = await firstValueFrom(
        this.feedbackAccessibilitaService.getModuloFeedbackByIdAccessibilita(id)
      );
      this.formData = {
        'device-type': submission.datiPubblicati['device-type'],
        'website-url': submission.datiPubblicati['website-url'],
        'app-url': submission.datiPubblicati['app-url'],
        'app-name': submission.datiPubblicati['app-name'],
        'feedbacked-pa': submission.datiPubblicati['manager-email'],
      };
      this.formSchema = form;
      this.submission = submission;
    } catch (e) {
      this.isError = true;
      console.error(e);
    }
  }

  public onClickPubblica() {
    const idPubblicazione = uuidv1();
    const updateBody: ISottomissione = {
      datiPubblicati: this.actualFormData.data,
      stato: 'Pubblicato',
      versione: 1,
      versioneForm: this.formSchema.versione,
      idPubblicazione: idPubblicazione,
    };
    this.feedbackAccessibilitaService
      .insertFeedback(updateBody)
      .subscribe((response) => {
        const location = window.location.origin + '/view/';
        this.uuidLink = `${location}${updateBody.idPubblicazione}`;
        this.myModal = new (<any>window).bootstrap.Modal(
          document.getElementById('publishFeedbackModal'),
          {
            keyboard: false,
            backdrop: 'static',
          }
        );
        this.myModal.show();
      });
  }

  public onChangeFormio(data: any) {
    if (data.data) {
      this.actualFormData = data;
    }
  }

  public redirectPage() {
    if (this.myModal) this.myModal.hide();
    this.router.navigate([`/`]);
  }

  public onClickCopiaUUIDClipboard() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(this.uuidLink);
  }
}
