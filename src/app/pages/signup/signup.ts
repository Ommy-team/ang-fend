// src/app/pages/signup/signup.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, SignUpRequest } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class Signup {
  fullName = '';
  email = '';
  password = '';
  phone = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.loading = true;
    this.error = '';

    const payload: SignUpRequest = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone || undefined,
    };

    this.authService.signUp(payload).subscribe({
      next: (res) => {
        console.log('✅ Signup successful:', res);
        this.loading = false;
        this.router.navigate(['/login']); // ✅ Redirect after successful signup

        // TODO: navigate to login or dashboard
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}
