import { Routes, RouterModule } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { TicketCreate } from './components/ticket-create/ticket-create';
import { TicketList } from './components/ticket-list/ticket-list';
import { TicketDetails } from './components/ticket-details/ticket-details';

export const routes: Routes = [
  { path: 'login', component: Login }, // Login page route
  { path: 'signup', component: Signup },
  { path: 'ticket-create', component: TicketCreate },
  { path: 'ticket-list', component: TicketList },
  { path: 'ticket-details', component: TicketDetails },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect root to login
  { path: '**', redirectTo: 'login' },
];
