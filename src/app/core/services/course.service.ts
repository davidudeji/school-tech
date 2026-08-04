import { Injectable, signal, computed } from '@angular/core';
import {
  Course, CourseOutline, CourseRegistration,
  Announcement, CourseStatus,
} from '../models/course.model';

// ============================================================
// Stub Data
// ============================================================

const STUB_COURSES: Course[] = [
  {
    id: 'c1', code: 'CSC 401', title: 'Software Engineering',
    description: 'Principles of software design, development methodologies, UML, agile practices, and software project management.',
    units: 3, level: 400, semester: 'second', departmentId: 'd1', departmentName: 'Computer Science',
    lecturerId: '2', lecturerName: 'Dr. Fatimah Aliyu', status: 'active',
    prerequisites: ['c3'], enrolledCount: 58, maxCapacity: 70, createdAt: '2024-10-01',
  },
  {
    id: 'c2', code: 'CSC 403', title: 'Computer Networks',
    description: 'Network architectures, protocols, TCP/IP stack, routing algorithms, and network security fundamentals.',
    units: 3, level: 400, semester: 'second', departmentId: 'd1', departmentName: 'Computer Science',
    lecturerId: '2', lecturerName: 'Prof. Adamu Suleiman', status: 'active',
    prerequisites: [], enrolledCount: 62, maxCapacity: 80, createdAt: '2024-10-01',
  },
  {
    id: 'c3', code: 'CSC 301', title: 'Data Structures & Algorithms',
    description: 'Arrays, linked lists, trees, graphs, sorting algorithms, searching, and algorithm analysis.',
    units: 4, level: 300, semester: 'first', departmentId: 'd1', departmentName: 'Computer Science',
    lecturerId: '2', lecturerName: 'Dr. Fatimah Aliyu', status: 'active',
    prerequisites: [], enrolledCount: 75, maxCapacity: 90, createdAt: '2024-10-01',
  },
  {
    id: 'c4', code: 'CSC 201', title: 'Introduction to Programming',
    description: 'Python programming fundamentals, variables, control flow, functions, and basic OOP concepts.',
    units: 3, level: 200, semester: 'first', departmentId: 'd1', departmentName: 'Computer Science',
    lecturerId: '2', lecturerName: 'Mrs. Eze Chisom', status: 'active',
    prerequisites: [], enrolledCount: 88, maxCapacity: 100, createdAt: '2024-10-01',
  },
  {
    id: 'c5', code: 'CSC 405', title: 'Operating Systems',
    description: 'Process management, memory management, file systems, I/O systems, and OS design principles.',
    units: 3, level: 400, semester: 'second', departmentId: 'd1', departmentName: 'Computer Science',
    lecturerId: '2', lecturerName: 'Mrs. Eze Chisom', status: 'active',
    prerequisites: ['c3'], enrolledCount: 54, maxCapacity: 70, createdAt: '2024-10-01',
  },
  {
    id: 'c6', code: 'CSC 407', title: 'Database Systems',
    description: 'Relational databases, SQL, normalization, transaction management, and NoSQL databases.',
    units: 3, level: 400, semester: 'second', departmentId: 'd1', departmentName: 'Computer Science',
    lecturerId: '2', lecturerName: 'Dr. Okonkwo Vincent', status: 'active',
    prerequisites: [], enrolledCount: 60, maxCapacity: 75, createdAt: '2024-10-01',
  },
  {
    id: 'c7', code: 'MTH 401', title: 'Applied Mathematics',
    description: 'Differential equations, linear algebra applications, numerical methods, and probability theory.',
    units: 2, level: 400, semester: 'second', departmentId: 'd1', departmentName: 'Computer Science',
    lecturerId: '2', lecturerName: 'Prof. Ibrahim Musa', status: 'active',
    prerequisites: [], enrolledCount: 70, maxCapacity: 90, createdAt: '2024-10-01',
  },
  {
    id: 'c8', code: 'CSC 501', title: 'Advanced Algorithms',
    description: 'NP-completeness, approximation algorithms, randomized algorithms, and advanced data structures.',
    units: 3, level: 500, semester: 'first', departmentId: 'd1', departmentName: 'Computer Science',
    lecturerId: '2', lecturerName: 'Dr. Fatimah Aliyu', status: 'active',
    prerequisites: ['c3'], enrolledCount: 22, maxCapacity: 40, createdAt: '2024-10-01',
  },
  {
    id: 'c9', code: 'BUS 301', title: 'Business Strategy',
    description: 'Strategic management frameworks, competitive analysis, and business model design.',
    units: 3, level: 300, semester: 'second', departmentId: 'd5', departmentName: 'Business Administration',
    status: 'active', prerequisites: [], enrolledCount: 95, maxCapacity: 110, createdAt: '2024-10-01',
  },
  {
    id: 'c10', code: 'EEE 301', title: 'Circuit Theory',
    description: 'DC and AC circuit analysis, network theorems, and transient response analysis.',
    units: 4, level: 300, semester: 'first', departmentId: 'd3', departmentName: 'Electrical Engineering',
    status: 'active', prerequisites: [], enrolledCount: 68, maxCapacity: 80, createdAt: '2024-10-01',
  },
];

