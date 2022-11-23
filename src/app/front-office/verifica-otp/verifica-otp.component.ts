import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { VerificaOtpService } from './verifica-otp.service';

@Component({
  selector: 'app-verifica-otp',
  templateUrl: './verifica-otp.component.html',
  styleUrls: ['./verifica-otp.component.scss'],
})
export class VerificaOtpComponent {
  public otp = '';
  public isValidOtp = true;

  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private verificaOtp: VerificaOtpService
  ) {}

  public onKeyUpOtp(e: any) {
    this.otp = e.target.value;
    this.isValidOtp = true;
  }

  public onClickOTP() {
    this.verificaOtp
      .effettuaValidazione({ codiceValidazione: this.otp })
      .subscribe((res) => {
        this.router.navigate(['/elenco-form']);
      });
  }
}
