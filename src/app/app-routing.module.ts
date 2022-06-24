import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { FormioBuilderComponent } from './formio-builder/formio-builder.component';
import { GestioneDichiarazioniComponent } from './gestione-dichiarazioni/gestione-dichiarazioni.component';
import { HomeComponent } from './home/home.component';
import { RenderComponent } from './render/render.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'builder',
    component: FormioBuilderComponent,
    data: { breadcrumb: 'Builder' },
  },
  {
    path: 'render',
    component: RenderComponent,
    data: { breadcrumb: 'Render' },
    children: [
      {
        path: 'gestione-dichiarazioni',
        component: GestioneDichiarazioniComponent,
        data: { breadcrumb: 'Gestione dichiarazioni' },
      },
    ],
  },
  { path: 'form', component: FormComponent, data: { breadcrumb: 'Form' } },
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
