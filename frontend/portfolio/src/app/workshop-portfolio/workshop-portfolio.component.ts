import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

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

  // Experience - will be loaded from Firebase
  experience: any[] = [];

  // Projects - will be loaded from Firebase
  projects: any[] = [];

  // Education
  education = [
    'BE - SRM Easwari (8cpga)',
    '12 - St.thomas Gudalur (94%)',
    '10 - St.thomas Gudalur (92%)',
  ];

  private firebaseService = inject(FirebaseService);

  ngOnInit(): void {
    this.loadProjects();
    this.loadExperiences();
  }

  // Load projects from Firebase
  loadProjects(): void {
    this.firebaseService.getProjects().subscribe({
      next: (response) => {
        if (response && response.success) {
          this.projects = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  // Load experiences from Firebase
  loadExperiences(): void {
    this.firebaseService.getExperiences().subscribe({
      next: (response) => {
        if (response && response.success) {
          this.experience = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading experiences:', error);
      }
    });
  }

  // Get a specific project by ID
  getProjectById(projectId: string): void {
    this.firebaseService.getProjectById(projectId).subscribe({
      next: (response) => {
        if (response && response.success) {
          // Handle the specific project data as needed
          console.log('Project details:', response.data);
          // You can use this data to display detailed information or update a selected project
        }
      },
      error: (error) => {
        console.error(`Error loading project ${projectId}:`, error);
      }
    });
  }

  // Get a specific experience by ID
  getExperienceById(experienceId: string): void {
    this.firebaseService.getExperienceById(experienceId).subscribe({
      next: (response) => {
        if (response && response.success) {
          // Handle the specific experience data as needed
          console.log('Experience details:', response.data);
          // You can use this data to display detailed information or update a selected experience
        }
      },
      error: (error) => {
        console.error(`Error loading experience ${experienceId}:`, error);
      }
    });
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
