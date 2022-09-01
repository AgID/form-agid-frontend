import { InjectionToken } from '@angular/core';

let NB_INSTANCES = 0;

export const UNIQUE_ID = new InjectionToken<string>('UNIQUE_ID');

export function uniqueIdFactorySlider() {
  return 'textarea-id-' + NB_INSTANCES++;
}

export const UNIQUE_ID_PROVIDER = {
  provide: UNIQUE_ID,
  useFactory: uniqueIdFactorySlider,
};
