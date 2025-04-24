import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPortfolioComponent } from './personal-portfolio.component';

describe('PersonalPortfolioComponent', () => {
  let component: PersonalPortfolioComponent;
  let fixture: ComponentFixture<PersonalPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
