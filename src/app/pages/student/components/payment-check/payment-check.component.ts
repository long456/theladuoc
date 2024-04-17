import {Component, inject, Input, OnInit} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";

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

  fileList: NzUploadFile[] = [];

  receiptImg!: any;

  nameFilePreview!: string;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      id: [null],
      ticketId: [null],
      name: [''],
      isPay: [0],
      price: [0],
      amountPaid: [0],
      receiptImage: [null]
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

  uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    this.nameFilePreview = files[0].name
    this.paymentForm.patchValue({ receiptImage: files[0] });
    this.paymentForm.get('file')?.updateValueAndValidity();
  }
}
