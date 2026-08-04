import {
  Component,
  signal,
  computed,
  inject,
} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AcademicService } from '../../../core/services/academic.service';
import { Student, StudentFilters } from '../../../core/models/academic.model';

@Component({
  selector: 'app-students',
  imports: [FormsModule, RouterLink, TitleCasePipe],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class StudentsComponent {
  private academic = inject(AcademicService);

  // ── Filter state ────────────────────────────────────────────
  searchQuery    = signal('');
  selectedDept   = signal('');
  selectedLevel  = signal<number | ''>(  '');
  selectedStatus = signal('');
  currentPage    = signal(1);
  perPage        = signal(15);

  // ── Data ───────────────────────────────────────────────────
  readonly departments = this.academic.departments;

  readonly result = computed(() =>
    this.academic.getStudents({
      search:       this.searchQuery()      || undefined,
      departmentId: this.selectedDept()     || undefined,
      level:        this.selectedLevel()    || undefined,
      status:       (this.selectedStatus() as any) || undefined,
      page:         this.currentPage(),
      perPage:      this.perPage(),
    })
  );

  readonly students = computed(() => this.result().data);
  readonly meta     = computed(() => this.result().meta);

  // ── UI state ───────────────────────────────────────────────
  showAddModal   = signal(false);
  showViewModal  = signal(false);
  selectedStudent = signal<Student | null>(null);

  readonly levels  = [100, 200, 300, 400, 500];
  readonly statuses = ['active', 'suspended', 'graduated', 'withdrawn'];

  readonly pagesArray = computed(() =>
    Array.from({ length: this.meta().totalPages }, (_, i) => i + 1)
  );

  // ── Actions ────────────────────────────────────────────────
  onSearch(q: string): void {
    this.searchQuery.set(q);
    this.currentPage.set(1);
  }

  onFilterChange(): void {
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedDept.set('');
    this.selectedLevel.set('');
    this.selectedStatus.set('');
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
  }

  viewStudent(student: Student): void {
    this.selectedStudent.set(student);
    this.showViewModal.set(true);
  }

  closeViewModal(): void {
    this.showViewModal.set(false);
    this.selectedStudent.set(null);
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      active:    'status-active',
      suspended: 'status-suspended',
      graduated: 'status-graduated',
      withdrawn: 'status-withdrawn',
    };
    return map[status] ?? '';
  }

  getGpaClass(gpa?: number): string {
    if (!gpa) return 'gpa-na';
    if (gpa >= 4.5) return 'gpa-first';
    if (gpa >= 3.5) return 'gpa-second-upper';
    if (gpa >= 2.5) return 'gpa-second-lower';
    return 'gpa-third';
  }

  getLevelSuffix(level: number): string {
    const map: Record<number, string> = { 100: '1st', 200: '2nd', 300: '3rd', 400: '4th', 500: '5th' };
    return map[level] ?? '';
  }

  readonly hasActiveFilters = computed(() =>
    !!(this.searchQuery() || this.selectedDept() || this.selectedLevel() || this.selectedStatus())
  );
}
