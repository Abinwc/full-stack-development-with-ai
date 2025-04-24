import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workshop-portfolio.component.html',
  styleUrls: ['./workshop-portfolio.component.css'],
})
export class WorkshopPortfolioComponent implements OnInit {
  mobileMenuOpen = false;
  currentYear = new Date().getFullYear();

  // Navigation
  navItems = [
    'Home',
    'About',
    'Skills',
    'Experience',
    'Projects',
    'Education',
    'Contact',
  ];

  // Personal info
  personalStatement =
    "I'm interested in the intersection of development, AI, and human creativity.";

  // Social links
  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/wc-enterprises', icon: '💻' },
    { name: 'Twitter', url: 'https://twitter.com/Abinwc', icon: '🐦' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abin-paul-b64708194/',
      icon: '🔗',
    },
  ];

  // Summary points
  summary = [
    'Self-driven individual who is obsessed with creating quality software products',
    'Very good at mentoring and building a team',
    'Excellent communication and collaboration skills',
    'Well-versed in programming fundamentals and frameworks including NestJS and Angular',
    'Founder of Techcora Corporation Pvt Ltd, a company dedicated in building impactful software projects for the Indian market',
    'Trained 50+ final and pre-final year college students on programming basics and introduced them to full-stack development, many of whom have gone on to secure positions at top companies such as Zoho, Accenture, and Ideas2It.',
  ];

  // Skills
  skills = [
    'Problem Solving',
    'Software Development',
    'Team building',
    'Communication',
    'Leadership & Mentoring',
    'Strategic Planning',
    'Risk Management',
    'Networking',
  ];

  // Technologies
  technologies = [
    'Angular',
    'Typescript',
    'HTML, CSS & Javascript',
    'Tailwind',
    'NestJS',
    'Firebase',
    'Postgres',
    'Git',
  ];

  // Experience
  experience = [
    {
      company: 'Surfboard Payments',
      role: 'Software Engineer',
      description: 'Fin-tech company revolutionising payment industry',
      achievements: [
        'Successfully spearheaded a KYB (Know Your Business) project that revolutionized the onboarding process for global companies. Achieved an outstanding 85% reduction in onboarding time by implementing automation, streamlining the process from 20 minutes to just 3 minutes',
        'Integrated Klarna payment method into the payment options offered, enhancing the user experience by providing a seamless and efficient payment process',
        'Involved in the successful development of the checkout layer, which involved the efficient handling of orders from point-of-sale (POS) systems and managing transaction records of customers using our products',
        'Skilled at working with different digital ID verification systems and company data providers',
        'Successfully recruited and led a team of 4 graduates straight out of college. Provided effective mentorship resulting in one team member being promoted to the role of team lead',
        'Experienced in utilising Linear, Notion, and Asana for effective project management',
        'Proficiently utilised NestJS, TypeScript and SQL to develop and deliver successful projects',
      ],
    },
    {
      company: 'Techcora Corporation',
      role: 'Entrepreneur / Software Engineer',
      description: 'Software Development Company',
      projects: [
        'Wild Eye product which can be useful for agriculture and forest development',
      ],
      achievements: [
        'Focused on the Wild Eye project, aiming to mitigate animal raids on crops, resolve human-wildlife conflicts, and prevent animal accidents on railway lines',
        'Training interested candidates in software engineering fundamentals by regularly conducting 6 week internship programs. 50+ students have benefited from this so far',
      ],
    },
  ];

  // Projects
  projects = [
    {
      name: 'Chikpuk',
      type: 'Quick Commerce Application',
      achievement: '20% increase in sales in the first six months',
      highlights: [
        'Developed and launched a quick commerce marketplace platform that increased merchant sales by 20% within the first six months',
        'Engineered a highly scalable infrastructure, enabling seamless onboarding of multiple merchants',
        'Designed and implemented a world-class UI/UX, leading to exceptional user satisfaction',
        'Utilized data-driven strategies to optimize product listings and promotions',
        'Integrated advanced analytics tools to monitor performance metrics',
        'Implemented agile methodologies, reducing development cycles and accelerating time-to-market',
      ],
    },
    {
      name: 'Elegance',
      type: 'Salon billing, appointments and subscriptions ERP',
      achievement: '30% increase in first-time clients and more',
      highlights: [
        'Developed a comprehensive billing software tailored for a salon client',
        'Integrated customer subscription management, enabling the salon to offer membership plans',
        'Implemented employee performance tracking system',
        'Designed an intuitive appointment booking system',
        'Created a dual-interface solution with public web application and administrative dashboard',
        'Revenue Growth: Salon experienced up to a 20% increase in overall revenue',
        'Customer Retention: Client retention rates improved by approximately 25%',
      ],
    },
  ];

  // Education
  education = [
    'BE - SRM Easwari (8cpga)',
    '12 - St.thomas Gudalur (94%)',
    '10 - St.thomas Gudalur (92%)',
  ];

  constructor() {}

  ngOnInit(): void {
    // Any initialization logic
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Close mobile menu on scroll
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }
}
