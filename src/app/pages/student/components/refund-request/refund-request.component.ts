import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-refund-request',
  templateUrl: './refund-request.component.html',
  styleUrls: ['./refund-request.component.scss']
})
export class RefundRequestComponent implements OnInit{
  refundForm!: FormGroup;
  isSubmit: boolean = false;
  readonly nzModalData= inject(NZ_MODAL_DATA);
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.refundForm = this.fb.group({
      userAffId: [null],
      name: [null],
      bankAccountFullName: [null],
      bankAccountNumber: [null],
      bankName: [null],
      amountPaid: [null, [Validators.required,Validators.min(1)]],
      reasonContent: [null],
    });

    this.refundForm.get('name')?.patchValue(this.nzModalData.name);
    this.refundForm.get('userAffId')?.patchValue(this.nzModalData.id);
  }

  formatterVnd(value: number): string {
    return value? `${value} VND` : ''
  }

  parserVnd(value: string): string {
    return value.replace(' VND', '');
  }
}
