import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DettaglioFormComponent } from './back-office/dettaglio/dettaglio-form.component';
import { ElencoFormComponent } from './back-office/elenco-form/elenco-form.component';
import { GestioneUtenzeComponent } from './back-office/gestione-utenze/gestione-utenze.component';
import { InserimentoFormComponent } from './back-office/inserimento/inserimento-form.component';
import { InvitiComponent } from './back-office/Inviti/inviti.component';
import { ModificaFormComponent } from './back-office/modifica/modifica-form.component';
import { ElencoEtichetteComponent } from './back-office/multilinguismo/elenco-etichette/elenco-etichette.component';
import { InserimentoEtichettaComponent } from './back-office/multilinguismo/inserimento-etichetta/inserimento-etichetta.component';
import { ModificaEtichettaComponent } from './back-office/multilinguismo/modifica-etichetta/modifica-etichetta.component';
import { AuthGuard } from './common/auth/auth.guard';
import { UserRole } from './common/auth/role.enum';
import { DettaglioSottomissioneComponent } from './front-office/elenco-form/dettaglio/dettaglio-sottomissione/dettaglio-sottomissione.component';
import { HomeComponent } from './front-office/home/home.component';
import { IdentificaAmministrazioneComponent } from './front-office/identifica-amministrazione/identifica-amministrazione.component';
import { SceltaUtenteComponent } from './front-office/scelta-utente/scelta-utente.component';
import { VerificaMailComponent } from './front-office/verifica-mail/verifica-mail.component';
import { VerificaOtpComponent } from './front-office/verifica-otp/verifica-otp.component';
import { ViewComponent } from './public/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home',
    },
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'elenco-form',
    loadChildren: () =>
      import('./front-office/form-fo.module').then((m) => m.FormFoModule),
    data: {
      breadcrumb: 'Elenco Form',
      usersAllowed: [
        { role: UserRole.RTD, status: 'Active' },
        { role: UserRole.CITTADINO, status: 'Active' },
      ],
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'verifica-mail',
    component: VerificaMailComponent,
    data: {
      breadcrumb: 'Verifica mail',
      usersAllowed: [{ role: undefined }],
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'scelta-utente',
    component: SceltaUtenteComponent,
    data: {
      breadcrumb: 'Scelta utente',
      usersAllowed: [{ role: undefined }],
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'identifica-amministrazione',
    component: IdentificaAmministrazioneComponent,
    data: {
      breadcrumb: 'Identifica amministrazione',
      usersAllowed: [
        { role: undefined },
        { role: UserRole.RTD, status: 'Pending' },
      ],
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'verifica-otp',
    component: VerificaOtpComponent,
    data: {
      breadcrumb: 'Verifica OTP',
      usersAllowed: [{ role: UserRole.CITTADINO, status: 'Pending' }],
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'gestione-utenze',
    component: GestioneUtenzeComponent,
    data: { breadcrumb: 'Gestione utenze' },
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: ElencoFormComponent,
    data: {
      breadcrumb: 'Elenco Form BO',
      usersAllowed: [{ role: UserRole.SUPER_ADMIN, status: 'Active' }],
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inserimento-form',
        component: InserimentoFormComponent,
        data: { breadcrumb: 'Inserimento Form' },
      },
      {
        path: 'modifica-form/:id',
        component: ModificaFormComponent,
        data: { breadcrumb: 'Modifica Form' },
      },
      {
        path: 'dettaglio-form/:id',
        component: DettaglioFormComponent,
        data: { breadcrumb: 'Dettaglio' },
      },
      {
        path: 'sottomissione/:id',
        component: DettaglioSottomissioneComponent,
        data: { breadcrumb: 'Dettaglio sottomissione' },
      },
    ],
  },
  {
    path: 'multilanguage',
    component: ElencoEtichetteComponent,
    data: {
      breadcrumb: 'Elenco etichette',
      usersAllowed: [{ role: UserRole.SUPER_ADMIN, status: 'Active' }],
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inserimento-etichetta',
        component: InserimentoEtichettaComponent,
        data: { breadcrumb: 'Inserimento Etichetta' },
      },
      {
        path: 'modifica-etichetta',
        component: ModificaEtichettaComponent,
        data: { breadcrumb: 'Modifica Etichetta' },
      },
    ],
  },
  {
    path: 'invite',
    component: InvitiComponent,
    data: {
      breadcrumb: 'Inviti',
      usersAllowed: [{ role: UserRole.SUPER_ADMIN, status: 'Active' }],
    },
    canActivate: [AuthGuard],
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
