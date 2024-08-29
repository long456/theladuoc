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
  isSubmit: boolean = false;
  paymentMethodForm!: FormGroup;
  methodId!: number;
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
      bankName: [null, [this.requireValidator(1)]],
      bankNumber: [null, [this.requireValidator(1)]],
      bankUserName: [null, [this.requireValidator(1)]],
      bankQR: [null, [this.requireValidator(1)]],

      vnPayTmnCode: [null, [this.requireValidator(2)]],
      vnPayHashSecret: [null, [this.requireValidator(2)]],
      vnPayPaymentUrl: [null, [this.requireValidator(2)]],
      vnPayReturnUrl: [null, [this.requireValidator(2)]],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.methodId = id;
        this.paymentMethodService.getMethodById(this.methodId).subscribe({
          next: res => {
            if (res.success)
              this.paymentMethodForm.patchValue(res.data);
          }
        });
      })
    }
  }

  onSelectFile():void {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.paymentMethodForm.get('bankQR')?.patchValue(data);
    });
  }

  requireValidator(type: 1|2): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.paymentMethodForm?.value?.type === type) {
        const requireValid = (control.value as string)?.trim() === '' || control.value === null
        return requireValid
          ? {requireValue: true}
          : null;
      }
      return null;
    }
  }

  edit(): void {
    this.isSubmit = true;
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
    this.router.navigate(['/page/payment/method']);
  }
}
