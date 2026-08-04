import { Component } from '@angular/core';

@Component({
  selector: 'app-lecturer-dashboard',
  imports: [],
  templateUrl: './lecturer-dashboard.html',
  styleUrl: './lecturer-dashboard.css',
})
export class LecturerDashboardComponent {
  readonly today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  readonly stats = [
    { label: 'My Courses',       value: '4',   icon: '📚', trend: 'Active',   color: 'purple' },
    { label: 'Total Students',   value: '187',  icon: '👨‍🎓', trend: 'Enrolled', color: 'cyan'   },
    { label: 'Avg. Attendance',  value: '83%',  icon: '✅', trend: '+1%',       color: 'green'  },
    { label: 'Pending Grading',  value: '24',   icon: '📋', trend: 'Urgent',    color: 'amber'  },
  ];

  readonly courses = [
    { code: 'CSC 401', title: 'Software Engineering',  students: 58, progress: 72, status: 'Active' },
    { code: 'CSC 301', title: 'Data Structures',        students: 62, progress: 88, status: 'Active' },
    { code: 'CSC 201', title: 'Intro to Programming',   students: 45, progress: 45, status: 'Active' },
    { code: 'CSC 501', title: 'Advanced Algorithms',    students: 22, progress: 30, status: 'Active' },
  ];

  readonly upcomingClasses = [
    { course: 'CSC 401', time: '9:00 AM', venue: 'Lecture Hall B', day: 'Today' },
    { course: 'CSC 301', time: '11:00 AM', venue: 'Lab 3',         day: 'Today' },
    { course: 'CSC 201', time: '2:00 PM',  venue: 'Room 202',      day: 'Tomorrow' },
  ];

  readonly recentSubmissions = [
    { student: 'Chidera Emmanuel', course: 'CSC 401', assignment: 'Design Patterns Report', time: '5 min ago' },
    { student: 'Amara Okafor',     course: 'CSC 301', assignment: 'Binary Tree Lab',        time: '1 hour ago' },
    { student: 'Fatima Bello',     course: 'CSC 201', assignment: 'Calculator App',         time: '3 hours ago' },
  ];

  readonly aiTools = [
    { icon: '📝', label: 'Generate Quiz',     desc: 'Create quiz from lecture notes' },
    { icon: '📋', label: 'Draft Outline',     desc: 'AI-generated course outline' },
    { icon: '📣', label: 'Write Announcement', desc: 'Generate class announcement' },
    { icon: '💬', label: 'Grade Feedback',    desc: 'Get AI grading suggestions' },
  ];
}
