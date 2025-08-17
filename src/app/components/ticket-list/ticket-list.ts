import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../model/ticket.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Navbar,
    RouterModule,
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  // Filter and dropdown options
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Open', 'In Progress', 'Closed'];
  selectedPriority: string = '';
  selectedStatus: string = '';

  // Pagination
  pageSize: number = 2;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    const userId = localStorage.getItem('userId') || '';
    if (userId) {
      this.ticketService.GetAllTicketbyUserID(userId).subscribe({
        next: (data: Ticket[]) => {
          this.tickets = data;
          this.applyFilters();
        },
        error: (err) => {
          console.error('Error fetching tickets', err);
        },
      });
    }
  }

  applyFilters(): void {
    this.filteredTickets = this.tickets.filter((ticket) => {
      const priorityMatch = this.selectedPriority
        ? ticket.priority === this.selectedPriority
        : true;
      const statusMatch = this.selectedStatus
        ? ticket.status === this.selectedStatus
        : true;
      return priorityMatch && statusMatch;
    });

    this.totalPages = Math.ceil(this.filteredTickets.length / this.pageSize);
    this.currentPage = 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedTickets(): Ticket[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTickets.slice(start, start + this.pageSize);
  }
}
