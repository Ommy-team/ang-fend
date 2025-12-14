import { Component } from '@angular/core';
import { AuthService, SignInRequest } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Must include these
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit() {
    this.loading = true;
    this.error = '';

    console.log(" onSubmit ", this.email, this.password);

    const payload: SignInRequest = {
      email: this.email,
      password: this.password,
    };

    console.log(" payload ", payload);

    this.authService.signIn(payload).subscribe({
      next: (res) => {
        console.log('✅ Login successful:', res);
        this.loading = false;
        this.router.navigate(['/home']);

        // TODO: handle token, redirect, etc.
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}
