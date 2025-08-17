import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  imports: [],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.css',
})
export class TicketDetails {
  constructor(private router: Router) {}
  goToCreate() {
    this.router.navigate(['/ticket-details']);
  }
}
