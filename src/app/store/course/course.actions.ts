import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course';

// [Course] prefix groups actions by feature — readable in Redux DevTools timeline
export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);
