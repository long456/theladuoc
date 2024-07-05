import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ClassService} from "../../services/class.service";
import {CourseService} from "../../../setting/services/course.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {CreateLessonComponent} from "../create-lesson/create-lesson.component";


@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {

  isCreate: boolean = false;

  isSubmit: boolean = false;

  classForm!: FormGroup;

  listCourse: any[] = [];

  classId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private classService: ClassService,
    private courseService: CourseService,
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.classForm = this.fb.group({
      name: [null, [Validators.required]],
      courseId: [],
      maximumLessonWithoutAttendance: [0]
    });

    this.courseService.getListCourse().subscribe(res => {
      this.listCourse = res;
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.classId = id;
      })

      this.pathClassData(this.classId);
    }
  }

  pathClassData(id: number) {
    this.classService.getClassById(id).subscribe({
      next: res => {
        let data = {
          ...res,
          name: res.className
        }
        this.classForm.patchValue(data)
      }
    })
  }

  edit() {
    if (this.classForm.valid) {
      if(this.isCreate) {
        this.classService.createClass(this.classForm.value).subscribe({
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
          }
        )
      } else {
        let data = {
          name: this.classForm.value.name
        }
        this.classService.updateClass(this.classId,data).subscribe({
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
          }
        )
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/class'])
  }
}
