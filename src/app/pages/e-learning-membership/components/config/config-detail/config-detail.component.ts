import {Component, OnInit} from '@angular/core';
import {MembershipConfigService} from "../../../services/membership-config.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {finalize} from "rxjs";

@Component({
  selector: 'app-config-detail',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.scss']
})
export class ConfigDetailComponent implements OnInit{
  isSubmit: boolean = false;
  membershipConfigForm!: FormGroup;
  policyList: any[] = [];
  benefitList: any[] = [];
  editId: string | null = null;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private membershipConfigService: MembershipConfigService,
  ) {}

  ngOnInit() {
    this.membershipConfigForm = this.fb.group({
      numberDaysInactivity: [null],
      description: [null],
      isShowPriceMonth: [true],
      isShowPrice3Month: [true],
      isShowPriceYear: [true],
      isShowPriceForever: [true],
      referralPointType: [null,[Validators.required]],
      discountUpgradeType: [null,[Validators.required]]
    });
    this.membershipConfigService.getDetailMembershipConfig().subscribe({
      next: res => {
        if (res.success) {
          const dataConfig = {
            ...res.data.configPolicy,
            isShowPriceMonth: !!res.data.configPolicy.isShowPriceMonth,
            isShowPrice3Month: !!res.data.configPolicy.isShowPrice3Month,
            isShowPriceYear: !!res.data.configPolicy.isShowPriceYear,
            isShowPriceForever: !!res.data.configPolicy.isShowPriceForever,
          };
          this.membershipConfigForm.patchValue(dataConfig);
          this.policyList = [...res.data.memberPolicies];
          this.benefitList = [...res.data.configPolicy.objectBenefit];
          if (this.benefitList.length > 0 ) {
            this.addId();
          }
        }
      },
      error: err => {
        this.message.error(err);
      }
    });
  }

  addId(): void {
    let count = 0;
    this.benefitList = [...this.benefitList].map(item => {
      item.benefits.map((ele: any) => {
        ele['id'] = count;
        count++;
        return ele;
      });
      return item
    });
  }

  addBenefit(data: any, index: number): void {
    const benefit = {
      id: data.length + 1 + '.' + index,
      title: '',
      memberPolicyIds: [],
    };
    this.benefitList[index].benefits.push(benefit);
  }

  removeBenefit(i: number, ib: number): void{
    this.benefitList[i].benefits.splice(ib, 1);
  }

  addGroupBenefit(): void {
    const group = {
      name: '',
      benefits: [],
    }
    this.benefitList.push(group);
  }

  removeGroupBenefit(index: number): void {
    this.benefitList.splice(index, 1);
  }

  onChecked(id: number, data: any): void{
    const index = data.indexOf(id);
    if (index > -1) {
      data.splice(index, 1);
    } else {
      data.push(id);
    }
  }

  updateSingleChecked(id: number, data: any): boolean {
    return data.includes(id);
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  validGroupBenefit(): boolean{
    const validGroup = this.benefitList.every(item => item.name.trim() !== '');
    const validBenefit = this.benefitList.every(item => {
      return item.benefits.every((ele : any)  => ele.title.trim() !== '');
    });

    return !(!validGroup || !validBenefit);

  }

  edit() {
    this.isSubmit = true;

    if (!this.validGroupBenefit()) {
      this.message.error('Tên nhóm quyền lợi và tên quyền lợi không được để trống!');
      return;
    }

    if (this.membershipConfigForm.invalid) {
      return;
    }

    const configData = {
      ...this.membershipConfigForm.value,
      objectBenefit: this.benefitList
    };

    this.loading = true;
    this.membershipConfigService.updateMembershipConfig(configData).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
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
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/page/membership-policy/config/list']).then();
  }
}
