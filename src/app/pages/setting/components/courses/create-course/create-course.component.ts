import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {teacher} from "../../../models/course";
import {debounceTime, distinctUntilChanged, fromEvent, map, switchMap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit, AfterViewInit{

  @ViewChild('courseName') courseNameField!: ElementRef;

  isCreate: boolean = false;

  isSubmit: boolean = false;

  courseForm!: FormGroup;

  listTeacher: teacher[] = [];

  courseId!: number;

  isExpand = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private courseService : CourseService,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      courseCode: ['', Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      description: [''],
      teacherId: [null, [Validators.required]],
      sort: [1],
      status: [1]
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.courseId = id;
        this.courseService.getCourseById(id).subscribe({
          next: res => {
            if (res.success) {
              this.courseForm.patchValue(res.data)
            } else {
              this.message.error(res.errorMessages);
            }
          }
        })
      })
    }

    this.courseService.getAllTeacher().subscribe(res => {
      if (res.success) {
        this.listTeacher = res.data;
      }
    })
  }

  ngAfterViewInit() {
      fromEvent(this.courseNameField.nativeElement, 'keydown')
      .pipe(
        debounceTime(250),
        map((event: any) => event.target.value.trim()),
        distinctUntilChanged()
      )
      .subscribe(inputData => {
        const slug = this.renderSlug(inputData);
        this.courseForm.get('courseCode')?.patchValue(slug);
      });
  }

  edit(): void {
    this.isSubmit = true;
    if (this.courseForm.valid) {

      const data = {
        ...this.courseForm.value,
        teacherId: parseInt(this.courseForm.get('teacherId')?.value),
        status: this.courseForm.get('status')?.value ? 1 : 0,
      }

      if (this.isCreate) {
        this.courseService.createCourse(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {

          }
        })
      } else {
        this.courseService.updateCourse(this.courseId, data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
        })
      }
    }
  }

  renderSlug(str : any) {
    return str
      .toLowerCase() // Convert to lowercase
      .normalize("NFD") // Normalize Unicode
      .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
      .replace(/đ/g, "d") // Replace đ with d
      .replace(/[^\w\s-]/g, '') // Remove non-word characters except space and hyphen
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove consecutive hyphens
      .trim(); // Trim leading and trailing spaces
  }

  navigateBack() {
    this.router.navigate(['/page/setting/course/list']);
  }
}
