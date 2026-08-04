import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { AcademicService } from '../../../core/services/academic.service';
import { Department } from '../../../core/models/academic.model';

@Component({
  selector: 'app-departments',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class DepartmentsComponent {
  private academic = inject(AcademicService);

  readonly faculties   = this.academic.faculties;
  readonly departments = this.academic.departments;

  searchQuery      = signal('');
  selectedFaculty  = signal('');
  showAddModal     = signal(false);
  selectedDept     = signal<Department | null>(null);
  showDetailModal  = signal(false);

  // Add form state
  newDept = signal({
    name: '', code: '', facultyId: '', hod: '',
  });

  readonly filtered = computed(() => {
    let list = this.departments();
    const q  = this.searchQuery().toLowerCase();
    if (q) list = list.filter((d) =>
      d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q) || d.hod.toLowerCase().includes(q)
    );
    if (this.selectedFaculty())
      list = list.filter((d) => d.facultyId === this.selectedFaculty());
    return list;
  });

  readonly stats = computed(() => ({
    total:    this.departments().length,
    students: this.departments().reduce((a, d) => a + d.studentCount, 0),
    courses:  this.departments().reduce((a, d) => a + d.courseCount,  0),
    faculties: this.faculties().length,
  }));

  openDetail(dept: Department): void {
    this.selectedDept.set(dept);
    this.showDetailModal.set(true);
  }

  closeDetail(): void {
    this.showDetailModal.set(false);
    this.selectedDept.set(null);
  }

  openAdd(): void {
    this.newDept.set({ name: '', code: '', facultyId: '', hod: '' });
    this.showAddModal.set(true);
  }

  submitAdd(): void {
    const v = this.newDept();
    if (!v.name || !v.code || !v.facultyId || !v.hod) return;
    const fac = this.faculties().find((f) => f.id === v.facultyId);
    this.academic.addDepartment({ ...v, facultyName: fac?.name });
    this.showAddModal.set(false);
  }

  getFacultyName(facultyId: string): string {
    return this.faculties().find((f) => f.id === facultyId)?.name ?? '—';
  }
}
