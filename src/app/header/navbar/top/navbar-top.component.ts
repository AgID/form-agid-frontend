import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { NavBarTopService } from '../navbar-top.service';

interface Entity {
  Codice_Categoria: string;
  Codice_IPA: string;
  Denominazione_ente: string;
  Mail_responsabile?: string;
  email?: string | null;
  isActiveEntity: boolean;
  status: "Active" | "Pending" | "Disabled";
  role: "RTD"  | "AMMINISTRATORE_DELEGATO"  | "DIRIGENTE_SCOLATISCO"  | "ADMIN"  | "SUPER_ADMIN";
  valid_from: string;
  valid_to: null
}

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
    private translateService: TranslateService,
    private navBarTopService: NavBarTopService
  ) { }

  public ngOnInit(): void {
    this.getSelectedLanguage();
  }

  public onChangeSelectedLanguage(lingua: string) {
    this.navBarTopService.getLabelsByLang(lingua).subscribe((res: any) => {
      this.selectedLanguage = lingua;
      localStorage.setItem('lang', lingua);
      this.translateService.setTranslation(lingua, res);
      this.translateService.use(lingua);
    });
  }

  public login() {
    this.authService.login();
  }

  public logout(e: Event) {
    e.preventDefault();
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return !!this.authService.userInfo;
  }

  public isRTD(): boolean {
    const userInfo = this.authService.userInfo;
    if (!userInfo || !userInfo.user_policy || !userInfo.user_policy[0] || !userInfo.user_policy[0].policy || !userInfo.user_policy[0].policy.entity) {
      return false;
    }
    return userInfo.user_policy[0].policy.entity.some(
      (el: Entity) => el.role === "RTD"
    );
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
