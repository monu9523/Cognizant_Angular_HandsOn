import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseCard } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight';
import { Course } from '../../models/course';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses$!: Observable<Course[]>;
  isLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string | null>;
  searchTerm = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';

    // Dispatch action — Effect handles the HTTP call
    this.store.dispatch(loadCourses());

    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);

    // Apply search filter reactively using async pipe
    this.courses$ = combineLatest([
      this.store.select(selectAllCourses),
    ]).pipe(
      map(([courses]) => {
        const term = this.searchTerm.toLowerCase();
        return term
          ? courses.filter(c =>
              c.name.toLowerCase().includes(term) ||
              c.code.toLowerCase().includes(term)
            )
          : courses;
      })
    );
  }

  onSearch(): void {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
    // Re-select to trigger filter
    this.courses$ = this.store.select(selectAllCourses).pipe(
      map(courses => {
        const term = this.searchTerm.toLowerCase();
        return term
          ? courses.filter(c =>
              c.name.toLowerCase().includes(term) ||
              c.code.toLowerCase().includes(term)
            )
          : courses;
      })
    );
  }

  goToDetail(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

}
