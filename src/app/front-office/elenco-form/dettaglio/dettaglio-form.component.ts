import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../../common/session-storage.service';

@Component({
  selector: 'app-dettaglio-form-fo',
  templateUrl: './dettaglio-form.component.html',
  styleUrls: ['./dettaglio-form.component.scss'],
})
export class DettaglioFormFoComponent implements OnInit {
  public id = '';
  public titoloSottomissione: string;
  public isArchivio: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((params) => {
      this.isArchivio = params['isArchivio'];
    });
    this.titoloSottomissione = this.sessionStorageService.getItem(
      'titoloSottomissione'
    );
  }
}
