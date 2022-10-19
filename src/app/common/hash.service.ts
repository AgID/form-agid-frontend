import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HashService {
  private _form: any;
  private _isModified: boolean = false;
  private _message: Array<any>;
  private _type: any;
  private _statoValidazioneUtente: any = {};

  public get form(): any {
    return this._form;
  }

  public set form(value: any) {
    this._form = value;
  }

  public get isModified(): any {
    return this._isModified;
  }

  public set isModified(value: boolean) {
    this._isModified = value;
  }

  public get message(): any {
    return this._message;
  }

  public set message(value: any) {
    this._message = value;
  }

  public get type(): any {
    return this._type;
  }

  public set type(value: any) {
    this._type = value;
  }

  public get statoValidazioneUtente(): any {
    return this._statoValidazioneUtente;
  }

  public set statoValidazioneUtente(value: any) {
    this._statoValidazioneUtente = value;
  }
}
