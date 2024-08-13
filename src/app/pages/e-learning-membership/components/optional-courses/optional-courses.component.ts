import {Component, OnInit} from '@angular/core';
import {MembershipService} from "../../services/membership.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-optional-courses',
  templateUrl: './optional-courses.component.html',
  styleUrls: ['./optional-courses.component.scss']
})
export class OptionalCoursesComponent implements OnInit{
  membershipId!: number;
  optionalCourseForm!: FormGroup;
  listCourseELearning!: [any];
  courseSelected!: string[];
  constructor(
    private membershipService: MembershipService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.optionalCourseForm = this.fb.group({
      maxSelectElearning: [null],
      listElearningId: [[]],
    });

    this.route.params.subscribe(params => {
      const {id} = params;
      this.membershipId = id;
    });
    this.membershipService.getOpCourseByMemId(this.membershipId).subscribe({
      next: res => {
        if (res.success) {
          this.listCourseELearning = res.data.listElearning;
          this.optionalCourseForm.patchValue(res.data);
        }
      }
    });
  }

  edit() {
    const opCourseData = {
      ...this.optionalCourseForm.value,
      memberPolicyLevelId: this.membershipId,
      listElearningId: this.courseSelected
    };

    this.membershipService.updateOpCourseByMemId(opCourseData).subscribe({
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

  navigateBack() {
    this.router.navigate(['/page/membership-policy']);
  }

  onSelectCourse(value: string[]): void {
    this.courseSelected = value;
  }
}
