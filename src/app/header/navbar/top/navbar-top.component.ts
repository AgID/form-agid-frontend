import { Component, Input } from '@angular/core';
import { AuthService } from '../../../common/auth/auth.service';
import { UserProfile } from '../../../common/auth/user-profile.model';

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
    return this.authService.identityClaims() &&
      (this.authService.identityClaims() as UserProfile)['firstname']
      ? (this.authService.identityClaims() as UserProfile)['firstname']
      : '-';
  }

  public lastName(): string {
    return this.authService.identityClaims() &&
      (this.authService.identityClaims() as UserProfile)['lastname']
      ? (this.authService.identityClaims() as UserProfile)['lastname']
      : '-';
  }
}
