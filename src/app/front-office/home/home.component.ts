import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';
import { ElencoFormService } from '../elenco-form/elenco-form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private elencoFormService: ElencoFormService,
    private authService: AuthService,
    private router: Router
  ) {}

  statistiche: any[] = [];

  ngOnInit(): void {
    this.checkUserMail();
    this.elencoFormService.getStatistichePubblicati().subscribe((result) => {
      this.statistiche = result;
    });
  }

  private checkUserMail() {
    const identity: any = this.authService.identityClaims();
    console.log(identity);
    if (identity && !identity?.email) {
      this.router.navigate(['/verifica-mail']);
    }
  }
}
