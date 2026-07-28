import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreditLabelPipe } from '../../pipes/credit-label';
import { Course } from '../../models/course';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {

  @Input() course!: Course;

  isExpanded = false;
  isEnrolled$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && this.course) {
      // Select enrollment state for this specific course
      this.isEnrolled$ = this.store.select(selectEnrolledIds).pipe(
        map(ids => ids.includes(this.course.id))
      );
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleEnrollment(isEnrolled: boolean): void {
    if (isEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }
  }

  borderColor(): string {
    switch (this.course.gradeStatus) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      default: return 'gray';
    }
  }

}
