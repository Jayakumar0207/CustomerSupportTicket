import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports : [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(private toastr: ToastrService,private fb: FormBuilder, private router : Router, private authService : AuthService) {}

  ngOnInit(): void {
    // Initialize the reactive form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {      
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          debugger;
          console.log('Login successful', response);

          // Store token or user data as needed, e.g. localStorage
          localStorage.setItem('userId', response.userId);

          // Show success message (simple alert or toast)
          this.toastr.success('Login successful! Redirecting...');

          setTimeout(() => {
            this.router.navigate(['/ticket-create']);
          }, 1000);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.toastr.error(err.error?.message || 'Login failed. Please try again.');
        }
      });     
    } else {
      // Trigger validation for all fields
      this.loginForm.markAllAsTouched();
    }
  }
}