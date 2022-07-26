import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  public getItem(key: string): string {
    return this.storage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
