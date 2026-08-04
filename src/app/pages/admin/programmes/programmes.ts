import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AcademicService } from '../../../core/services/academic.service';
import { Programme } from '../../../core/models/academic.model';

@Component({
  selector: 'app-programmes',
  imports: [FormsModule],
  templateUrl: './programmes.html',
  styleUrl: './programmes.css',
})
export class ProgrammesComponent {
  private academic = inject(AcademicService);

  readonly programmes  = this.academic.programmes;
  readonly departments = this.academic.departments;

  searchQuery    = signal('');
  selectedDept   = signal('');
  selectedDegree = signal('');
  showAddModal   = signal(false);

  readonly degrees = ['B.Sc', 'B.Eng', 'B.A', 'HND', 'M.Sc', 'M.Eng', 'Ph.D'];

  readonly filtered = computed(() => {
    let list = this.programmes();
    const q = this.searchQuery().toLowerCase();
    if (q) list = list.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      (p.departmentName ?? '').toLowerCase().includes(q)
    );
    if (this.selectedDept())   list = list.filter((p) => p.departmentId === this.selectedDept());
    if (this.selectedDegree()) list = list.filter((p) => p.degree === this.selectedDegree());
    return list;
  });

  readonly stats = computed(() => ({
    total:    this.programmes().length,
    students: this.programmes().reduce((a, p) => a + p.studentCount, 0),
    degrees:  [...new Set(this.programmes().map((p) => p.degree))].length,
  }));

  getDegreeClass(degree: string): string {
    const map: Record<string, string> = {
      'B.Sc': 'deg-bsc', 'B.Eng': 'deg-beng', 'B.A': 'deg-ba',
      'M.Sc': 'deg-msc', 'M.Eng': 'deg-meng', 'Ph.D': 'deg-phd', 'HND': 'deg-hnd',
    };
    return map[degree] ?? '';
  }
}
