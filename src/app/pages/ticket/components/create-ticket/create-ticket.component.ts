import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {TicketService} from "../../services/ticket.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../setting/services/course.service";

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit{

  isCreate = false;

  isSubmit = false;

  ticketForm!: FormGroup;

  ticketId = 0;

  listCourse: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.ticketForm = this.fb.group({
      name: [null, Validators.required],
      courseId: [null, [Validators.required]],
      price: [0],
      type: [],
      status: [1],
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.ticketId = id;
        this.ticketService.getTicketById(id).subscribe({
          next: res => {
            this.ticketForm.patchValue(res)
          },
          error: err => {
            this.message.error(err.error);
            this.navigateBack();
          }
        })
      })
    }

    this.courseService.getListCourse().subscribe(res => {
      this.listCourse = res;
    })
  }

  edit() {
    if (this.ticketForm.valid) {
      const data = {
        ...this.ticketForm.value,
        status: this.ticketForm.value.status? 1 : 0
      }
      if (this.isCreate) {
        this.ticketService.createTicket(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success('Tạo vé khóa học thành công')
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages)
            }
          }
        });
      } else {
        this.ticketService.updateTicketById(this.ticketId, data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages)
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages)
            }
          }
        })
      }
    }
  }

  navigateBack() {
    this.router.navigate(['page/setting/ticket'])
  }

  formatterVnd(value: number): string {
    return `${value} đ`
  }

  parserVnd(value: string): string {
    return value.replace(' đ', '');
  }

}
