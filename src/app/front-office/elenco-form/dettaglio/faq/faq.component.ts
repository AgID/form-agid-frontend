import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HashService } from 'src/app/common/hash.service';
import { ElencoFormService } from '../../elenco-form.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  public id = '';
  public faq = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hashService: HashService,
    private elencoFormService: ElencoFormService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.elencoFormService.getFormsById(this.id).subscribe((res) => {
      this.faq = res.sezioniInformative.faq;
    });
  }
}
