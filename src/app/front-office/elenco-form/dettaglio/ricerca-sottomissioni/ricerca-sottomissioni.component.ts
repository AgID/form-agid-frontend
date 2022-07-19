import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormFoService } from 'src/app/front-office/form-fo.service';
import { ISottomissione } from 'src/app/front-office/types/sottomissione.type';

@Component({
  selector: 'app-ricerca-sottomissioni',
  templateUrl: './ricerca-sottomissioni.component.html',
  styleUrls: ['./ricerca-sottomissioni.component.scss'],
})
export class RicercaSottomissioniComponent implements OnInit {
  public id = '';
  public elencoForm: Array<Partial<ISottomissione>> = [];

  public selectedPage = 2;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formFoService: FormFoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchSottomissioni();
  }

  private async fetchSottomissioni() {
    this.elencoForm = await firstValueFrom(
      this.formFoService.findSottomissioni({})
    );
  }

  public goToInserimentoSottomissione() {
    this.router.navigate([`../nuova-sottomissione`], {
      relativeTo: this.route,
    });
  }
}
