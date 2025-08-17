import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ValidationErrors, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService, SignupPayload } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm! : FormGroup;
  error: string | null = null;
  roles: string[] = ['Admin', 'Customer', 'Support'];

  constructor(private snackBar: MatSnackBar,private fb: FormBuilder, private authService : AuthService, private router : Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    },
    {
      validators : this.passwordMatchValidator
    }
  );
}
passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
}

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Sign up data', this.signupForm.value);
      const signupData: SignupPayload = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: this.signupForm.value.role
    };

    this.authService.signUp(signupData).subscribe({
      next: () => {
        this.snackBar.open('Signup successful! Redirecting to login...', '', {
          duration: 3000,
        });
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: () => {
        this.snackBar.open('Signup failed. Please try again.', '', {
          duration: 3000,
        });
      }
    });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
