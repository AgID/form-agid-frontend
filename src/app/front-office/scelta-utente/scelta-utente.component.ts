import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';
import { HashService } from 'src/app/common/hash.service';
import { SceltaUtenteService } from './scelta-utente.service';

@Component({
  selector: 'app-scelta-utente',
  templateUrl: './scelta-utente.component.html',
  styleUrls: ['./scelta-utente.component.scss'],
})
export class SceltaUtenteComponent {
  public email = '';
  public typeUser = '';

  constructor(
    private sceltaUtenteService: SceltaUtenteService,
    private router: Router,
    private route: ActivatedRoute,
    private hashService: HashService,
    private authService: AuthService
  ) {}

  public onChangeCittadino($e: any) {
    this.typeUser = $e.target.value;
  }

  public onChangeRtd($e: any) {
    this.typeUser = $e.target.value;
  }

  public onClickConferma() {
    switch (this.typeUser) {
      case 'cittadino': {
        if (!this.authService.userInfo.email) {
          this.router.navigate(['/verifica-mail']);
        } else
          this.sceltaUtenteService
            .nuovoProfiloCittadino({
              email: this.authService.userInfo.email,
            })
            .subscribe(() => {
              this.authService.getUserInfo().then(() => {
                this.router.navigate(['/home']);
              });
            });
        break;
      }
      case 'rtd': {
        this.router.navigate(['/identifica-amministrazione']);
        break;
      }
    }
  }
}
