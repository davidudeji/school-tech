import { Injectable, signal, computed } from '@angular/core';
import {
  Faculty,
  Department,
  Programme,
  AcademicSession,
  Student,
  StudentFilters,
  PaginatedResult,
  PaginationMeta,
} from '../models/academic.model';

// ============================================================
// Stub data — Replace with real API in Phase 5+
// ============================================================

const STUB_FACULTIES: Faculty[] = [
  { id: 'f1', name: 'Faculty of Computing & Information Technology', code: 'FCIT', dean: 'Prof. Aliyu Ibrahim', departmentCount: 4, createdAt: '2020-01-01' },
  { id: 'f2', name: 'Faculty of Engineering', code: 'FEng', dean: 'Prof. Samuel Okafor', departmentCount: 5, createdAt: '2020-01-01' },
  { id: 'f3', name: 'Faculty of Business Administration', code: 'FBA', dean: 'Mrs. Grace Adeola', departmentCount: 3, createdAt: '2020-01-01' },
  { id: 'f4', name: 'Faculty of Social Sciences', code: 'FSS', dean: 'Dr. Chidi Nwosu', departmentCount: 4, createdAt: '2020-01-01' },
];

const STUB_DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Computer Science', code: 'CSC', facultyId: 'f1', facultyName: 'FCIT', hod: 'Dr. Fatimah Aliyu', studentCount: 342, courseCount: 18, createdAt: '2020-01-01' },
  { id: 'd2', name: 'Information Technology', code: 'IT', facultyId: 'f1', facultyName: 'FCIT', hod: 'Dr. James Eze', studentCount: 198, courseCount: 14, createdAt: '2020-01-01' },
  { id: 'd3', name: 'Electrical Engineering', code: 'EEE', facultyId: 'f2', facultyName: 'FEng', hod: 'Prof. Hassan Musa', studentCount: 289, courseCount: 15, createdAt: '2020-01-01' },
  { id: 'd4', name: 'Mechanical Engineering', code: 'MCE', facultyId: 'f2', facultyName: 'FEng', hod: 'Dr. Vincent Ojo', studentCount: 245, courseCount: 16, createdAt: '2020-01-01' },
  { id: 'd5', name: 'Business Administration', code: 'BUS', facultyId: 'f3', facultyName: 'FBA', hod: 'Mrs. Adeola Bello', studentCount: 412, courseCount: 22, createdAt: '2020-01-01' },
  { id: 'd6', name: 'Accounting', code: 'ACC', facultyId: 'f3', facultyName: 'FBA', hod: 'Dr. Cynthia Obi', studentCount: 310, courseCount: 18, createdAt: '2020-01-01' },
  { id: 'd7', name: 'Mass Communication', code: 'MCM', facultyId: 'f4', facultyName: 'FSS', hod: 'Dr. Lukman Ibrahim', studentCount: 241, courseCount: 12, createdAt: '2020-01-01' },
  { id: 'd8', name: 'Sociology', code: 'SOC', facultyId: 'f4', facultyName: 'FSS', hod: 'Prof. Ngozi Uche', studentCount: 178, courseCount: 10, createdAt: '2020-01-01' },
];

const STUB_PROGRAMMES: Programme[] = [
  { id: 'p1', name: 'B.Sc Computer Science', code: 'BSC-CSC', departmentId: 'd1', departmentName: 'Computer Science', duration: 4, degree: 'B.Sc', studentCount: 342, createdAt: '2020-01-01' },
  { id: 'p2', name: 'B.Sc Information Technology', code: 'BSC-IT', departmentId: 'd2', departmentName: 'Information Technology', duration: 4, degree: 'B.Sc', studentCount: 198, createdAt: '2020-01-01' },
  { id: 'p3', name: 'B.Eng Electrical Engineering', code: 'BENG-EEE', departmentId: 'd3', departmentName: 'Electrical Engineering', duration: 5, degree: 'B.Eng', studentCount: 289, createdAt: '2020-01-01' },
  { id: 'p4', name: 'B.Sc Business Administration', code: 'BSC-BUS', departmentId: 'd5', departmentName: 'Business Administration', duration: 4, degree: 'B.Sc', studentCount: 412, createdAt: '2020-01-01' },
  { id: 'p5', name: 'M.Sc Computer Science', code: 'MSC-CSC', departmentId: 'd1', departmentName: 'Computer Science', duration: 2, degree: 'M.Sc', studentCount: 45, createdAt: '2021-01-01' },
];

