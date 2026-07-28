# 🎓 Student Course Portal — Angular Hands-On

**Digital Nurture 5.0 | .NET Full Stack Engineer Track**  
**Angular v20 | 10 Hands-On Exercises**

A fully-featured Student Course Portal built incrementally across 10 hands-on exercises, covering core Angular concepts from project setup through to NgRx state management and unit testing.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (LTS 20+)
- Angular CLI v20 — `npm install -g @angular/cli`
- JSON Server — `npm install -g json-server`

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/monu9523/Cognizant_Angular_HandsOn.git
cd Cognizant_Angular_HandsOn/student-course-portal

# 2. Install dependencies
npm install

# 3. Start the mock REST API (in a separate terminal)
npx json-server db.json --port 3000

# 4. Start the Angular dev server
ng serve
```

Open **http://localhost:4200** in your browser.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | v21.2 | Frontend framework |
| TypeScript | ~5.9 | Language |
| NgRx | v21.1 | State management |
| RxJS | ~7.8 | Reactive programming |
| JSON Server | latest | Mock REST API |
| Vitest | v4 | Unit testing |
| Angular CLI | v21.2 | Scaffolding & build |

---

## 📁 Project Structure

```
src/app/
├── components/
│   ├── course-card/        # Reusable course card with enroll/unenroll
│   ├── header/             # Global navigation bar
│   └── notification/       # Toast notification (top-right, green)
├── directives/
│   └── highlight.ts        # Custom attribute directive (hover highlight)
├── features/
│   └── enrollment/         # Lazy-loaded enrollment feature module
├── guards/
│   ├── auth-guard.ts       # CanActivate — protects /profile and /enroll
│   └── unsaved-changes-guard.ts  # CanDeactivate — warns on dirty form
├── interceptors/
│   ├── auth-interceptor.ts         # Adds Bearer token to all requests
│   ├── error-handler-interceptor.ts # Global 401/500 error handling
│   └── loading-interceptor.ts      # Global loading spinner
├── models/
│   └── course.ts           # Course interface
├── pages/
│   ├── home/               # Dashboard with stats
│   ├── course-list/        # Browse all courses with search
│   ├── course-detail/      # Single course view
│   ├── enrollment-form/    # Template-driven form
│   ├── reactive-enrollment-form/  # Reactive form with FormArray
│   ├── student-profile/    # Enrolled courses list
│   ├── courses-layout/     # Nested route layout
│   └── not-found/          # 404 page
├── pipes/
│   └── credit-label.ts     # Custom pipe: 1 → "1 Credit", 3 → "3 Credits"
├── services/
│   ├── auth.ts             # Authentication state
│   ├── course.ts           # HTTP CRUD for courses
│   ├── enrollment.ts       # Enrollment logic + switchMap
│   ├── loading.ts          # BehaviorSubject loading state
│   └── notification.ts     # Global notification message
└── store/
    ├── course/             # NgRx actions, reducer, effects, selectors
    └── enrollment/         # NgRx enrollment slice + cross-slice selector
```

---

## 🗺️ Application Routes

| Path | Component | Guard |
|---|---|---|
| `/` | Home | — |
| `/courses` | CourseList | — |
| `/courses/:id` | CourseDetail | — |
| `/profile` | StudentProfile | `authGuard` |
| `/enroll` | EnrollmentModule (lazy) | `authGuard` |
| `/enroll-reactive` | ReactiveEnrollmentForm | `unsavedChangesGuard` |
| `**` | NotFound | — |

---

## 📚 Hands-On Exercises

### HO-1 — Environment Setup & First Component
- Scaffolded Angular project with Angular CLI
- Explored project structure (`angular.json`, `tsconfig`, `main.ts`)
- Generated `Header`, `Home`, `CourseList`, `StudentProfile` components
- Documented all key files in `notes.txt`

### HO-2 — Data Binding, Lifecycle Hooks & Component Communication
- All 4 binding types: interpolation, property, event, two-way (`ngModel`)
- Lifecycle hooks: `ngOnInit`, `ngOnDestroy`, `ngOnChanges`
- `@Input()` and `@Output()` with `EventEmitter` for parent-child communication

### HO-3 — Directives & Pipes
- Structural directives: `*ngIf`, `*ngFor` with `trackBy`, `*ngSwitch`
- Attribute directives: `[ngClass]`, `[ngStyle]`
- Custom directive: `HighlightDirective` — configurable hover colour via `@Input`
- Custom pipe: `CreditLabelPipe` — transforms credits number to readable string

### HO-4 — Template-Driven Forms
- `EnrollmentForm` at `/enroll` using `#enrollForm="ngForm"`
- Built-in validators: `required`, `minlength`, `email`
- Validation error messages with `ng-touched` state
- `.ng-invalid.ng-touched` / `.ng-valid.ng-touched` CSS classes
- Success message on submit, Reset button

