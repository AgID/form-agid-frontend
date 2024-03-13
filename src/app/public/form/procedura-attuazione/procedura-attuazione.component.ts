import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProceduraAttuazioneAccessibilitaService } from './procedura-attuazione.service';
import { firstValueFrom } from 'rxjs';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { v1 as uuidv1 } from 'uuid';
import { Utils } from 'formiojs';
import { VerificaOtpService } from 'src/app/front-office/verifica-otp/verifica-otp.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-procedura-attuazione',
  templateUrl: './procedura-attuazione.component.html',
  styleUrls: ['./procedura-attuazione.component.scss'],
})
export class ProceduraAttuazioneAccessibilitaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private proceduraAttuazioneAccessibilitaService: ProceduraAttuazioneAccessibilitaService,
    private router: Router,
    private verificaOtpService: VerificaOtpService,
    private titleService: Title
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
  public emailVerified = false;

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Procedura attuazione');
    const idFormAccessibilita = this.route.snapshot.params['id'];
    this.getModuloProceduraAttuazioneByIdAccessibilita(idFormAccessibilita);
  }

  @HostListener('inviaCodiceOtp') // Custom event ricevuto dal form
  async inviaCodiceOtp() {
    const email = this.actualFormData?.data?.email || '';
    if (!email) return;

    await firstValueFrom(
      this.verificaOtpService.richiediValidazionePubblica({ email })
    );
    const codiceOtp = Utils.getComponent(
      this.formSchema.components,
      'codiceOtp',
      true
    );
    const verificaCodiceOtp = Utils.getComponent(
      this.formSchema.components,
      'verificaCodiceOtp',
      true
    );

    codiceOtp.hidden = false;
    codiceOtp.disabled = false;
    verificaCodiceOtp.hidden = false;
    verificaCodiceOtp.disabled = false;

    this.formSchema = { ...this.formSchema };
  }

  @HostListener('verificaCodiceOtp') // Custom event ricevuto dal form
  async verificaCodiceOtp() {
    const inviaCodiceOtp = Utils.getComponent(
      this.formSchema.components,
      'inviaCodiceOtp',
      true
    );
    const codiceOtp = Utils.getComponent(
      this.formSchema.components,
      'codiceOtp',
      true
    );
    const verificaCodiceOtp = Utils.getComponent(
      this.formSchema.components,
      'verificaCodiceOtp',
      true
    );

    const codiceOtpError = Utils.getComponent(
      this.formSchema.components,
      'codice-otp-error',
      true
    );

    const email = this.actualFormData?.data?.email || '';
    if (!email) return;

    const codiceValidazione = this.actualFormData?.data?.codiceOtp || '';
    try {
      const isValidated = await firstValueFrom(
        this.verificaOtpService.effettuaValidazionePubblica({
          email,
          codiceValidazione,
        })
      );
      verificaCodiceOtp.disabled = true;
      codiceOtp.disabled = true;
      inviaCodiceOtp.disabled = true;
      this.emailVerified = true;
      codiceOtpError.hidden = true;
    } catch (e) {
      if (codiceOtpError) {
        codiceOtpError.hidden = false;
      }
    }
    this.formSchema = { ...this.formSchema };
  }

  private async getModuloProceduraAttuazioneByIdAccessibilita(id: string) {
    try {
      const { form, submission } = await firstValueFrom(
        this.proceduraAttuazioneAccessibilitaService.getModuloProceduraAttuazioneByIdAccessibilita(
          id
        )
      );
      this.formData = {
        'device-type': submission.datiPubblicati['device-type'],
        'website-url': submission.datiPubblicati['website-url'],
        'app-url': submission.datiPubblicati['app-url'],
        'app-name': submission.datiPubblicati['app-name'],
        'reported-pa': submission.ente,
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
    this.proceduraAttuazioneAccessibilitaService
      .insertProceduraAttuazione(updateBody)
      .subscribe((response) => {
        const location = window.location.origin + '/view/';
        this.uuidLink = `${location}${updateBody.idPubblicazione}`;
        this.myModal = new (<any>window).bootstrap.Modal(
          document.getElementById('publishProceduraAttuazioneModal'),
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
