import { Routes } from '@angular/router';
import { DettaglioFormFoComponent } from './elenco-form/dettaglio/dettaglio-form.component';
import { FaqComponent } from './elenco-form/dettaglio/faq/faq.component';
import { FormDichiarazioneAccessibilitaComponent } from './elenco-form/dettaglio/dichiarazione-accessibilita/dichiarazione-accessibilita.component';
import { NuovaSottomissioneComponent } from './elenco-form/dettaglio/nuova-sottomissione/nuova-sottomissione.component';
import { RicercaSottomissioniComponent } from './elenco-form/dettaglio/ricerca-sottomissioni/ricerca-sottomissioni.component';
import { ElencoFormFoComponent } from './elenco-form/elenco-form.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ElencoFormFoComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'dettaglio',
    component: DettaglioFormFoComponent,
    data: { breadcrumb: 'Dettaglio' },
    children: [
      {
        path: ':id',
        component: FormDichiarazioneAccessibilitaComponent,
        data: { breadcrumb: 'Home' },
      },
      {
        path: ':id/ricerca',
        component: RicercaSottomissioniComponent,
        data: { breadcrumb: 'Ricerca' },
      },
      {
        path: ':id/faq',
        component: FaqComponent,
        data: { breadcrumb: 'Faq' },
      },
      {
        path: ':id/nuova-sottomissione',
        component: NuovaSottomissioneComponent,
        data: { breadcrumb: 'Nuova sottomissione' },
      },
    ],
  },
];
