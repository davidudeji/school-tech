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
        'Intelligent insights into academic performance, attendance patterns, and at-risk student detection powered by cutting-edge AI.',
      color: 'purple',
    },
    {
      icon: '🎓',
      title: 'Student Information System',
      description:
        'Complete lifecycle management — from enrollment to graduation. Profiles, guardian records, academic history, all in one place.',
      color: 'cyan',
    },
    {
      icon: '📚',
      title: 'Course Management',
      description:
        'Seamless course creation, lecturer assignment, registration, prerequisites, outlines, and weekly progress tracking.',
      color: 'purple',
    },
    {
      icon: '📋',
      title: 'Attendance Tracking',
      description:
        'Real-time attendance monitoring for students and staff. Automated reports, alerts, and integration with assessments.',
      color: 'cyan',
    },
    {
      icon: '✏️',
      title: 'Assessment Engine',
      description:
        'Online tests, quizzes, assignments, question banks, automatic grading, GPA/CGPA calculation, and transcript generation.',
      color: 'purple',
    },
    {
      icon: '💬',
      title: 'Communication Hub',
      description:
        'Real-time messaging, announcements, in-app notifications, and email alerts keeping everyone connected and informed.',
      color: 'cyan',
    },
  ];

  readonly modules: Module[] = [
    {
      phase: 1,
      title: 'Marketing & Website',
      icon: '🌐',
      description: 'Professional landing page, SEO, and school branding',
      tag: 'Live',
    },
    {
      phase: 2,
      title: 'Auth & Security',
      icon: '🔐',
      description: 'JWT auth, role-based access, admin/lecturer/student portals',
      tag: 'Core',
    },
    {
      phase: 3,
      title: 'Student Information',
      icon: '👨‍🎓',
      description: 'Student profiles, departments, faculties, programmes',
      tag: 'Core',
    },
    {
      phase: 4,
      title: 'Course Management',
      icon: '📖',
      description: 'Course registration, outlines, materials, and approvals',
      tag: 'Core',
    },
    {
      phase: 5,
      title: 'Attendance & Assessments',
      icon: '✅',
      description: 'Attendance tracking, quizzes, assignments, grading',
      tag: 'Advanced',
    },
    {
      phase: 6,
      title: 'Results & Analytics',
      icon: '📊',
      description: 'GPA/CGPA, transcripts, promotion checks, dashboards',
      tag: 'Advanced',
    },
    {
      phase: 7,
      title: 'Productivity Suite',
      icon: '🤖',
      description: 'Study assistant, quiz generation, smart insights',
      tag: 'AI',
    },
    {
      phase: 8,
      title: 'Production & Deployment',
      icon: '🚀',
      description: 'CI/CD, Docker, monitoring, security hardening',
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
        'School Tech ERP has completely transformed how we manage our institution. The AI insights helped us identify at-risk students months before they would have failed. Truly remarkable.',
      rating: 5,
    },
    {
      name: 'Chidera Emmanuel',
      role: 'Final Year Student',
      institution: 'Lagos Tech University',
      avatar: 'CE',
      content:
        'The student portal is incredible. I can register courses, track attendance, download materials, and the AI study assistant helps me prepare for exams. It feels like having a personal tutor!',
      rating: 5,
    },
    {
      name: 'Prof. Fatimah Aliyu',
      role: 'HOD, Computer Science',
      institution: 'Northern Federal Polytechnic',
      avatar: 'FA',
      content:
        'Managing course outlines, tracking weekly topics, and communicating with students has never been easier. The grading automation saves me hours every week.',
      rating: 5,
    },
    {
      name: 'Mr. Kingsley Adeyemi',
      role: 'IT Administrator',
      institution: 'Excellence Secondary School',
      avatar: 'KA',
      content:
        'The deployment was seamless and the support team is phenomenal. Our data is secure, the uptime is exceptional, and our staff adapted quickly to the intuitive interface.',
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
        'School Tech ERP is a modern, AI-powered Enterprise Resource Planning system built specifically for educational institutions. It provides a single platform to manage students, courses, attendance, assessments, results, and communication — all enhanced with AI-driven insights.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes! Our Starter plan is completely free for institutions with up to 100 students and includes all core features. For larger institutions, we offer a 30-day free trial on our Professional plan — no credit card required.',
    },
    {
      question: 'Can we import our existing student data?',
      answer:
        'Absolutely. We provide bulk import tools for CSV/Excel files and a full REST API for custom integrations. Our onboarding team will guide you through migrating your existing data seamlessly.',
    },
    {
      question: 'What AI features are included?',
      answer:
        'Our AI suite includes: a student study assistant that explains notes and recommends study plans, an admin AI for at-risk student detection and natural-language queries, and a lecturer AI for quiz generation and grading feedback. Phase 7 details all AI capabilities.',
    },
    {
      question: 'Is the platform mobile-friendly?',
      answer:
        'Yes, School Tech ERP is fully responsive and works beautifully on all devices. We are also building a Progressive Web App (PWA) version so students and staff can install it on their phones for an app-like experience.',
    },
    {
      question: 'How secure is our institution data?',
      answer:
        'Security is our top priority. We use JWT authentication, bcrypt password hashing, role-based access control, encrypted data at rest and in transit, audit logs, and comply with data protection regulations. Enterprise plans also include on-premise deployment options.',
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
