import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavbarBottomComponent } from './navbar/bottom/navbar-bottom.component';
import { NavbarTopComponent } from './navbar/top/navbar-top.component';

@NgModule({
  declarations: [HeaderComponent, NavbarBottomComponent, NavbarTopComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
