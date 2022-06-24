import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public goToRender() {
    this.router.navigate(["/render"], {
      queryParams: { isForm: 'true'},
    });
  }
}
