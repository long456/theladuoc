import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit{
  isCreate: boolean = false;
  isSubmit: boolean = false;
  customerForm!: FormGroup;
  vnPhoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  customerCode!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.customerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null,[Validators.pattern(this.vnPhoneRegex)]],
      address: [null],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { code } = params;
        this.customerCode = code;

        this.customerService.getCustomerByCode(this.customerCode).subscribe({
          next: value => {
            if (value.success) {
              this.customerForm.patchValue(value.data);
            }
          }
        })
      });
    }
  }

  edit() {
    this.isSubmit = true;
    if (this.customerForm.valid) {
      const data = {
        ...this.customerForm.value
      }

      if (this.isCreate) {
        this.customerService.createCustomer(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success('Tạo khách hàng thành công');
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        })
      } else {
        delete data.email
        this.customerService.updateCustomer(data, this.customerCode).subscribe({
          next: res => {
            if (res.success) {
              this.message.success('Cập nhật thông tin khách hàng thành công');
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
  }

  navigateBack() {
    this.router.navigate(['/page/customer'])
  }
}