const STUB_OUTLINES: Record<string, CourseOutline> = {
  'c1': {
    courseId: 'c1',
    objectives: [
      'Understand software development lifecycle models',
      'Apply agile and scrum methodologies',
      'Design systems using UML diagrams',
      'Manage software projects effectively',
    ],
    textbooks: ['Software Engineering by Sommerville', 'Clean Code by Robert Martin'],
    assessment: { assignments: 20, midterm: 20, exam: 50, attendance: 10 },
    weeks: [
      { week: 1,  topic: 'Introduction to Software Engineering',    completed: true  },
      { week: 2,  topic: 'Software Process Models',                 completed: true  },
      { week: 3,  topic: 'Agile Development',                       completed: true  },
      { week: 4,  topic: 'Requirements Engineering',                completed: true  },
      { week: 5,  topic: 'System Modelling with UML',               completed: true  },
      { week: 6,  topic: 'Architectural Design',                    completed: true  },
      { week: 7,  topic: 'Design Patterns',                         completed: false },
      { week: 8,  topic: 'Mid-term Review',                         completed: false },
      { week: 9,  topic: 'Software Testing Strategies',             completed: false },
      { week: 10, topic: 'Software Quality & Metrics',              completed: false },
      { week: 11, topic: 'Project Planning & Management',           completed: false },
      { week: 12, topic: 'DevOps & CI/CD',                         completed: false },
      { week: 13, topic: 'Software Maintenance & Evolution',        completed: false },
      { week: 14, topic: 'Case Study & Presentations',              completed: false },
      { week: 15, topic: 'Revision & Exam Preparation',             completed: false },
    ],
  },
};

// Generate registrations for students 1-5 for courses c1-c5
const STUB_REGISTRATIONS: CourseRegistration[] = [
  ...['c1','c2','c3','c4','c5'].map((cId, i) => ({
    id: `reg-${i+1}`, studentId: 'std-1', studentName: 'Chidera Emmanuel',
    matricNumber: 'CSC/2022/001', courseId: cId,
    courseCode: STUB_COURSES.find(c=>c.id===cId)?.code,
    courseTitle: STUB_COURSES.find(c=>c.id===cId)?.title,
    sessionId: 's3', semesterId: 'sem6',
    status: 'approved' as const, registeredAt: '2026-03-01',
  })),
  { id: 'reg-6', studentId: 'std-2', studentName: 'Amara Okafor', matricNumber: 'CSC/2022/004',
    courseId: 'c1', courseCode: 'CSC 401', courseTitle: 'Software Engineering',
    sessionId: 's3', semesterId: 'sem6', status: 'pending', registeredAt: '2026-03-02' },
];

const STUB_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', courseId: 'c1', courseCode: 'CSC 401', lecturerId: '2',
    title: 'Mid-term Exam Date Confirmed', body: 'The mid-term examination for CSC 401 will hold on August 15, 2026 at 9:00 AM in Lecture Hall B. Ensure you bring your student ID.',
    pinned: true, createdAt: '2026-08-01T10:00:00Z' },
  { id: 'a2', courseId: 'c1', courseCode: 'CSC 401', lecturerId: '2',
    title: 'Design Patterns Assignment Released', body: 'The Design Patterns assignment has been uploaded to the course materials. Submission deadline is August 6, 2026.',
    pinned: false, createdAt: '2026-07-28T14:30:00Z' },
  { id: 'a3', courseId: 'c2', courseCode: 'CSC 403', lecturerId: '2',
    title: 'Lab Session Change', body: 'The lab session for this week has been moved from Lab 3 to Lab 5 due to maintenance.',
    pinned: false, createdAt: '2026-07-25T08:00:00Z' },
];

// ============================================================
// Service
// ============================================================

