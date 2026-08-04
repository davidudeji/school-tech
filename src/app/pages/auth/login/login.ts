import {
  Component,
  signal,
  inject,
  computed,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    email:      ['', [Validators.required, Validators.email]],
    password:   ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  loading   = signal(false);
  errorMsg  = signal('');
  showPass  = signal(false);

  // Quick-fill demo credentials
  readonly demoCredentials = [
    { label: 'Admin',    email: 'admin@schooltech.app',    password: 'Admin@123',    role: 'admin' },
    { label: 'Lecturer', email: 'lecturer@schooltech.app', password: 'Lecturer@123', role: 'lecturer' },
    { label: 'Student',  email: 'student@schooltech.app',  password: 'Student@123',  role: 'student' },
  ];

  fillDemo(cred: { email: string; password: string }): void {
    this.form.patchValue({ email: cred.email, password: cred.password });
    this.errorMsg.set('');
  }

  togglePass(): void {
    this.showPass.update((v) => !v);
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set('');

    try {
      await this.auth.login(this.form.value);
      this.router.navigate([this.auth.getDashboardRoute()]);
    } catch (err: any) {
      this.errorMsg.set(err.message ?? 'Login failed. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
