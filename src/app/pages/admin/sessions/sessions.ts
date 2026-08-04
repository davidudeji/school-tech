import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { AcademicService } from '../../../core/services/academic.service';
import { AcademicSession, SessionStatus } from '../../../core/models/academic.model';

@Component({
  selector: 'app-sessions',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './sessions.html',
  styleUrl: './sessions.css',
})
export class SessionsComponent {
  private academic = inject(AcademicService);

  readonly sessions      = this.academic.sessions;
  readonly activeSession = this.academic.activeSession;

  showAddModal  = signal(false);
  expandedId    = signal<string | null>(null);

  newSession = signal({
    name: '', startDate: '', endDate: '',
    status: 'upcoming' as SessionStatus,
  });

  readonly stats = computed(() => ({
    total:     this.sessions().length,
    active:    this.sessions().filter((s) => s.status === 'active').length,
    upcoming:  this.sessions().filter((s) => s.status === 'upcoming').length,
    completed: this.sessions().filter((s) => s.status === 'completed').length,
  }));

  toggleExpand(id: string): void {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  submitAdd(): void {
    const v = this.newSession();
    if (!v.name || !v.startDate || !v.endDate) return;
    this.academic.addSession(v);
    this.showAddModal.set(false);
  }

  getStatusClass(status: SessionStatus): string {
    const map: Record<SessionStatus, string> = {
      active:    'status-active',
      upcoming:  'status-upcoming',
      completed: 'status-completed',
    };
    return map[status];
  }

  getSemesterStatusClass(status: SessionStatus): string {
    return this.getStatusClass(status);
  }
}
