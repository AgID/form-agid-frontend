import { Routes } from '@angular/router';
import { DettaglioFormFoComponent } from './elenco-form/dettaglio/dettaglio-form.component';
import { FaqComponent } from './elenco-form/dettaglio/faq/faq.component';
import { FormDichiarazioneAccessibilitaComponent } from './elenco-form/dettaglio/dichiarazione-accessibilita/dichiarazione-accessibilita.component';
import { NuovaSottomissioneComponent } from './elenco-form/dettaglio/nuova-sottomissione/nuova-sottomissione.component';
import { RicercaSottomissioniComponent } from './elenco-form/dettaglio/ricerca-sottomissioni/ricerca-sottomissioni.component';
import { ElencoFormFoComponent } from './elenco-form/elenco-form.component';
import { DettaglioSottomissioneComponent } from './elenco-form/dettaglio/dettaglio-sottomissione/dettaglio-sottomissione.component';
import { DynamicTitoloResolverService } from '../common/dynamic-titolo-resolver.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: ElencoFormFoComponent,
    data: { breadcrumb: '' },
  },
  {
    path: ':id',
    component: DettaglioFormFoComponent,
    data: { breadcrumb: (response: any) => response.data.titoloSottomissione },
    resolve: { data: DynamicTitoloResolverService },
    children: [
      {
        path: '',
        component: FormDichiarazioneAccessibilitaComponent,
        data: { breadcrumb: '' },
      },
      {
        path: 'ricerca',
        component: RicercaSottomissioniComponent,
        data: { breadcrumb: 'Ricerca' },
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: { breadcrumb: 'Faq' },
      },
      {
        path: 'nuova-sottomissione',
        component: NuovaSottomissioneComponent,
        data: { breadcrumb: 'Nuova sottomissione' },
      },
      {
        path: 'sottomissione/:id',
        component: DettaglioSottomissioneComponent,
        data: { breadcrumb: 'Dettaglio sottomissione' },
        // children: [
        //   {
        //     path: ':id',
        //     component: DettaglioSottomissioneComponent,
        //     data: { breadcrumb: 'asdsa' },
        //   },
        // ],
      },
    ],
  },
];
