import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {BusinessAccessService} from "../../../services/business-access.service";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-business-access-detail',
  templateUrl: './business-access-detail.component.html',
  styleUrls: ['./business-access-detail.component.scss']
})
export class BusinessAccessDetailComponent implements OnInit{
  accessForm!: FormGroup;
  accessId!: number;
  loading = false;
  constructor(
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private businessAccessService: BusinessAccessService,
  ) {}

  ngOnInit() {
    this.accessId = Number(this.route.snapshot.params['id']);
    this.accessForm = this.fb.group({
      homePage: [false],
      elearning: [false],
      forum: [false],
      retail: [false],
      collab: [false],
    });
    this.pathDataForm();
  }

  pathDataForm() {
    if (this.accessId) {
      this.businessAccessService.getBusinessAccessDetail(this.accessId).subscribe({
        next: res => {
          if (res.success) {
            this.accessForm.patchValue(res.data);
          } else {
            this.message.error(res.errorMessages);
          }
        },
        error: err => {
          this.message.error(err);
        }
      })
    }

  }

  edit() {
    const accessData = {
      ...this.accessForm.value,
      id: this.accessId
    }
    this.loading = true;
    this.businessAccessService.updateBusinessAccess(accessData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.message.success(res.messages);
            this.navigateBack();
          } else {
            this.message.error(res.errorMessages);
          }
        },
        error: (err) => {
          this.message.error(err);
        },
      })
  }

  navigateBack() {
    this.router.navigate(['/page/price-list/business-access/list']).then();
  }
}
