import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private functions = inject(Functions);

  // Get all projects
  getProjects(): Observable<any> {
    const getProjectsFunction = httpsCallable(this.functions, 'getProjects');
    return from(getProjectsFunction()).pipe(
      map((result: any) => result.data)
    );
  }

  // Get all experiences
  getExperiences(): Observable<any> {
    const getExperiencesFunction = httpsCallable(this.functions, 'getExperiences');
    return from(getExperiencesFunction()).pipe(
      map((result: any) => result.data)
    );
  }

  // Get a specific project by ID
  getProjectById(projectId: string): Observable<any> {
    const getProjectByIdFunction = httpsCallable(this.functions, 'getProjectById');
    return from(getProjectByIdFunction({ projectId })).pipe(
      map((result: any) => result.data)
    );
  }

  // Get a specific experience by ID
  getExperienceById(experienceId: string): Observable<any> {
    const getExperienceByIdFunction = httpsCallable(this.functions, 'getExperienceById');
    return from(getExperienceByIdFunction({ experienceId })).pipe(
      map((result: any) => result.data)
    );
  }
}
