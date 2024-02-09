import {Component, OnInit} from '@angular/core';
import {Student} from "../../models/student";

@Component({
  selector: 'app-waiting-student',
  templateUrl: './waiting-student.component.html',
  styleUrls: ['./waiting-student.component.scss']
})
export class WaitingStudentComponent implements OnInit{

  listOfColumn = [
    {
      title: 'Ngày đăng ký',
      colWith: '150px'
    },
    {
      title: 'Loại vé',
      colWith: '100px'
    },
    {
      title: 'Tên học viên',
      colWith: '180px'
    },
    {
      title: 'Số điện thoại',
      colWith: '120px'
    },
    {
      title: 'Email',
      colWith: '150px'
    },
    {
      title: 'Mã học viên',
      colWith: '180px'
    },
    {
      title: 'Người giới thiệu',
      colWith: '180px'
    },
    {
      title: 'Tên diễn giả',
      colWith: '180px'
    },
    {
      title: 'Tên khóa học',
      colWith: '180px'
    },
    {
      title: 'Số điểm',
      colWith: '130px'
    },
    {
      title: 'Xác thực email',
      colWith: '180px'
    },
    {
      title: 'Trạng thái',
      colWith: '180px'
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

  data: Student[] = [
    {
      id: '1',
      registrationDate: '17/01/2024',
      ticket: 'free',
      studentName: 'Hùng Nguyễn',
      phoneNumber: '0123456789',
      email: 'ht811@gmail.com',
      studentCode: 'ht811',
      presenter: 'Linh Nguyễn',
      creatorName: 'Linh Nguyễn',
      courseName: 'Khóa front-end',
      scores: '9',
      emailStatus: 'valid',
      userStatus: 'valid',
    },
    {
      id: '2',
      registrationDate: '24/01/2024',
      ticket: 'vip',
      studentName: 'Long Nguyễn',
      phoneNumber: '0123456789',
      email: 'long@gmail.com',
      studentCode: 'nnlong',
      presenter: 'Linh Nguyễn',
      creatorName: 'Linh Nguyễn',
      courseName: 'Khóa front-end',
      scores: '10',
      emailStatus: 'invalid',
      userStatus: 'valid',
    },
    {
      id:' 3',
      registrationDate: '28/01/2024',
      ticket: 'vip',
      studentName: 'Long Nguyễn',
      phoneNumber: '0123456789',
      email: 'long@gmail.com',
      studentCode: 'nnlong',
      presenter: 'Linh Nguyễn',
      creatorName: 'Linh Nguyễn',
      courseName: 'Khóa front-end',
      scores: '8',
      emailStatus: 'invalid',
      userStatus: 'invalid',
    },
    {
      id: '4',
      registrationDate: '10/01/2024',
      ticket: 'premium',
      studentName: 'Long Nguyễn',
      phoneNumber: '0123456789',
      email: 'long@gmail.com',
      studentCode: 'nnlong',
      presenter: 'Linh Nguyễn',
      creatorName: 'Linh Nguyễn',
      courseName: 'Khóa front-end',
      scores: '10',
      emailStatus: 'invalid',
      userStatus: 'invalid',
    }
  ];
}
