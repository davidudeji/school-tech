import {
  Component,
  signal,
  computed,
  inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export interface NavItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayoutComponent {
  private platformId = inject(PLATFORM_ID);
  readonly auth      = inject(AuthService);
  private router     = inject(Router);

  sidebarCollapsed  = signal(false);
  mobileSidebarOpen = signal(false);
  notifOpen         = signal(false);
  profileOpen       = signal(false);

  readonly user = computed(() => this.auth.currentUser());
  readonly role = computed(() => this.auth.currentRole());

  readonly userInitials = computed(() => {
    const name = this.user()?.fullName ?? '';
    return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  });

  // ── Nav items per role ───────────────────────────────────────────────────
  private readonly adminNav: NavItem[] = [
    { icon: '📊', label: 'Dashboard',   route: '/dashboard/admin' },
    { icon: '👨‍🎓', label: 'Students',    route: '/dashboard/admin/students' },
    { icon: '🏛️',  label: 'Departments', route: '/dashboard/admin/departments' },
    { icon: '🎓',  label: 'Faculties',   route: '/dashboard/admin/faculties' },
    { icon: '📖',  label: 'Programmes',  route: '/dashboard/admin/programmes' },
    { icon: '📅',  label: 'Sessions',    route: '/dashboard/admin/sessions' },
    { icon: '📚', label: 'Courses',     route: '/dashboard/admin/courses' },
    { icon: '✅', label: 'Attendance',  route: '/dashboard/admin/attendance' },
    { icon: '📋', label: 'Assessments', route: '/dashboard/admin/assessments' },
    { icon: '📈', label: 'Analytics',   route: '/dashboard/admin/analytics' },
    { icon: '🤖', label: 'AI Suite',    route: '/dashboard/admin/ai' },
    { icon: '⚙️',  label: 'Settings',   route: '/dashboard/admin/settings' },
  ];

  private readonly lecturerNav: NavItem[] = [
    { icon: '📊', label: 'Dashboard',   route: '/dashboard/lecturer' },
    { icon: '📚', label: 'My Courses',  route: '/dashboard/lecturer/courses' },
    { icon: '👨‍🎓', label: 'Students',    route: '/dashboard/lecturer/students' },
    { icon: '✅', label: 'Attendance',  route: '/dashboard/lecturer/attendance' },
    { icon: '📋', label: 'Assessments', route: '/dashboard/lecturer/assessments' },
    { icon: '✏️',  label: 'Grades',     route: '/dashboard/lecturer/grades' },
    { icon: '📣', label: 'Announcements', route: '/dashboard/lecturer/announcements' },
    { icon: '🤖', label: 'AI Tools',    route: '/dashboard/lecturer/ai' },
  ];

  private readonly studentNav: NavItem[] = [
    { icon: '📊', label: 'Dashboard',   route: '/dashboard/student' },
    { icon: '📚', label: 'My Courses',  route: '/dashboard/student/courses' },
    { icon: '✅', label: 'Attendance',  route: '/dashboard/student/attendance' },
    { icon: '📋', label: 'Assessments', route: '/dashboard/student/assessments' },
    { icon: '📈', label: 'Results',     route: '/dashboard/student/results' },
    { icon: '📄', label: 'Transcript',  route: '/dashboard/student/transcript' },
    { icon: '🤖', label: 'AI Study',    route: '/dashboard/student/ai' },
    { icon: '👤', label: 'Profile',     route: '/dashboard/student/profile' },
  ];

  readonly navItems = computed(() => {
    switch (this.role()) {
      case 'admin':    return this.adminNav;
      case 'lecturer': return this.lecturerNav;
      case 'student':  return this.studentNav;
      default:         return [];
    }
  });

  // ── Notifications (stub) ─────────────────────────────────────────────────
  readonly notifications = [
    { icon: '🤖', text: '3 students at risk detected by AI', time: '2m ago', unread: true },
    { icon: '📚', text: 'CSC 401 course registration deadline tomorrow', time: '1h ago', unread: true },
    { icon: '✅', text: 'Attendance for Monday uploaded successfully', time: '3h ago', unread: false },
    { icon: '📋', text: 'Mid-term results approved by HOD', time: '1d ago', unread: false },
  ];

  readonly unreadCount = computed(() => this.notifications.filter((n) => n.unread).length);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        // Close dropdowns on outside click
        document.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('.notif-wrap'))  this.notifOpen.set(false);
          if (!target.closest('.profile-wrap')) this.profileOpen.set(false);
        });
      }
    });
  }

  toggleSidebar(): void { this.sidebarCollapsed.update((v) => !v); }
  toggleMobileSidebar(): void { this.mobileSidebarOpen.update((v) => !v); }
  closeMobileSidebar(): void { this.mobileSidebarOpen.set(false); }
  toggleNotif(e: Event): void { e.stopPropagation(); this.notifOpen.update((v) => !v); this.profileOpen.set(false); }
  toggleProfile(e: Event): void { e.stopPropagation(); this.profileOpen.update((v) => !v); this.notifOpen.set(false); }

  logout(): void { this.auth.logout(); }

  getRoleBadgeClass(): string {
    const map: Record<string, string> = { admin: 'badge-admin', lecturer: 'badge-lecturer', student: 'badge-student' };
    return map[this.role() ?? ''] ?? '';
  }
}
