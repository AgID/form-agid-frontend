import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/common/alert/types/alert.type';
import { AuthService } from 'src/app/common/auth/auth.service';
import { HashService } from 'src/app/common/hash.service';
import { VerificaMailService } from './verifica-mail.service';

@Component({
  selector: 'app-verifica-mail',
  templateUrl: './verifica-mail.component.html',
  styleUrls: ['./verifica-mail.component.scss'],
})
export class VerificaMailComponent implements OnInit {
  public email = '';
  public isValidEmail = true;

  public errorMessage: Array<any> = [{ label: 'Campo obbligatorio' }];
  public typeAlert: AlertType = 'DANGER';

  constructor(
    private verificaMailService: VerificaMailService,
    private router: Router,
    private route: ActivatedRoute,
    private hashService: HashService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.userInfo?.email) {
      this.router.navigate([`../home`], {
        relativeTo: this.route,
      });
    } else {
      //Controllo stato validazione (se non esiste la mail)
      this.verificaMailService
        .getStatoValidazione()
        .subscribe((response: any) => {
          // this.hashService.statoValidazioneUtente = response;
          if (
            response.state === 'NEVER_VALIDATE' ||
            response.state === 'EXPIRED'
          ) {
            //redirect a questa pagina quando metteremo la pagina precedente di guard
          }
          //Se è in fase di validazione mi porta alla pagina di OTP
          if (response.state === 'VALIDATION') {
            this.router.navigate([`../verifica-otp`], {
              relativeTo: this.route,
            });
          }
        });
    }
  }

  public onKeyUpEmail(e: any) {
    this.email = e.target.value;
    this.isValidEmail = true;
  }

  public onClickInviaCodiceOTP() {
    this.verificaMailService.inviaCodiceOTP(this.email).subscribe((res) => {
      this.router.navigate([`../verifica-otp`], {
        relativeTo: this.route,
      });
    });
  }
}
