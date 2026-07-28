import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';

// Custom sync validator: rejects course IDs starting with 'XX'
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && value.toString().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom async validator: simulates an API call to check if email is taken
function simulateEmailCheck(): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return new Promise<ValidationErrors | null>((resolve) => {
      setTimeout(() => {
        if (control.value?.includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
  };
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      // Third argument is the async validator array
      studentEmail: this.fb.control(
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck()]
      ),

      courseId: [
        '',
        [Validators.required, noCourseCode]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array([])

    });

  }

  // enrollForm.value        — excludes disabled controls (useful when you don't want disabled fields submitted)
  // enrollForm.getRawValue() — includes ALL controls even if disabled (useful for full data snapshot)
  onSubmit() {
    if (this.enrollForm.valid) {
      console.log('Form Value (excludes disabled):', this.enrollForm.value);
      console.log('Raw Value (includes disabled):', this.enrollForm.getRawValue());
    } else {
      this.enrollForm.markAllAsTouched();
    }
  }

  // Typed getter is better than casting in the template because:
  // it keeps templates clean, is reusable, and TypeScript enforces the type at compile time
  get additionalCourses(): FormArray<FormControl> {
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl>;
  }

  addCourse() {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

}