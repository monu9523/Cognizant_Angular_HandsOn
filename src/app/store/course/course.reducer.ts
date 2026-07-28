import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

// Reducers must be pure functions — no side effects, no HTTP calls, no mutations
export const courseReducer = createReducer(
  initialCourseState,

  on(loadCourses, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    loading: false,
    courses
  })),

  on(loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
