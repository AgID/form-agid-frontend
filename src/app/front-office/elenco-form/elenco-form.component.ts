import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElencoFormService } from './elenco-form.service';

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
    private elencoFormService: ElencoFormService
  ) {}

  ngOnInit(): void {
    this.elencoFormService.getForms().subscribe((response: any) => {
      this.elencoForm = response;
    });
  }

  public goToRender(id: any) {
    this.router.navigate([`./dettaglio/${id}`], {
      relativeTo: this.route,
    });
  }
}