@Injectable({ providedIn: 'root' })
export class CourseService {
  private _courses       = signal<Course[]>(STUB_COURSES);
  private _outlines      = signal<Record<string, CourseOutline>>(STUB_OUTLINES);
  private _registrations = signal<CourseRegistration[]>(STUB_REGISTRATIONS);
  private _announcements = signal<Announcement[]>(STUB_ANNOUNCEMENTS);

  readonly courses       = this._courses.asReadonly();
  readonly announcements = this._announcements.asReadonly();

  // ── Computed stats ────────────────────────────────────────
  readonly totalCourses   = computed(() => this._courses().length);
  readonly activeCourses  = computed(() => this._courses().filter(c => c.status === 'active').length);
  readonly totalEnrolled  = computed(() => this._courses().reduce((a,c) => a + c.enrolledCount, 0));

  // ── Courses ───────────────────────────────────────────────
  getCoursesByDept(deptId: string): Course[] {
    return this._courses().filter(c => c.departmentId === deptId);
  }

  getCoursesByLecturer(lecturerId: string): Course[] {
    return this._courses().filter(c => c.lecturerId === lecturerId);
  }

  getCourseById(id: string): Course | undefined {
    return this._courses().find(c => c.id === id);
  }

  filterCourses(opts: { search?: string; deptId?: string; level?: number; semester?: string; status?: CourseStatus }): Course[] {
    let list = this._courses();
    const q = opts.search?.toLowerCase() ?? '';
    if (q) list = list.filter(c => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
    if (opts.deptId)   list = list.filter(c => c.departmentId === opts.deptId);
    if (opts.level)    list = list.filter(c => c.level === opts.level);
    if (opts.semester) list = list.filter(c => c.semester === opts.semester);
    if (opts.status)   list = list.filter(c => c.status === opts.status);
    return list;
  }

  addCourse(course: Omit<Course, 'id' | 'createdAt' | 'enrolledCount'>): Course {
    const c: Course = { ...course, id: `c-${Date.now()}`, enrolledCount: 0, createdAt: new Date().toISOString() };
    this._courses.update(list => [...list, c]);
    return c;
  }

  updateCourse(id: string, changes: Partial<Course>): void {
    this._courses.update(list => list.map(c => c.id === id ? { ...c, ...changes } : c));
  }

  // ── Outlines ──────────────────────────────────────────────
  getOutline(courseId: string): CourseOutline | undefined {
    return this._outlines()[courseId];
  }

  markWeekComplete(courseId: string, week: number, completed: boolean): void {
    this._outlines.update(map => {
      const outline = map[courseId];
      if (!outline) return map;
      return {
        ...map,
        [courseId]: {
          ...outline,
          weeks: outline.weeks.map(w => w.week === week ? { ...w, completed } : w),
        },
      };
    });
  }

  // ── Registrations ─────────────────────────────────────────
  getRegistrationsByStudent(studentId: string): CourseRegistration[] {
    return this._registrations().filter(r => r.studentId === studentId);
  }

  getPendingRegistrations(): CourseRegistration[] {
    return this._registrations().filter(r => r.status === 'pending');
  }

  approveRegistration(id: string): void {
    this._registrations.update(list => list.map(r =>
      r.id === id ? { ...r, status: 'approved', approvedAt: new Date().toISOString() } : r
    ));
  }

  rejectRegistration(id: string): void {
    this._registrations.update(list => list.map(r =>
      r.id === id ? { ...r, status: 'rejected' } : r
    ));
  }

  registerCourse(studentId: string, courseId: string, sessionId: string, semesterId: string): CourseRegistration {
    const course = this.getCourseById(courseId);
    const reg: CourseRegistration = {
      id: `reg-${Date.now()}`, studentId, courseId,
      courseCode: course?.code, courseTitle: course?.title,
      sessionId, semesterId, status: 'pending',
      registeredAt: new Date().toISOString(),
    };
    this._registrations.update(list => [...list, reg]);
    return reg;
  }

  dropCourse(regId: string): void {
    this._registrations.update(list => list.map(r =>
      r.id === regId ? { ...r, status: 'dropped' } : r
    ));
  }

  // ── Announcements ─────────────────────────────────────────
  getAnnouncementsByCourse(courseId: string): Announcement[] {
    return this._announcements().filter(a => a.courseId === courseId);
  }

  addAnnouncement(ann: Omit<Announcement, 'id' | 'createdAt'>): void {
    const a: Announcement = { ...ann, id: `a-${Date.now()}`, createdAt: new Date().toISOString() };
    this._announcements.update(list => [a, ...list]);
  }

  getPrerequisiteNames(ids: string[]): string {
    return ids.map(id => this._courses().find(c => c.id === id)?.code ?? id).join(', ');
  }
}
