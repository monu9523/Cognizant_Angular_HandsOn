import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  { path: '', component: Home },

  // Nested routes under /courses
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetail }
    ]
  },

  // Protected profile route
  {
    path: 'profile',
    component: StudentProfile,
    canActivate: [authGuard]
  },

  // Lazy-loaded enrollment feature — chunk downloaded only on first visit
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/enrollment/enrollment-module').then(m => m.EnrollmentModule)
  },

  // Reactive enrollment form — standalone route (Step 48)
  {
    path: 'enroll-reactive',
    loadComponent: () =>
      import('./pages/reactive-enrollment-form/reactive-enrollment-form')
        .then(m => m.ReactiveEnrollmentForm)
  },

  // Wildcard — must be last so it only catches unmatched routes
  { path: '**', component: NotFound }

];
