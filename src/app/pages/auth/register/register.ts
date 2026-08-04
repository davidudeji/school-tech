import { Component, signal, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw  = group.get('password')?.value;
  const cpw = group.get('confirmPassword')?.value;
  return pw && cpw && pw !== cpw ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group(
    {
      fullName:        ['', [Validators.required, Validators.minLength(3)]],
      email:           ['', [Validators.required, Validators.email]],
      role:            ['student' as UserRole, Validators.required],
      password:        ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[A-Z])(?=.*[0-9])/)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch }
  );

  loading   = signal(false);
  errorMsg  = signal('');
  showPass  = signal(false);
  showCPass = signal(false);
  step      = signal<1 | 2>(1);

  readonly roles: { value: UserRole; label: string; desc: string; icon: string }[] = [
    { value: 'student',  label: 'Student',  desc: 'Enroll in courses, track attendance, and use the AI study assistant', icon: '🎓' },
    { value: 'lecturer', label: 'Lecturer', desc: 'Manage courses, record grades, and generate AI-powered assessments',   icon: '📚' },
    { value: 'admin',    label: 'Admin',    desc: 'Full access to manage the institution, users, and AI analytics',       icon: '⚙️' },
  ];

  selectRole(role: UserRole): void {
    this.form.patchValue({ role });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  nextStep(): void {
    const fields = ['fullName', 'email', 'role'];
    fields.forEach((f) => this.form.get(f)?.markAsTouched());
    const valid = fields.every((f) => this.form.get(f)?.valid);
    if (valid) this.step.set(2);
  }

  prevStep(): void {
    this.step.set(1);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set('');
    const { confirmPassword: _, ...creds } = this.form.value;

    try {
      await this.auth.register(creds);
      this.router.navigate([this.auth.getDashboardRoute()]);
    } catch (err: any) {
      this.errorMsg.set(err.message ?? 'Registration failed. Please try again.');
      this.step.set(1);
    } finally {
      this.loading.set(false);
    }
  }
}
