import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {SubForum} from "../../../../forum/models/SubForum";
import {CouponService} from "../../../services/coupon.service";
import {finalize} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss']
})
export class CreateCouponComponent implements OnInit {
  couponForm!: FormGroup;
  couponId!: number;

  isCreate: boolean = false;
  isSubmit: boolean = false;
  loading = false;

  datePipe = new DatePipe('en-US');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private couponService: CouponService
  ) {}

  ngOnInit(): void {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.couponId = Number(this.route.snapshot.params['id']);

    this.couponForm = this.fb.group({
      code: [null, [Validators.required]],
      discountAmount: [0, [Validators.min(1)]],
      discountType: [1],
      expirationDate: [null],
      minimumOrder: [null],
      maximumPriceDiscount: [null],
      isPublic: [true],
      status: [1],
    })

    if (!this.isCreate) {
      this.patchDataForm();
    }
  }

  patchDataForm():void {
    this.route.params.pipe().subscribe(params => {
      const { id } = params;
      this.couponId = id;

      this.couponService.getCouponById(id).subscribe({
        next: res => {
          if (res.success) {
            this.couponForm.patchValue(res.data);
          }
        },
        error: err => {
          this.message.error(err);
        }
      })
    })
  }

  edit():void {
    if (!this.couponForm.valid) return;

    const coupon = {
      ...this.couponForm.value,
      status: this.couponForm.value.status? 1 : 0,
      expirationDate: this.datePipe.transform(this.couponForm.value.expirationDate, 'dd/MM/YYYY'),
    }
    this.loading = true;
    const actionCouponForum = this.isCreate
      ? this.couponService.createCoupon(coupon)
      : this.couponService.updateCoupon(coupon,Number(this.couponId));

    actionCouponForum
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
      });
  }

  navigateBack():void {
    this.router.navigate(['page/promotion/coupon']).then();
  }

  formatterCurrency(value: number): string {
    return new Intl.NumberFormat().format(value);
  }

}
