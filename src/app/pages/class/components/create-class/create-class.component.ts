import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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

  listLesson = [
    {
      name: 'lesson A',
      startTime: '2024-03-28 12:00:00.000000'
    },
    {
      name: 'lesson B'
    },
    {
      name: 'lesson C'
    },
  ]

  listCourse: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private classService: ClassService,
    private courseService: CourseService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.classForm = this.fb.group({
      name: [],
      courseId: [],
      attendanceProgramId: [],
      startTime: [],
      endTime: [],
      attendanceUrl: [],
    });

    this.courseService.getListCourse().subscribe(res => {
      this.listCourse = res;
    })
  }

  edit() {}

  navigateBack() {}

  addLesson() {
    this.modal.create<CreateLessonComponent>({
      nzTitle: 'Tạo buổi học',
      nzContent: CreateLessonComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: instance => {

      }
    });
  }
}
