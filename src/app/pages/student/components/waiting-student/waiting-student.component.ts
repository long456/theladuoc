import {Component, OnInit} from '@angular/core';
import {Student} from "../../models/student";
import {StudentWaitingService} from "../../services/student-waiting.service";
import {COL_DATA_TYPE, FIX_COLUMN, filterItem} from "../../../../shared/models/Table";
import {switchMap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-waiting-student',
  templateUrl: './waiting-student.component.html',
  styleUrls: ['./waiting-student.component.scss']
})
export class WaitingStudentComponent implements OnInit{
  COL_DATA_TYPE = COL_DATA_TYPE;

  listOfColumn: filterItem[] = [
    {
      title: 'Ngày đăng ký',
      name: 'createdDate',
      type: "date-range"
    },
    {
      title: 'Loại vé',
      name: 'ticket',
      type: "select",
      value: 'vip',
      data: [
        {
          key: 'vip',
          label: 'VIP'
        },
        {
          key: 'free',
          label: 'FREE'
        },
        {
          key: 'premium',
          label: 'PREMIUM'
        }
      ]
    },
    {
      title: 'Tên học viên',
      name: 'name',
    },
    {
      title: 'Số điện thoại',
      name: 'mobile',
    },
    {
      title: 'Email',
      name: 'email',
    },
    {
      title: 'Mã học viên',
      name: 'code',
    },
    {
      title: 'Người giới thiệu',
      name: 'userRef',
    },
    {
      title: 'Tên diễn giả',
      name: 'lecturerName',
    },
    {
      title: 'Tên khóa học',
      name: 'courseName',
    },
    {
      title: 'Số điểm',
      name: '',
    },
    {
      title: 'Xác thực email',
      name: 'isAuthEmail',
      type: "select",
      value: true,
      data: [
        {
          label: 'Đã xác thực',
          key: true
        },
        {
          label: 'Chưa xác thực',
          key: false
        }
      ]
    },
    {
      title: 'Trạng thái',
      name: 'isAccount',
      type: "select",
      value: true,
      data: [
        {
          label: 'Đã xác thực',
          key: true
        },
        {
          label: 'Chưa xác thực',
          key: false
        }
      ]
    },
  ];

  rowData: any;

  isExpand = false;

  constructor(
    private studentWaitingService: StudentWaitingService,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.studentWaitingService.getWaitingStudent().subscribe(res => {
      console.log((res as any).data)
      this.rowData = (res as any).data.users;
    })
  }

  handleFilterForm(event: any) {
    this.studentWaitingService.getWaitingStudent(event).subscribe(res => {
      this.rowData = (res as any).data.users;
    })
  }

  setExpand(event: any) {
    this.isExpand = event
  }

  takeCareUser(data: any) {
    this.studentWaitingService.takeCareStudent(data.id)
      .pipe(
        switchMap((res) => {
            this.message.success((res as any).messages)
            return this.studentWaitingService.getWaitingStudent()
        })
      )
      .subscribe(res => {
        this.rowData = (res as any).data.users;
      })
  }
}
