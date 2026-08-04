import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // ── Public: Landing ─────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing').then((m) => m.LandingComponent),
  },

  // ── Public: Auth Pages ───────────────────────────────────────────────
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/auth/forgot-password/forgot-password').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/auth/reset-password/reset-password').then(
        (m) => m.ResetPasswordComponent
      ),
  },

  // ── Protected: Dashboard (shared layout wrapper) ─────────────────────
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      // ── Admin Dashboard ───────────────────────────────────────────
      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { role: 'admin' },
        loadComponent: () =>
          import('./pages/dashboard/admin/admin-dashboard').then(
            (m) => m.AdminDashboardComponent
          ),
      },

      // ── Phase 3: SIS — Admin sub-pages ───────────────────────────
      {
        path: 'admin/students',
        canActivate: [roleGuard],
        data: { role: 'admin' },
        loadComponent: () =>
          import('./pages/admin/students/students').then(
            (m) => m.StudentsComponent
          ),
      },
      {
        path: 'admin/departments',
        canActivate: [roleGuard],
        data: { role: 'admin' },
        loadComponent: () =>
          import('./pages/admin/departments/departments').then(
            (m) => m.DepartmentsComponent
          ),
      },
      {
        path: 'admin/faculties',
        canActivate: [roleGuard],
        data: { role: 'admin' },
        loadComponent: () =>
          import('./pages/admin/faculties/faculties').then(
            (m) => m.FacultiesComponent
          ),
      },
      {
        path: 'admin/sessions',
        canActivate: [roleGuard],
        data: { role: 'admin' },
        loadComponent: () =>
          import('./pages/admin/sessions/sessions').then(
            (m) => m.SessionsComponent
          ),
      },
      {
        path: 'admin/programmes',
        canActivate: [roleGuard],
        data: { role: 'admin' },
        loadComponent: () =>
          import('./pages/admin/programmes/programmes').then(
            (m) => m.ProgrammesComponent
          ),
      },

      // ── Lecturer Dashboard ────────────────────────────────────────
      {
        path: 'lecturer',
        canActivate: [roleGuard],
        data: { role: 'lecturer' },
        loadComponent: () =>
          import('./pages/dashboard/lecturer/lecturer-dashboard').then(
            (m) => m.LecturerDashboardComponent
          ),
      },

      // ── Student Dashboard ─────────────────────────────────────────
      {
        path: 'student',
        canActivate: [roleGuard],
        data: { role: 'student' },
        loadComponent: () =>
          import('./pages/dashboard/student/student-dashboard').then(
            (m) => m.StudentDashboardComponent
          ),
      },

      // Default: redirect to login if no subroute
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ],
  },

  // ── Wildcard ─────────────────────────────────────────────────────────
  { path: '**', redirectTo: '' },
];
