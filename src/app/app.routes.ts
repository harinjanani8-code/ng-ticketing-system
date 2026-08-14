import { Routes } from '@angular/router';
import { LoginEntryComponent } from './login/login-entry/login-entry.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { UserMasterLoginComponent } from './login/user-master-login/user-master-login.component';
import { TicketingSystemComponent } from './pages/ticketing-system/ticketing-system.component';
import { ClientMasterComponent } from './pages/client-master/client-master.component';
import { CountryMasterComponent } from './pages/country-master/country-master.component';
import { TicketUpdateComponent } from './ticket update/ticketing-update/ticket-update.component';
import { TeamMasterComponent } from './pages/team-master/team-master.component';


export const routes: Routes = [
  { path: 'login', component: LoginEntryComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'user-master-login', component: UserMasterLoginComponent },
  { path: 'ticketing-system', component: TicketingSystemComponent },
  { path: 'client-master', component: ClientMasterComponent },
  { path: 'country-master', component: CountryMasterComponent },
  {
  path: 'ticket-update',
  component: TicketUpdateComponent
},
  { path: 'team-master', component: TeamMasterComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
