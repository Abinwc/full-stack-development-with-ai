import { Routes } from '@angular/router';
import { WorkshopPortfolioComponent } from './workshop-portfolio/workshop-portfolio.component';
import { PersonalPortfolioComponent } from './personal-portfolio/personal-portfolio.component';

export const routes: Routes = [
  {
    path: '',
    component: WorkshopPortfolioComponent,
  },
  {
    path: 'personal',
    component: PersonalPortfolioComponent,
  },
];
