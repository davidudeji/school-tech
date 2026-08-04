import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const cpw = group.get('confirmPassword')?.value;
  return pw && cpw && pw !== cpw ? { mismatch: true } : null;
}

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPasswordComponent {
  private fb     = inject(FormBuilder);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  token = this.route.snapshot.queryParamMap.get('token') ?? 'demo-token';

  form: FormGroup = this.fb.group(
    {
      password:        ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[A-Z])(?=.*[0-9])/)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch }
  );

  loading  = signal(false);
  done     = signal(false);
  showPass = signal(false);
  showCPass = signal(false);
  errorMsg = signal('');

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    await new Promise((r) => setTimeout(r, 1000));
    this.loading.set(false);
    this.done.set(true);
    setTimeout(() => this.router.navigate(['/login']), 3000);
  }
}
