import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AcademicService } from '../../../core/services/academic.service';
import { Faculty } from '../../../core/models/academic.model';

@Component({
  selector: 'app-faculties',
  imports: [FormsModule],
  templateUrl: './faculties.html',
  styleUrl: './faculties.css',
})
export class FacultiesComponent {
  private academic = inject(AcademicService);

  readonly faculties   = this.academic.faculties;
  readonly departments = this.academic.departments;

  searchQuery   = signal('');
  showAddModal  = signal(false);
  selectedFac   = signal<Faculty | null>(null);

  newFac = signal({ name: '', code: '', dean: '' });

  readonly filtered = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.faculties();
    return this.faculties().filter((f) =>
      f.name.toLowerCase().includes(q) ||
      f.code.toLowerCase().includes(q) ||
      f.dean.toLowerCase().includes(q)
    );
  });

  getDepartmentsForFaculty(facultyId: string) {
    return this.departments().filter((d) => d.facultyId === facultyId);
  }

  getTotalStudents(facultyId: string): number {
    return this.getDepartmentsForFaculty(facultyId).reduce((a, d) => a + d.studentCount, 0);
  }

  openDetail(fac: Faculty): void { this.selectedFac.set(fac); }
  closeDetail(): void { this.selectedFac.set(null); }

  openAdd(): void {
    this.newFac.set({ name: '', code: '', dean: '' });
    this.showAddModal.set(true);
  }

  submitAdd(): void {
    const v = this.newFac();
    if (!v.name || !v.code || !v.dean) return;
    this.academic.addFaculty(v);
    this.showAddModal.set(false);
  }
}
