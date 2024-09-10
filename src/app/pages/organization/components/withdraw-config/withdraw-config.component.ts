import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {WithdrawService} from "../../services/withdraw.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-withdraw-config',
  templateUrl: './withdraw-config.component.html',
  styleUrls: ['./withdraw-config.component.scss']
})
export class WithdrawConfigComponent implements OnInit{
  isSubmit: boolean = false;
  withdrawForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private withdrawService: WithdrawService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.withdrawForm = this.fb.group({
      withdrawMoneyType: [1],
      dayOfWeek: [2],
      dayOfMonth: [1],
      withdrawMoneyDesc: [null],
      minimumWithdrawLimit: [0,[Validators.min(1)]],
    });

    this.withdrawService.getWithdrawConfig().subscribe({
      next: res => {
        if (res.success) {
          this.withdrawForm.patchValue(res.data);
        }
      },
    })
  }

  formatterCurrency(value: number): string {
    return new Intl.NumberFormat().format(value);
  }

  edit(): void {
    this.isSubmit  = true;
    if (this.withdrawForm.valid) {
      const data = {
        ...this.withdrawForm.value,
      }

      this.withdrawService.updateWithdrawConfig(data).subscribe({
        next: res => {
          if (res.success) {
            this.message.success('Cập nhật cấu hình rút tiền thành công');
            this.navigateBack();
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

  navigateBack():void {
    this.router.navigate(['/page/organization']);
  }
}
