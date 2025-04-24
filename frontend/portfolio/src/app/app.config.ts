import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRrHGUle4baGuEUCLPZuV_bUdonBdgoEk',
  authDomain: 'abin-portfolio.firebaseapp.com',
  projectId: 'abin-portfolio',
  storageBucket: 'abin-portfolio.firebasestorage.app',
  messagingSenderId: '756717804657',
  appId: '1:756717804657:web:714b65363714ee053dcfd0',
  measurementId: 'G-KCFMJB5MMB',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFunctions(() => getFunctions()),
  ],
};