const STUB_SESSIONS: AcademicSession[] = [
  {
    id: 's1', name: '2023/2024', startDate: '2023-10-01', endDate: '2024-07-31', status: 'completed',
    semesters: [
      { id: 'sem1', sessionId: 's1', name: 'First Semester', startDate: '2023-10-01', endDate: '2024-02-28', status: 'completed' },
      { id: 'sem2', sessionId: 's1', name: 'Second Semester', startDate: '2024-03-01', endDate: '2024-07-31', status: 'completed' },
    ],
  },
  {
    id: 's2', name: '2024/2025', startDate: '2024-10-01', endDate: '2025-07-31', status: 'completed',
    semesters: [
      { id: 'sem3', sessionId: 's2', name: 'First Semester', startDate: '2024-10-01', endDate: '2025-02-28', status: 'completed' },
      { id: 'sem4', sessionId: 's2', name: 'Second Semester', startDate: '2025-03-01', endDate: '2025-07-31', status: 'completed' },
    ],
  },
  {
    id: 's3', name: '2025/2026', startDate: '2025-10-01', endDate: '2026-07-31', status: 'active',
    semesters: [
      { id: 'sem5', sessionId: 's3', name: 'First Semester', startDate: '2025-10-01', endDate: '2026-02-28', status: 'completed' },
      { id: 'sem6', sessionId: 's3', name: 'Second Semester', startDate: '2026-03-01', endDate: '2026-07-31', status: 'active' },
    ],
  },
  {
    id: 's4', name: '2026/2027', startDate: '2026-10-01', endDate: '2027-07-31', status: 'upcoming',
    semesters: [
      { id: 'sem7', sessionId: 's4', name: 'First Semester', startDate: '2026-10-01', endDate: '2027-02-28', status: 'upcoming' },
      { id: 'sem8', sessionId: 's4', name: 'Second Semester', startDate: '2027-03-01', endDate: '2027-07-31', status: 'upcoming' },
    ],
  },
];

