import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProceduraAttuazioneAccessibilitaService } from './procedura-attuazione.service';
import { firstValueFrom } from 'rxjs';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';
import { v1 as uuidv1 } from 'uuid';

@Component({
  selector: 'app-procedura-attuazione',
  templateUrl: './procedura-attuazione.component.html',
  styleUrls: ['./procedura-attuazione.component.scss'],
})
export class ProceduraAttuazioneAccessibilitaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private proceduraAttuazioneAccessibilitaService: ProceduraAttuazioneAccessibilitaService,
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
    this.getModuloProceduraAttuazioneByIdAccessibilita(idFormAccessibilita);
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
