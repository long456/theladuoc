import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CourseService } from "../../../services/course.service";
import { teacher } from "../../../models/course";
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { config } from "../../../../../shared/models/ckeditor";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: [ './create-course.component.scss' ]
})
export class CreateCourseComponent implements OnInit, AfterViewInit {

  @ViewChild('courseName') courseNameField!: ElementRef;

  isCreate: boolean = false;

  isSubmit: boolean = false;

  courseForm!: FormGroup;

  listTeacher: teacher[] = [];

  courseId!: number;

  isExpand = false;

  ckEditorConfig: any = config;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data[ 'isCreate' ];

    this.courseForm = this.fb.group({
      title: [ '', [ Validators.required ] ],
      courseCode: [ '', Validators.pattern('^[a-zA-Z0-9\\-]+$') ],
      description: [ '' ],
      teacherId: [ null, [ Validators.required ] ],
      status: [ 1 ],
      type: [ 1 ],
      registerPoint: [ 0 ],
      directReferralPoint: [ 0 ],
      indirectReferralPoint: [ 0 ],
      price: [ 0 ],
      referralHtmlTop: [ '' ],
      referralHtmlBottom: [ '' ],
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.courseId = id;
        this.courseService.getCourseById(id).subscribe({
          next: res => {
            if (res) {
              const data = {
                ...res,
                price: res.coursePrice,
              }
              this.courseForm.patchValue(data)
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
            this.message.error(err.error);
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
        });
      }
    }
  }

  renderSlug(str: any) {
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

  formatterVnd(value: number): string {
    return `${value} VND`
  }

  parserVnd(value: string): string {
    return value.replace(' VND', '');
  }

  navigateBack() {
    this.router.navigate([ '/page/setting/course/list' ]);
  }

  loadExampleProgramRule(key: string, type: number | string) {
    let patchedValue: string = ''
    if (type == 2) patchedValue = `THẬT LÀ TUYỆT VỜI KHI CHÚNG TA CÙNG LAN TOẢ ĐIỀU TỐT ĐẸP NÀY ĐẾN VỚI CÁC BẠN CỦA MÌNH<br />ĐẦU TIÊN, VUI LÒNG ĐỌC KỸ THỂ LỆ CHƯƠNG TRÌNH<br />Khi đăng ký thành công, bạn sẽ nhận được 3 điểm!<br />Đối với mỗi người mà bạn giới thiệu, bạn sẽ nhận được 2 điểm!<br />Khi người mà bạn giới thiệu lại giới thiệu người khác, bạn sẽ nhận được 1 điểm!<br />Khi đạt 5 điểm, bạn sẽ nhận được phần quà đặc biệt là .........................................<br />(Phần quà sẽ được gửi vào email bạn đăng ký)<br />Lưu ý: Phần quà nên là ebook, khóa học online hoặc một sản phẩm kỹ thuật số có thể gủi qua email tự động. Không nên thiết kế phần quà là các sản phẩm vật lý.localhost:4200/page/setting/course/create`
    if (type == 1) patchedValue = `THẬT LÀ TUYỆT VỜI KHI CHÚNG TA CÙNG LAN TOẢ ĐIỀU TỐT ĐẸP NÀY ĐẾN VỚI CÁC BẠN CỦA MÌNH<br />ĐẦU TIÊN, VUI LÒNG ĐỌC KỸ THỂ LỆ CHƯƠNG TRÌNH<br />Khi đăng ký thành công, bạn sẽ nhận được 3 điểm!<br />Đối với mỗi người mà bạn giới thiệu, bạn sẽ nhận được 2 điểm!<br />Khi người mà bạn giới thiệu lại giới thiệu người khác, bạn sẽ nhận được 1 điểm!<br />Khi đạt 5 điểm, bạn sẽ nhận được phần quà đặc biệt là .........................................<br  />(Phần quà sẽ được gửi vào email bạn đăng ký)<br />Lưu ý: Phần quà nên là ebook, khóa học online hoặc một sản phẩm kỹ thuật số có thể gủi qua email tự động. Không nên thiết kế phần quà là các sản phẩm vật lý`
    this.courseForm.get(key)?.patchValue(patchedValue);
  }
}