### HO-5 — Reactive Forms
- `ReactiveEnrollmentForm` at `/enroll-reactive` using `FormBuilder`
- Custom sync validator: `noCourseCode` (rejects `XX` prefix)
- Custom async validator: `simulateEmailCheck` (800ms Promise, rejects `test@`)
- `FormArray` for dynamic additional course controls
- Typed `additionalCourses` getter

### HO-6 — Services & Dependency Injection
- `CourseService` — `providedIn: 'root'` singleton
- `EnrollmentService` — service-to-service injection
- `AuthService`, `NotificationService`, `LoadingService`
- Component-level DI demonstrated with `NotificationComponent`

### HO-7 — Routing, Guards & Lazy Loading
- Full route configuration with nested routes under `/courses`
- Route parameters (`/courses/:id`) and query parameters (`?search=`)
- Lazy-loaded `EnrollmentModule` — separate JS chunk on first visit
- `authGuard` (CanActivate) — redirects to home if not logged in
- `unsavedChangesGuard` (CanDeactivate) — confirms navigation on dirty form

### HO-8 — HTTP Client, RxJS & Interceptors
- `HttpClient` replacing all hardcoded data — GET, POST, PUT, DELETE
- RxJS operators: `map`, `tap`, `catchError`, `retry(2)`, `switchMap`
- 3 HTTP interceptors registered in order:
  - `authInterceptor` — adds `Authorization: Bearer` header
  - `errorHandlerInterceptor` — handles 401 (redirect) and 500 (notification)
  - `loadingInterceptor` — shows/hides global spinner via `LoadingService`

### HO-9 — NgRx State Management
- `provideStore()` + `provideStoreDevtools({ maxAge: 25 })`
- **Course slice:** `loadCourses` → Effect → HTTP → `loadCoursesSuccess` / `loadCoursesFailure`
- **Enrollment slice:** `enrollInCourse`, `unenrollFromCourse`, `setEnrolledCourses`
- Memoised selectors: `selectAllCourses`, `selectCoursesLoading`, `selectCoursesError`
- Cross-slice selector: `selectEnrolledCourses` combining course + enrollment state
- `inject()` pattern in effects to avoid field-initializer DI timing issue

### HO-10 — Unit Testing
- **`course-card.spec.ts`** — component creation, `@Input` rendering, dispatch on click, `ngOnChanges`
- **`course.spec.ts`** — `getCourses` success + id mapping, 500 error with `retry(2)` loop
- **`course-list.spec.ts`** — `MockStore` initial state renders cards, `setState` shows loading indicator
- All other spec files fixed: `NotificationComponent`, `HighlightDirective`, `EnrollmentService`, `NotificationService`

---

## 🧪 Running Tests

```bash
# Run all tests in watch mode
ng test

# Run with coverage report
ng test --coverage
```

---

## 🗄️ Mock API — JSON Server

The app uses JSON Server as a mock REST backend.

```bash
npx json-server db.json --port 3000
```

**Endpoints:**

| Method | URL | Description |
|---|---|---|
| GET | `/courses` | List all courses |
| GET | `/courses/:id` | Get course by ID |
| POST | `/courses` | Create a course |
| PUT | `/courses/:id` | Update a course |
| DELETE | `/courses/:id` | Delete a course |
| GET | `/students` | List all students |
| GET | `/enrollments` | List all enrollments |

---

## 🔧 Available Scripts

```bash
ng serve          # Start dev server at http://localhost:4200
ng build          # Production build → dist/
ng test           # Run unit tests (Vitest)
ng test --coverage  # Tests + coverage report
```

---

## 👤 Author

**Roshni Kumari Singh** — Digital Nurture 5.0, .NET Full Stack Engineer Track  
GitHub: [@monu9523](https://github.com/monu9523)
