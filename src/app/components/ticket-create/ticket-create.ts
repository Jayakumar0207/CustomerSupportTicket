import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../../services/ticket.service';
import { TicketPayload } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './ticket-create.html',
  styleUrl: './ticket-create.css',
})
export class TicketCreate {
  ticketForm!: FormGroup;
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Open', 'In Progress', 'Closed'];

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['', Validators.required],
      status: [{ value: 'Open', disabled: true }],
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const ticketData: TicketPayload = {
        userId: localStorage.getItem('userId') || '',
        title: this.ticketForm.value.title,
        description: this.ticketForm.value.description,
        priority: this.ticketForm.value.priority,
        status: this.ticketForm.getRawValue().status,
      };
      this.ticketService.CreateTicket(ticketData).subscribe({
        next: () => {
          console.log('Ticket Creation successful');
          // Show success message (simple alert or toast)
          this.toastr.success('Ticket Creation successful!!');
          this.ticketForm.reset();
        },
        error: (err) => {
          const userId = localStorage.getItem('userId');
          console.error('Ticket Creation failed', err);
          this.toastr.error(
            err.error?.message || 'Ticket Creation failed. Please try again.'
          );
        },
      });
    } else {
      // Trigger validation for all fields
      this.ticketForm.markAllAsTouched();
    }
  }
}
