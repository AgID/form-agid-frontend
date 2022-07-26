import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DettaglioFormComponent } from './back-office/dettaglio/dettaglio-form.component';
import { ElencoFormComponent } from './back-office/elenco-form/elenco-form.component';
import { InserimentoFormComponent } from './back-office/inserimento/inserimento-form.component';
import { ModificaFormComponent } from './back-office/modifica/modifica-form.component';
import { FormioBuilderComponent } from './formio-builder/formio-builder.component';
import { DichiarazioneComponent } from './front-office/dichiarazione/dichiarazione.component';
import { HomeComponent } from './front-office/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'builder',
    component: FormioBuilderComponent,
    data: { breadcrumb: 'Builder' },
  },
  {
    path: 'dichiarazione',
    component: DichiarazioneComponent,
    data: { breadcrumb: 'Dichiarazione' },
  },
  {
    path: 'elenco-form',
    loadChildren: () =>
      import('./front-office/form-fo.module').then((m) => m.FormFoModule),
    data: { breadcrumb: 'Elenco Form' },
  },
  {
    path: 'admin',
    component: ElencoFormComponent,
    data: { breadcrumb: 'Elenco Form BO' },
    children: [
      {
        path: 'inserimento-form',
        component: InserimentoFormComponent,
        data: { breadcrumb: 'Inserimento' },
      },
      {
        path: 'modifica-form/:id',
        component: ModificaFormComponent,
        data: { breadcrumb: 'Modifica' },
      },
      {
        path: 'dettaglio-form/:id',
        component: DettaglioFormComponent,
        data: { breadcrumb: 'Dettaglio' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
