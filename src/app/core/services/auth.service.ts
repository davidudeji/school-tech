import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import {
  User,
  UserRole,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  AuthState,
} from '../models/user.model';

// ---------------------------------------------------------------------------
// Stub users — replace with real API calls in a future phase
// ---------------------------------------------------------------------------
const STUB_USERS: (User & { password: string })[] = [
  {
    id: '1',
    fullName: 'Admin User',
    email: 'admin@schooltech.app',
    password: 'Admin@123',
    role: 'admin',
    staffId: 'ADM-001',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '2',
    fullName: 'Dr. Fatimah Aliyu',
    email: 'lecturer@schooltech.app',
    password: 'Lecturer@123',
    role: 'lecturer',
    staffId: 'LEC-042',
    department: 'Computer Science',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '3',
    fullName: 'Chidera Emmanuel',
    email: 'student@schooltech.app',
    password: 'Student@123',
    role: 'student',
    matricNumber: 'CSC/2022/001',
    department: 'Computer Science',
    createdAt: '2026-01-01T00:00:00Z',
  },
];

function makeFakeJwt(user: User): string {
  // Not a real JWT — just a base64 stub for development
  const payload = btoa(JSON.stringify({ sub: user.id, role: user.role, exp: Date.now() + 86400000 }));
  return `stub.${payload}.signature`;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'st_token';
  private readonly USER_KEY  = 'st_user';

  // ── Signals ──────────────────────────────────────────────────────────────
  private _token = signal<string | null>(this.loadToken());
  private _user  = signal<User | null>(this.loadUser());

  readonly isAuthenticated = computed(() => !!this._token() && !!this._user());
  readonly currentUser     = computed(() => this._user());
  readonly currentRole     = computed(() => this._user()?.role ?? null);

  // ── Auth Actions ─────────────────────────────────────────────────────────

  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const match = STUB_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        if (!match) {
          reject(new Error('Invalid email or password. Please try again.'));
          return;
        }
        const { password: _, ...user } = match;
        const token = makeFakeJwt(user);
        this.persistSession(token, user, credentials.rememberMe ?? false);
        resolve({ token, user });
      }, 800); // simulate network delay
    });
  }

  register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = STUB_USERS.find((u) => u.email === credentials.email);
        if (exists) {
          reject(new Error('An account with this email already exists.'));
          return;
        }
        const newUser: User = {
          id: String(Date.now()),
          fullName: credentials.fullName,
          email: credentials.email,
          role: credentials.role,
          createdAt: new Date().toISOString(),
        };
        const token = makeFakeJwt(newUser);
        this.persistSession(token, newUser, false);
        resolve({ token, user: newUser });
      }, 1000);
    });
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      sessionStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.USER_KEY);
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  getDashboardRoute(): string {
    const role = this.currentRole();
    switch (role) {
      case 'admin':    return '/dashboard/admin';
      case 'lecturer': return '/dashboard/lecturer';
      case 'student':  return '/dashboard/student';
      default:         return '/login';
    }
  }

  // ── Private Helpers ───────────────────────────────────────────────────────

  private persistSession(token: string, user: User, remember: boolean): void {
    this._token.set(token);
    this._user.set(user);
    if (!isPlatformBrowser(this.platformId)) return;
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private loadToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.TOKEN_KEY) ?? sessionStorage.getItem(this.TOKEN_KEY);
  }

  private loadUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = localStorage.getItem(this.USER_KEY) ?? sessionStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as User; } catch { return null; }
  }
}
