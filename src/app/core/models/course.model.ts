// ============================================================
// Course Domain Models — Phase 4 Academic Management
// ============================================================

export type CourseStatus     = 'active' | 'inactive' | 'draft';
export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'dropped';

// ── Course ───────────────────────────────────────────────────
export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  units: number;          // credit units
  level: number;          // 100-500
  semester: 'first' | 'second';
  departmentId: string;
  departmentName?: string;
  lecturerId?: string;
  lecturerName?: string;
  status: CourseStatus;
  prerequisites: string[]; // course IDs
  enrolledCount: number;
  maxCapacity: number;
  createdAt: string;
}

// ── Course Outline (weekly) ───────────────────────────────────
export interface WeeklyTopic {
  week: number;
  topic: string;
  description?: string;
  completed: boolean;
  materialUrl?: string;
}

export interface CourseOutline {
  courseId: string;
  weeks: WeeklyTopic[];
  objectives: string[];
  textbooks: string[];
  assessment: {
    assignments: number;  // percentage
    midterm: number;
    exam: number;
    attendance: number;
  };
}

// ── Course Registration ───────────────────────────────────────
export interface CourseRegistration {
  id: string;
  studentId: string;
  studentName?: string;
  matricNumber?: string;
  courseId: string;
  courseCode?: string;
  courseTitle?: string;
  sessionId: string;
  semesterId: string;
  status: RegistrationStatus;
  registeredAt: string;
  approvedAt?: string;
}

// ── Announcement ─────────────────────────────────────────────
export interface Announcement {
  id: string;
  courseId: string;
  courseCode?: string;
  lecturerId: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string;
}
