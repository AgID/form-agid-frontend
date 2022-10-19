import { Component } from '@angular/core';
import { HashService } from 'src/app/common/hash.service';

@Component({
  selector: 'app-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.scss'],
})
export class NavbarBottomComponent {
  constructor(public hashService: HashService) {}

  public resetMessage() {
    this.hashService.isModified = false;
    this.hashService.type = '';
    this.hashService.message = [{ label: '' }];
  }
}
