import {
  Component,
  signal,
  computed,
  afterNextRender,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface Module {
  phase: number;
  title: string;
  icon: string;
  description: string;
  tag: string;
}

export interface Testimonial {
  name: string;
  role: string;
  institution: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  students: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Problem {
  icon: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  old: string;
  new: string;
}

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingComponent {
  private platformId = inject(PLATFORM_ID);

  // UI State
  mobileOpen = signal(false);
  activeFaq = signal<number | null>(null);
  scrolled = signal(false);
  activeNav = signal('hero');

  // Data
  readonly features: Feature[] = [
    {
      icon: '🤖',
      title: 'Analytics',
      description:
        'Spot underperforming students, attendance dips, and grade trends before they become problems. Powered by AI trained on academic data.',
      color: 'purple',
    },
    {
      icon: '🎓',
      title: 'Student Information System',
      description:
        'Enrollment to graduation, one record. Profiles, guardian contacts, academic history, and programme details in a single place.',
      color: 'cyan',
    },
    {
      icon: '📚',
      title: 'Course Management',
      description:
        'Create courses, assign lecturers, open registration, set prerequisites, publish outlines, and track weekly progress without switching tools.',
      color: 'purple',
    },
    {
      icon: '📋',
      title: 'Attendance Tracking',
      description:
        'Live attendance logs for students and staff. Automated reports flag absences before they hit the threshold that triggers consequences.',
      color: 'cyan',
    },
    {
      icon: '✏️',
      title: 'Assessment Engine',
      description:
        'Online tests, quizzes, assignments, question banks, auto-grading for objective questions, GPA/CGPA calculation, and transcript export.',
      color: 'purple',
    },
    {
      icon: '💬',
      title: 'Communication Hub',
      description:
        'In-app messages, announcements, and email alerts for students, lecturers, and admins. One channel, not five.',
      color: 'cyan',
    },
  ];

  readonly modules: Module[] = [
    {
      phase: 1,
      title: 'Marketing & Website',
      icon: '🌐',
      description: 'Landing page, SEO, and school branding that runs before the app is live',
      tag: 'Live',
    },
    {
      phase: 2,
      title: 'Auth & Security',
      icon: '🔐',
      description: 'JWT auth, role-based access control, and separate portals for admins, lecturers, and students',
      tag: 'Core',
    },
    {
      phase: 3,
      title: 'Student Information',
      icon: '👨‍🎓',
      description: 'Student profiles, departments, faculties, and programme records',
      tag: 'Core',
    },
    {
      phase: 4,
      title: 'Course Management',
      icon: '📖',
      description: 'Course registration, outlines, uploaded materials, and approval workflows',
      tag: 'Core',
    },
    {
      phase: 5,
      title: 'Attendance & Assessments',
      icon: '✅',
      description: 'Attendance logs, online quizzes, assignments, and auto-grading',
      tag: 'Advanced',
    },
    {
      phase: 6,
      title: 'Results & Analytics',
      icon: '📊',
      description: 'GPA/CGPA calculation, transcripts, promotion checks, and performance dashboards',
      tag: 'Advanced',
    },
    {
      phase: 7,
      title: 'AI Productivity Suite',
      icon: '🤖',
      description: 'Study assistant, quiz generation from lecture notes, and natural-language admin queries',
      tag: 'AI',
    },
    {
      phase: 8,
      title: 'Production & Deployment',
      icon: '🚀',
      description: 'CI/CD pipeline, Docker support, monitoring, and security hardening',
      tag: 'DevOps',
    },
  ];

  readonly testimonials: Testimonial[] = [
    {
      name: 'Dr. Amara Okonkwo',
      role: 'Principal',
      institution: 'Stellar International Academy',
      avatar: 'AO',
      content:
        'School Tech ERP changed how we run the school. The AI flagged at-risk students months before exam period. We caught three cases that would have slipped through.',
      rating: 5,
    },
    {
      name: 'Chidera Emmanuel',
      role: 'Final Year Student',
      institution: 'Lagos Tech University',
      avatar: 'CE',
      content:
        'I register courses, check attendance, and download lecture notes from one place. The AI study assistant broke down my toughest topics in plain language. Passed CSC 401 because of it.',
      rating: 5,
    },
    {
      name: 'Prof. Fatimah Aliyu',
      role: 'HOD, Computer Science',
      institution: 'Northern Federal Polytechnic',
      avatar: 'FA',
      content:
        'I used to spend Sunday evenings updating course records and chasing students for submissions. That\'s gone. The grading automation alone saves me about four hours a week.',
      rating: 5,
    },
    {
      name: 'Mr. Kingsley Adeyemi',
      role: 'IT Administrator',
      institution: 'Excellence Secondary School',
      avatar: 'KA',
      content:
        'Setup took two days. The support team answered every question the same day. Staff were using it on their own by the end of week one. Uptime has been solid at 99.9% for eight months.',
      rating: 5,
    },
  ];

  readonly pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'Perfect for small schools getting started',
      students: 'Up to 100 students',
      features: [
        'Student Information System',
        'Basic Course Management',
        'Attendance Tracking',
        'Student & Admin Portals',
        'Email Notifications',
        'Community Support',
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing institutions that need more power',
      students: 'Up to 1,000 students',
      features: [
        'Everything in Starter',
        'Full Assessment Engine',
        'GPA/CGPA & Transcripts',
        'Analytics Dashboards',
        'AI Study Assistant',
        'Priority Support',
        'API Access',
        'Custom Branding',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'Full-scale ERP for large universities',
      students: 'Unlimited students',
      features: [
        'Everything in Professional',
        'Full AI Productivity Suite',
        'Multi-campus Support',
        'Audit Logs & Compliance',
        'Custom Integrations',
        'Dedicated Account Manager',
        'SLA Guarantee (99.9%)',
        'On-premise Option',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'What is School Tech ERP?',
      answer:
        'School Tech ERP is a school ERP built for educational institutions. It runs students, courses, attendance, assessments, results, and communication from one platform, with AI features layered on top for insights and automation.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'The Starter plan is free for schools with up to 100 students and covers all core modules. If you need more capacity, the Professional plan comes with a 30-day trial, no credit card required.',
    },
    {
      question: 'Can we import our existing student data?',
      answer:
        'Yes. You can upload CSV or Excel files with our bulk import tool, or use the REST API for custom data pipelines. The onboarding team handles the migration with you step by step.',
    },
    {
      question: 'What AI features are included?',
      answer:
        'Three AI tools ship with the platform: a student study assistant that explains lecture notes and builds study plans, an admin tool for at-risk student detection and natural-language database queries, and a lecturer tool that generates quizzes from uploaded notes and suggests grading feedback. Full details are in Phase 7 of the spec.',
    },
    {
      question: 'Is the platform mobile-friendly?',
      answer:
        'Yes. The app is fully responsive across phones, tablets, and desktops. A Progressive Web App version is in development so students and staff can install it directly from the browser.',
    },
    {
      question: 'How secure is our institution data?',
      answer:
        'The platform uses JWT authentication, bcrypt password hashing, role-based access control, encryption at rest and in transit, and full audit logs. Enterprise plans add an on-premise deployment option for institutions that cannot use cloud storage.',
    },
  ];

  readonly stats = [
    { value: '500+', label: 'Schools' },
    { value: '50K+', label: 'Students' },
    { value: '99.9%', label: 'Uptime' },
    { value: '8', label: 'ERP Modules' },
  ];

  readonly navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Modules', href: '#modules' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  readonly problems: Problem[] = [
    {
      icon: '📊',
      title: 'Data scattered across dozens of tools',
      description: 'Student records in one spreadsheet. Attendance in another. Grades in a third. No one has a complete picture, and reconciling the data takes hours every week.',
    },
    {
      icon: '⏳',
      title: 'Manual work that should not exist',
      description: 'Printing registers, chasing submission emails, copying results into result sheets by hand. Admin staff spend the majority of their day on tasks a computer should handle.',
    },
    {
      icon: '🚫',
      title: 'No real-time decisions',
      description: 'By the time attendance reports reach the right desk, the semester is half over. Problems that AI could flag in seconds take weeks to surface through manual processes.',
    },
    {
      icon: '🔒',
      title: 'No role-based access control',
      description: 'Everyone sees everything, or worse, access is restricted so tightly that staff cannot do their jobs without calling IT. Neither extreme serves the school.',
    },
    {
      icon: '💸',
      title: 'Enterprise ERP built for corporations, not schools',
      description: 'The big ERP vendors charge five times more than schools can afford, require months of implementation, and still do not support Nigerian academic structures.',
    },
    {
      icon: '📉',
      title: 'Student performance problems go undetected',
      description: 'At-risk students fall through the cracks until exam results confirm what a well-designed system would have flagged months earlier. By then, intervention is too late.',
    },
  ];

  readonly comparisonRows: ComparisonRow[] = [
    {
      feature: 'Student records',
      old: 'Scattered across spreadsheets and paper files',
      new: 'Single unified profile from enrollment to graduation',
    },
    {
      feature: 'Attendance tracking',
      old: 'Manual registers, transcribed after class',
      new: 'Live digital logs with automated absence alerts',
    },
    {
      feature: 'Course registration',
      old: 'Physical forms, queues, manual approval',
      new: 'Online, with prerequisite checks and instant confirmation',
    },
    {
      feature: 'Results & GPA',
      old: 'Computed manually in Excel, error-prone',
      new: 'Automated GPA/CGPA calculation with transcript export',
    },
    {
      feature: 'At-risk detection',
      old: 'Discovered after exam failure',
      new: 'AI flags at-risk students weeks in advance',
    },
    {
      feature: 'Role access',
      old: 'One login, everyone sees everything',
      new: 'Separate portals for admins, lecturers, and students',
    },
    {
      feature: 'Setup time',
      old: '6–18 months, expensive consultants',
      new: '2 days, guided setup wizard, our team walks you through',
    },
    {
      feature: 'Cost',
      old: '$10,000+ per year for enterprise ERP',
      new: 'Free for small schools. $99/month for growing institutions',
    },
  ];

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initScrollEffects();
        this.initRevealObserver();
      }
    });
  }

  private initScrollEffects(): void {
    window.addEventListener('scroll', () => {
      this.scrolled.set(window.scrollY > 60);
    });
  }

  private initRevealObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  toggleFaq(index: number): void {
    this.activeFaq.set(this.activeFaq() === index ? null : index);
  }

  toggleMobile(): void {
    this.mobileOpen.set(!this.mobileOpen());
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  isFaqOpen(index: number): boolean {
    return this.activeFaq() === index;
  }

  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }

  getTagClass(tag: string): string {
    const map: Record<string, string> = {
      Live: 'tag-live',
      Core: 'tag-core',
      Advanced: 'tag-advanced',
      AI: 'tag-ai',
      DevOps: 'tag-devops',
    };
    return map[tag] ?? 'tag-core';
  }
}