// Generate realistic student stub data
function generateStudents(): Student[] {
  const firstNames = ['Chidera', 'Amara', 'Fatima', 'Emeka', 'Ngozi', 'Tunde', 'Adaeze', 'Uche', 'Bello', 'Aisha', 'Samuel', 'Grace', 'Ibrahim', 'Blessing', 'Kemi', 'Chukwu', 'Halima', 'John', 'Precious', 'Ahmed'];
  const lastNames  = ['Emmanuel', 'Okafor', 'Bello', 'Adeyemi', 'Nwosu', 'Adeola', 'Nnaji', 'Nwachukwu', 'Abdullahi', 'Musa', 'Johnson', 'Aliyu', 'Ibrahim', 'Obi', 'Eze', 'Yusuf', 'Sani', 'Ikenna', 'Chukwuma', 'Danladi'];
  const depts = STUB_DEPARTMENTS;
  const levels = [100, 200, 300, 400];
  const statuses: Student['status'][] = ['active', 'active', 'active', 'active', 'suspended', 'active'];
  const genders: Student['gender'][] = ['male', 'female', 'male', 'female', 'male'];

  const students: Student[] = [];
  for (let i = 0; i < 120; i++) {
    const dept = depts[i % depts.length];
    const fn   = firstNames[i % firstNames.length];
    const ln   = lastNames[(i + 3) % lastNames.length];
    const gender = genders[i % genders.length];
    const level  = levels[i % levels.length];
    const year   = 2022 + Math.floor(i / 30);
    const matric = `${dept.code}/${year}/${String(i + 1).padStart(3, '0')}`;
    students.push({
      id: `std-${i + 1}`,
      matricNumber: matric,
      fullName: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@student.schooltech.app`,
      phone: `080${String(i + 10000000).slice(1)}`,
      gender,
      dateOfBirth: `200${(i % 6) + 2}-0${(i % 9) + 1}-${(i % 28) + 1}`.padEnd(10, '0'),
      departmentId: dept.id,
      departmentName: dept.name,
      programmeId: `p${(i % 5) + 1}`,
      programmeName: STUB_PROGRAMMES[(i % 5)].name,
      level,
      sessionId: 's3',
      sessionName: '2025/2026',
      status: statuses[i % statuses.length],
      cgpa: parseFloat((2.5 + Math.random() * 2.2).toFixed(2)),
      gpa: parseFloat((2.5 + Math.random() * 2.2).toFixed(2)),
      stateOfOrigin: ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Enugu', 'Oyo', 'Kaduna'][i % 7],
      guardian: {
        name: `${lastNames[(i + 7) % lastNames.length]} ${firstNames[(i + 2) % firstNames.length]}`,
        relationship: ['Father', 'Mother', 'Guardian'][i % 3],
        phone: `070${String(i + 10000000).slice(1)}`,
      },
      createdAt: `2022-10-0${(i % 9) + 1}`,
    });
  }
  return students;
}

const STUB_STUDENTS: Student[] = generateStudents();

// ============================================================
// Service
// ============================================================

@Injectable({ providedIn: 'root' })
export class AcademicService {

  // ── Signals ────────────────────────────────────────────────
  private _faculties   = signal<Faculty[]>(STUB_FACULTIES);
  private _departments = signal<Department[]>(STUB_DEPARTMENTS);
  private _programmes  = signal<Programme[]>(STUB_PROGRAMMES);
  private _sessions    = signal<AcademicSession[]>(STUB_SESSIONS);
  private _students    = signal<Student[]>(STUB_STUDENTS);

  readonly faculties    = this._faculties.asReadonly();
  readonly departments  = this._departments.asReadonly();
  readonly programmes   = this._programmes.asReadonly();
  readonly sessions     = this._sessions.asReadonly();

  readonly activeSession = computed(() => this._sessions().find((s) => s.status === 'active') ?? null);
  readonly totalStudents = computed(() => this._students().length);

  // ── Students ────────────────────────────────────────────────
  getStudents(filters: StudentFilters = {}): PaginatedResult<Student> {
    let data = this._students();

    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter((s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.matricNumber.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      );
    }
    if (filters.departmentId)
      data = data.filter((s) => s.departmentId === filters.departmentId);
    if (filters.level)
      data = data.filter((s) => s.level === filters.level);
    if (filters.status)
      data = data.filter((s) => s.status === filters.status);
    if (filters.gender)
      data = data.filter((s) => s.gender === filters.gender);

    const perPage    = filters.perPage ?? 15;
    const page       = filters.page    ?? 1;
    const total      = data.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const safePage   = Math.min(page, totalPages);
    const start      = (safePage - 1) * perPage;
    const paged      = data.slice(start, start + perPage);

    return { data: paged, meta: { total, page: safePage, perPage, totalPages } };
  }

  getStudentById(id: string): Student | undefined {
    return this._students().find((s) => s.id === id);
  }

  addStudent(student: Omit<Student, 'id' | 'createdAt'>): Student {
    const newStudent: Student = { ...student, id: `std-${Date.now()}`, createdAt: new Date().toISOString() };
    this._students.update((list) => [...list, newStudent]);
    return newStudent;
  }

  updateStudent(id: string, changes: Partial<Student>): void {
    this._students.update((list) =>
      list.map((s) => (s.id === id ? { ...s, ...changes } : s))
    );
  }

  deleteStudent(id: string): void {
    this._students.update((list) => list.filter((s) => s.id !== id));
  }

  // ── Departments ─────────────────────────────────────────────
  getDepartmentsByFaculty(facultyId: string): Department[] {
    return this._departments().filter((d) => d.facultyId === facultyId);
  }

  addDepartment(dept: Omit<Department, 'id' | 'createdAt' | 'studentCount' | 'courseCount'>): void {
    const newDept: Department = { ...dept, id: `d-${Date.now()}`, studentCount: 0, courseCount: 0, createdAt: new Date().toISOString() };
    this._departments.update((list) => [...list, newDept]);
  }

  // ── Faculties ────────────────────────────────────────────────
  addFaculty(fac: Omit<Faculty, 'id' | 'createdAt' | 'departmentCount'>): void {
    const newFac: Faculty = { ...fac, id: `f-${Date.now()}`, departmentCount: 0, createdAt: new Date().toISOString() };
    this._faculties.update((list) => [...list, newFac]);
  }

  // ── Sessions ─────────────────────────────────────────────────
  addSession(session: Omit<AcademicSession, 'id' | 'semesters'>): void {
    const newSession: AcademicSession = {
      ...session, id: `s-${Date.now()}`,
      semesters: [
        { id: `sem-a-${Date.now()}`, sessionId: `s-${Date.now()}`, name: 'First Semester', startDate: session.startDate, endDate: '', status: 'upcoming' },
        { id: `sem-b-${Date.now()}`, sessionId: `s-${Date.now()}`, name: 'Second Semester', startDate: '', endDate: session.endDate, status: 'upcoming' },
      ],
    };
    this._sessions.update((list) => [...list, newSession]);
  }
}
