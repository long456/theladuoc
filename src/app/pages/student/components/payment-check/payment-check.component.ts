import {Component, inject, Input, OnInit} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-payment-check',
  templateUrl: './payment-check.component.html',
  styleUrls: ['./payment-check.component.scss']
})
export class PaymentCheckComponent implements OnInit{
  @Input() studentData?: any

  readonly #modal = inject(NzModalRef);
  readonly nzModalData= inject(NZ_MODAL_DATA);

  paymentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      id: [null],
      name: [''],
      isPay: [0],
      price: [0],
    })
    if (this.nzModalData.studentData.price === null) {
      this.nzModalData.studentData.price = 0
    }
    this.paymentForm.patchValue(this.nzModalData.studentData)
  }

  formatterVnd(value: number): string {
    return `${value} VND`
  }

  parserVnd(value: string): string {
    return value.replace(' VND', '');
  }
}
