import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HashService } from 'src/app/common/hash.service';
import { ElencoFormService } from '../../elenco-form.service';

@Component({
  selector: 'app-nuova-sottomissione',
  templateUrl: './nuova-sottomissione.component.html',
  styleUrls: ['./nuova-sottomissione.component.scss'],
})
export class NuovaSottomissioneComponent implements OnInit {
  public id = '';
  public form: Object = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hashService: HashService,
    private elencoFormService: ElencoFormService
  ) {}

  ngOnInit(): void {
    if (this.hashService && this.hashService.form) {
      this.form = this.hashService.form;
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.elencoFormService
      .getFormsById(this.id)
      .subscribe((res) => (this.form = res));
  }
}
