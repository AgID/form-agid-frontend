import { Component, Input } from '@angular/core';
import { AuthService } from '../../../common/auth/auth.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
})
export class NavbarTopComponent {
  @Input()
  public titolo: string;

  @Input()
  public user: string;

  constructor(public authService: AuthService) {}

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return !!this.authService.identityClaims();
  }

  public firstName(): string {
    return this.authService.userInfo?.firstname ?? '-';
  }

  public lastName(): string {
    return this.authService.userInfo?.lastname ?? '-';
  }
}
