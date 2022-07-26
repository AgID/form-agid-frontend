import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../../common/session-storage.service';

@Component({
  selector: 'app-dettaglio-form',
  templateUrl: './dettaglio-form.component.html',
  styleUrls: ['./dettaglio-form.component.scss'],
})
export class DettaglioFormFoComponent implements OnInit {
  public id = '';
  public titoloSottomissione: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.titoloSottomissione = this.sessionStorageService.getItem(
      'titoloSottomissione'
    );
  }
}
