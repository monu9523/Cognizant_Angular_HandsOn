import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../services/course';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

@Injectable()
export class CourseEffects {

  // inject() runs inside the injection context, so it's available before field initializers
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  // Effects are the ONLY place for side effects (HTTP, navigation, localStorage) in NgRx.
  // Reducers must stay pure — effects handle async operations and dispatch result actions.
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => loadCoursesSuccess({ courses })),
          catchError(error => of(loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );

}
