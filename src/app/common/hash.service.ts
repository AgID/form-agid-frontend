import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HashService {
  private _form: any;

  public get form(): any {
    return this._form;
  }

  public set form(value: any) {
    this._form = value;
  }
}
