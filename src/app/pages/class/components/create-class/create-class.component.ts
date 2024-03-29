import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ClassService} from "../../services/class.service";

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private classService: ClassService,
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.classForm = this.fb.group({
      name: [],
      attendanceProgramId: [],
      startTime: [],
      endTime: [],
      attendanceUrl: [],
    });
  }

  edit() {}

  navigateBack() {}
}