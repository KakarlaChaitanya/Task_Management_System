import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: string | null = null;

  // Reactive form with validators
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) {
      // Mark all controls as touched to show errors immediately
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe(user => {
      if (user) {
        this.router.navigate(['/tasks']);
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }
}
