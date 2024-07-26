import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cambio-ente',
  templateUrl: './cambio-ente.component.html',
  styleUrls: ['./cambio-ente.component.scss'],
})
export class CambioEnteComponent implements OnInit {
  constructor(
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Lista amministrazioni');
  }
}