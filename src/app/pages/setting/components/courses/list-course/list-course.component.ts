import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {COL_DATA_TYPE, filterItem} from "../../../../../shared/models/Table";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {switchMap} from "rxjs";
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit{

  rowData: any;

  COL_DATA_TYPE = COL_DATA_TYPE;

  isExpand = false;

  listOfColumn: filterItem[] = [
    {
      title: 'Ngày đăng ký',
      name: 'createdDate',
      type: "date-range"
    },
    {
      title: 'Tên tổ chức',
      name: 'organizationName',
    },
    {
      title: 'Tên diễn giả',
      name: 'teacherName',
    },
    {
      title: 'Tên khóa học',
      name: 'title',
    },
    {
      title: 'Trạng thái',
      name: 'status',
      type: "select",
      value: 1,
      data: [
        {
          label: 'Hiển thị',
          key: 1
        },
        {
          label: 'Không hiện thị',
          key: 0
        }
      ]
    },
  ]

  constructor(
    private courseService : CourseService,
    private router: Router,
    private message: NzMessageService,
    private modal :NzModalService,
  ) {
  }

  ngOnInit() {
    this.getCourseData();
  }

  getCourseData(filter? : any): void {
    this.courseService.getAllCourse(filter).subscribe({
      next: res => {
        if (res.success) {
          this.rowData = res.data.courseList;
        } else {
          this.message.error(res.errorMessages);
        }
      }
    })
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  handleFilterForm(event: any) {
    this.getCourseData(event)
  }

  create() {
    this.router.navigate(['/page/setting/course/create'])
  }

  edit(data: any) {
    this.router.navigate(['/page/setting/course/' + data.id])
  }

  delete(data: any) {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa khóa học này không ?',
      nzOkText: 'Xóa',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.courseService.deleteCourse(data.id)
          .pipe(
            switchMap(res => {
              if (res.success) {
                this.message.success(res.messages);
                return this.courseService.getAllCourse()
              } else {
                throw new Error(res.errorMessages)
              }
            })
          )
          .subscribe({
            next: res => {
              if (res.success) {
                this.rowData = res.data.courseList;
              } else {
                this.message.error(res.errorMessages);
              }
            },
            error: err => {
              this.message.error(err);
            }
          })
      }
    })
  }
}
