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

  nameRefundImg!: string;
  imgRefundUrl!: string | ArrayBuffer | null | undefined;

  nameIdCardImg!: string;
  imgIdCardUrl!: string | ArrayBuffer | null | undefined;

  readonly nzModalData= inject(NZ_MODAL_DATA);
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.refundForm = this.fb.group({
      userAffId: [null],
      name: [null],
      type: [1],
      bankAccountFullName: [null],
      bankAccountNumber: [null],
      bankName: [null],
      amountPaid: [0],
      reasonContent: [null],
      requestImage: [null, [Validators.required]],
      cardImage: [null, [Validators.required]],
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

  blobToDataUrl(file: File, typeImg: 'refund' | 'card') {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeImg === 'refund') {
        this.imgRefundUrl = e.target?.result;
      } else {
        this.imgIdCardUrl = e.target?.result;
      }
    }

    reader.readAsDataURL(file)
  }

  uploadFile(e: Event, type: 'refund' | 'card') {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    if (type === 'refund') {
      this.nameRefundImg = files[0].name;
      this.pathDataImg(files[0],'refund');
    } else {
      this.nameIdCardImg = files[0].name;
      this.pathDataImg(files[0],'card');
    }
    this.blobToDataUrl(files[0], type);
  }

  onPasteImg(event: any, type: 'refund' | 'card') {
    const items = event.clipboardData.items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }
    if (blob !== null) {
      if (type === 'refund') {
        this.blobToDataUrl(blob, 'refund');
        this.pathDataImg(blob,'refund');
      } else {
        this.blobToDataUrl(blob, 'card');
        this.pathDataImg(blob,'card');
      }
    } else {
      this.message.error('Chưa có file nào được copy hoặc định dạng file copy không hợp lệ')
    }
  }

  pathDataImg(blob : any ,type:'refund' | 'card') {
    if (type === 'refund') {
      this.refundForm.patchValue({ requestImage: blob });
      this.refundForm.get('requestImage')?.updateValueAndValidity();
      this.nameRefundImg = blob.name;
    } else {
      this.refundForm.patchValue({ cardImage: blob });
      this.refundForm.get('cardImage')?.updateValueAndValidity();
      this.nameIdCardImg = blob.name;
    }
  }
}
