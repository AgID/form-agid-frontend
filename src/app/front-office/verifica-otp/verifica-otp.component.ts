import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { AuthService } from 'src/app/common/auth/auth.service';
import { VerificaOtpService } from './verifica-otp.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-verifica-otp',
  templateUrl: './verifica-otp.component.html',
  styleUrls: ['./verifica-otp.component.scss'],
})
export class VerificaOtpComponent {
  public otp = '';
  public isValidOtp = true;
  public user_id: number;
  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private verificaOtp: VerificaOtpService,
    private titleService: Title,
    private authService: AuthService
  ) {}

  public onKeyUpOtp(e: any) {
    this.otp = e.target.value;
    this.isValidOtp = true;
  }

  public onClickOTP() {
    this.verificaOtp
      .effettuaValidazione({ codiceValidazione: this.otp })
      .subscribe(() => {
        const policy = this.authService.userInfo.user_policy.find(userPolicy => userPolicy.entity === null)?.policy;
        if (policy) {
          policy.entity.forEach((entity: {status: string;}) => {
            entity.status = 'Active';
          });
          this.verificaOtp
            .modificaProfilo(policy)
            .subscribe((res: any) => {
              this.user_id = res.user_id;
            });
        }
      })
      .add(() => {
        this.authService.getUserInfo().then(() => {
          if (this.user_id) this.router.navigate(['/elenco-form']);
        });
      });
  }
   

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Verifica OTP');
  }
}
