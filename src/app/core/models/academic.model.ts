// ============================================================
// Academic Domain Models — Phase 3 SIS
// ============================================================

export type Gender       = 'male' | 'female' | 'other';
export type StudentStatus = 'active' | 'suspended' | 'graduated' | 'withdrawn';
export type SessionStatus = 'upcoming' | 'active' | 'completed';

// ── Faculty ─────────────────────────────────────────────────
export interface Faculty {
  id: string;
  name: string;
  code: string;
  dean: string;
  departmentCount: number;
  createdAt: string;
}

// ── Department ───────────────────────────────────────────────
export interface Department {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  facultyName?: string;
  hod: string;         // Head of Department
  studentCount: number;
  courseCount: number;
  createdAt: string;
}

// ── Programme ────────────────────────────────────────────────
export interface Programme {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  departmentName?: string;
  duration: number;   // in years
  degree: string;     // e.g. 'B.Sc', 'M.Sc', 'HND'
  studentCount: number;
  createdAt: string;
}

// ── Academic Session ─────────────────────────────────────────
export interface AcademicSession {
  id: string;
  name: string;       // e.g. '2025/2026'
  startDate: string;
  endDate: string;
  status: SessionStatus;
  semesters: Semester[];
}

export interface Semester {
  id: string;
  sessionId: string;
  name: string;       // 'First Semester' | 'Second Semester'
  startDate: string;
  endDate: string;
  status: SessionStatus;
}

// ── Guardian ─────────────────────────────────────────────────
export interface Guardian {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
}

// ── Student ──────────────────────────────────────────────────
export interface Student {
  id: string;
  matricNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  gender: Gender;
  dateOfBirth: string;
  avatar?: string;

  departmentId: string;
  departmentName?: string;
  facultyId?: string;
  facultyName?: string;
  programmeId: string;
  programmeName?: string;

  level: number;       // 100, 200, 300, 400, 500
  sessionId: string;
  sessionName?: string;

  status: StudentStatus;
  gpa?: number;
  cgpa?: number;

  guardian?: Guardian;
  address?: string;
  stateOfOrigin?: string;
  lga?: string;

  createdAt: string;
}

// ── Pagination ───────────────────────────────────────────────
export interface PaginationMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

// ── Filter / Search ──────────────────────────────────────────
export interface StudentFilters {
  search?: string;
  departmentId?: string;
  level?: number;
  status?: StudentStatus;
  gender?: Gender;
  page?: number;
  perPage?: number;
}
