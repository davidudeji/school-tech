import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {
  readonly today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  readonly stats = [
    { label: 'Total Students',  value: '1,284', icon: '👨‍🎓', trend: '+12%', trendUp: true,  color: 'purple' },
    { label: 'Active Lecturers', value: '87',   icon: '👩‍🏫', trend: '+3',   trendUp: true,  color: 'cyan'   },
    { label: 'Active Courses',  value: '48',    icon: '📚',   trend: '0',    trendUp: true,  color: 'green'  },
    { label: 'Avg. Attendance', value: '87%',   icon: '✅',   trend: '+2%',  trendUp: true,  color: 'amber'  },
  ];

  readonly recentActivities = [
    { icon: '👤', text: 'New student registration: Adaeze Nnaji',         time: '2 min ago',  color: 'purple' },
    { icon: '📚', text: 'CSC 401 course outline updated by Dr. Aliyu',    time: '15 min ago', color: 'cyan'   },
    { icon: '✅', text: 'Attendance recorded for all Monday classes',      time: '1 hour ago', color: 'green'  },
    { icon: '📋', text: 'Mid-term assessment results published',           time: '3 hours ago', color: 'amber'  },
    { icon: '🤖', text: 'AI: 3 at-risk students flagged in CSC department', time: 'Today',    color: 'red'    },
  ];

  readonly quickActions = [
    { icon: '👤', label: 'Add Student',   color: 'purple' },
    { icon: '👩‍🏫', label: 'Add Lecturer',  color: 'cyan'   },
    { icon: '📚', label: 'Create Course', color: 'green'  },
    { icon: '📣', label: 'Broadcast',     color: 'amber'  },
  ];

  readonly departments = [
    { name: 'Computer Science',  students: 342, courses: 18, head: 'Prof. Aliyu' },
    { name: 'Electrical Eng.',   students: 289, courses: 15, head: 'Dr. Okafor'  },
    { name: 'Business Admin.',   students: 412, courses: 22, head: 'Mrs. Adeola'  },
    { name: 'Mass Communication', students: 241, courses: 12, head: 'Dr. Ibrahim' },
  ];

  readonly aiInsights = [
    { text: '3 students in CSC 401 are at risk of failing based on attendance and assessment scores', type: 'warning' },
    { text: 'Business Admin has the highest course completion rate at 94% this semester', type: 'info' },
    { text: 'Predicted enrollment growth of 15% for next academic session based on current trends', type: 'success' },
  ];
}
