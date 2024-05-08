import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {LoyaltyService} from "../../services/loyalty.service";
import {CourseService} from "../../../setting/services/course.service";

@Component({
  selector: 'app-create-loyalty',
  templateUrl: './create-loyalty.component.html',
  styleUrls: ['./create-loyalty.component.scss']
})
export class CreateLoyaltyComponent implements OnInit{
  isCreate: boolean = false;
  isSubmit: boolean = false;

  loyaltyForm!: FormGroup;

  listCourse: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private loyaltyService: LoyaltyService,
    private courseService: CourseService,
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.loyaltyForm = this.fb.group({
      loyaltyName: ['', [Validators.required]],
      courseCode: ['', [Validators.required]],
      date: ['', [Validators.required]],
      isActive: [true],
    })

    this.courseService.getListCourse().subscribe(res => {
      this.listCourse = res;
    })
  }

  edit(): void {
    this.isSubmit = true;
    if (this.loyaltyForm.valid) {
      const data = {
        ...this.loyaltyForm.value,
        dateStart: this.loyaltyForm.value.date[0],
        dateEnd: this.loyaltyForm.value.date[1],
      }
      delete data.date;
      this.loyaltyService.createLoyalty(data).subscribe({
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

    }
  }

  navigateBack() {}
}
