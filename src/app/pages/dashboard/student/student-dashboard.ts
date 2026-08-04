import { Component } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  imports: [],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboardComponent {
  readonly today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  readonly stats = [
    { label: 'Courses Registered', value: '5',     icon: '📚', sub: 'this semester',  color: 'purple' },
    { label: 'Current GPA',        value: '4.21',  icon: '📈', sub: 'out of 5.0',     color: 'cyan'   },
    { label: 'Attendance Rate',    value: '89%',   icon: '✅', sub: 'above threshold', color: 'green'  },
    { label: 'Pending Tasks',      value: '3',     icon: '📋', sub: 'due this week',   color: 'amber'  },
  ];

  readonly courses = [
    { code: 'CSC 401', title: 'Software Engineering', lecturer: 'Dr. Aliyu',    attendance: 85, grade: 'A',  progress: 72 },
    { code: 'CSC 403', title: 'Computer Networks',    lecturer: 'Prof. Adamu',  attendance: 90, grade: 'B+', progress: 68 },
    { code: 'CSC 405', title: 'Operating Systems',    lecturer: 'Mrs. Eze',     attendance: 88, grade: 'A-', progress: 80 },
    { code: 'CSC 407', title: 'Database Systems',     lecturer: 'Dr. Okonkwo',  attendance: 95, grade: 'A',  progress: 55 },
    { code: 'MTH 401', title: 'Applied Mathematics',  lecturer: 'Prof. Ibrahim', attendance: 80, grade: 'B',  progress: 90 },
  ];

  readonly upcomingAssessments = [
    { course: 'CSC 401', title: 'Design Patterns Assignment', dueDate: 'Aug 6', daysLeft: 2,  type: 'Assignment' },
    { course: 'CSC 403', title: 'Network Topology Quiz',      dueDate: 'Aug 8', daysLeft: 4,  type: 'Quiz' },
    { course: 'MTH 401', title: 'Mid-Semester Exam',          dueDate: 'Aug 12', daysLeft: 8, type: 'Exam' },
  ];

  readonly aiStudyPrompts = [
    '📖 Explain binary semaphores in simple terms',
    '📋 Summarize my CSC 401 lecture notes',
    '🗓️ Create a study plan for my upcoming exams',
    '💡 What topics should I focus on for MTH 401?',
  ];

  getGradeColor(grade: string): string {
    if (grade.startsWith('A')) return 'green';
    if (grade.startsWith('B')) return 'cyan';
    return 'amber';
  }

  getDaysColor(days: number): string {
    if (days <= 2) return 'red';
    if (days <= 5) return 'amber';
    return 'green';
  }
}
