import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {PaymentMethodService} from "../../../services/payment-method.service";
import {take} from "rxjs";
import {FileManagerService} from "../../../../../shared/services/file-manager.service";

@Component({
  selector: 'app-payment-method-create',
  templateUrl: './payment-method-create.component.html',
  styleUrls: ['./payment-method-create.component.scss']
})
export class PaymentMethodCreateComponent implements OnInit{
  isCreate: boolean = false;
  paymentMethodForm!: FormGroup;
  methodId!: number;
  listBankCode: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private paymentMethodService:PaymentMethodService,
    private fileManagerService: FileManagerService,
  ) {}

  ngOnInit(): void {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.paymentMethodForm = this.fb.group({
      type: [1],
      status: [1],
      bankName: [null, [this.requireValidator(1), this.requireValidator(4)]],
      bankNumber: [null, [this.requireValidator(1), this.requireValidator(4)]],
      bankUserName: [null, [this.requireValidator(1), this.requireValidator(4)]],
      bankQR: [null,this.requireValidator(1)],

      vnPayTmnCode: [null, [this.requireValidator(2)]],
      vnPayHashSecret: [null, [this.requireValidator(2)]],
      vnPayPaymentUrl: [null, [this.requireValidator(2)]],
      vnPayReturnUrl: [null, [this.requireValidator(2)]],

      baoKimApiKey: [null, [this.requireValidator(3)]],
      baoKimApiSecret: [null, [this.requireValidator(3)]],
      baoKimApiUrl: [null, [this.requireValidator(3)]],
      baoKimMerchantId: [null, [this.requireValidator(3)]],
      baoKimUrlSuccess: [null, [this.requireValidator(3)]],
      baoKimWebhooks: [null, [this.requireValidator(3)]],
      baoKimAudience: [null, [this.requireValidator(3)]],
    });
    this.getListBankCode();

    if (!this.isCreate) {
      this.pathValueForm();
    }

    this.paymentMethodForm?.get('type')?.valueChanges.subscribe((value) => {
      if (value === 4 ) {
        this.paymentMethodForm.get('bankQR')?.removeValidators(this.requireValidator(1));
      }

      if (value === 1) {
        this.paymentMethodForm.get('bankQR')?.addValidators(this.requireValidator(1));
      }
      this.paymentMethodForm.get('bankQR')?.reset();
      this.paymentMethodForm.updateValueAndValidity();
    })
  }

  pathValueForm():void {
    this.route.params.pipe().subscribe(params => {
      const {id} = params;
      this.methodId = id;
      this.paymentMethodService.getMethodById(this.methodId).subscribe({
        next: res => {
          if (res.success)
            this.paymentMethodForm.patchValue(res.data);
          else
            this.message.error(res.errorMessages);
        },
        error: err => {
          this.message.error(err);
        }
      });
    })
  }

  getListBankCode():void {
    this.paymentMethodService.getBankCode().subscribe({
      next: res => {
        if (res.code === '00') {
          this.listBankCode = res.data;
        }
      }
    })
  }

  onSelectFile():void {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.paymentMethodForm.get('bankQR')?.patchValue(data);
    });
  }

  requireValidator(type: 1|2|3|4): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const methodType = this.paymentMethodForm?.get('type')?.value
      if (methodType && methodType === type) {
        const requireValid = (control.value as string)?.trim() === '' || control.value === null
        return requireValid
          ? {requireValue: true}
          : null;
      }
      return null;
    }
  }

  edit(): void {
    this.paymentMethodForm.markAllAsTouched();
    if (!this.paymentMethodForm.valid) return;

    const dataMethod = { ...this.paymentMethodForm.value };
    const action = this.isCreate
      ? this.paymentMethodService.createMethod(dataMethod)
      : this.paymentMethodService.updateMethod({ ...dataMethod, id: Number(this.methodId) });

    action.subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success(res.messages);
          this.navigateBack();
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: (err) => {
        this.message.error(err.message);
      },
    });
  }

  navigateBack():void {
    this.router.navigate(['/page/payment/method']).then();
  }

  redirectSePay():void{
    const sePayUrl = 'https://sepay.vn?gcid=dhawwluo';
    window.open(sePayUrl, '_blank');
  }
}
