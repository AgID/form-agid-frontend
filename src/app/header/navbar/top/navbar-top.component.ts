import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../common/auth/auth.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
})
export class NavbarTopComponent implements OnInit {
  @Input()
  public titolo: string;

  @Input()
  public user: string;

  public selectedLanguage = '';

  constructor(
    public authService: AuthService,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.getSelectedLanguage();
  }

  public onChangeSelectedLanguage(lingua: string) {
    // TODO: Ottenere la lingua selezionata dal servizio di Backend
    const messages = {}; // FETCH BE

    this.selectedLanguage = lingua;
    localStorage.setItem('lang', lingua);
    this.translateService.use(lingua);
    this.translateService.setTranslation(lingua, messages);
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return !!this.authService.userInfo;
  }

  public firstName(): string {
    return this.authService.userInfo?.firstname ?? '-';
  }

  public lastName(): string {
    return this.authService.userInfo?.lastname ?? '-';
  }

  private getSelectedLanguage() {
    this.selectedLanguage = localStorage.getItem('lang') || 'ITA';
  }
}
