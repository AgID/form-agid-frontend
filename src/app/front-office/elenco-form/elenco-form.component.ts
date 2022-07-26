import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElencoFormService } from './elenco-form.service';
import { SessionStorageService } from '../../common/session-storage.service';

@Component({
  selector: 'app-elenco-form',
  templateUrl: './elenco-form.component.html',
  styleUrls: ['./elenco-form.component.scss'],
})
export class ElencoFormFoComponent implements OnInit {
  public elencoForm: Array<any> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elencoFormService: ElencoFormService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.elencoFormService.getForms().subscribe((response: any) => {
      this.elencoForm = response;
    });
  }

  public goToRender(item: any) {
    this.sessionStorageService.setItem('titoloSottomissione', item.titolo);
    this.router.navigate([`./${item._id}`], {
      relativeTo: this.route,
    });
  }

  public goToNuovaSottomissione(item: any) {
    this.sessionStorageService.setItem('titoloSottomissione', item.titolo);
    this.router.navigate([`./${item._id}/nuova-sottomissione`], {
      relativeTo: this.route,
    });
  }
}
