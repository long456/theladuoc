import {Component, OnInit} from '@angular/core';
import {MembershipConfigService} from "../../../services/membership-config.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-config-detail',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.scss']
})
export class ConfigDetailComponent implements OnInit{
  membershipConfigForm!: FormGroup;
  policyList: any[] = [];
  benefitList: any[] = [];
  editId: string | null = null;
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
    });
    this.membershipConfigService.getDetailMembershipConfig().subscribe({
      next: res => {
        if (res.success) {
          this.membershipConfigForm.patchValue(res.data.configPolicy);
          this.policyList = [...res.data.memberPolicies];
          this.benefitList = [...res.data.configPolicy.objectBenefit];
          if (this.benefitList.length > 0 ) {
            this.addId();
          }
        }
      }
    });
  }

  addId(): void {
    let count = 0;
    let data = [...this.benefitList].map(item => {
      item.benefits.map((ele: any) => {
        ele['id'] = count;
        count++;
        return ele;
      });
      return item
    });

    this.benefitList = data;
  }

  addBenefit(data: any, index: number): void {
    const benefit = {
      id: data.length + 1 + '.' + index,
      title: '',
      memberPolicyIds: [],
    };
    this.benefitList[index].benefits.push(benefit);
    console.log(this.benefitList)
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

    if (!validGroup || !validBenefit ) {
      return false;
    }
    return true;
  }

  edit() {
    const validGroupBenefit = this.validGroupBenefit();
    if (!validGroupBenefit) {
      this.message.error('Tên nhóm quyền lợi và tên quyền lợi không được để trống!');
      return;
    }

    const configData = {
      ...this.membershipConfigForm.value,
      objectBenefit: this.benefitList
    };
    this.membershipConfigService.updateMembershipConfig(configData).subscribe({
      next: res => {
        if (res.success) {
          this.message.success(res.messages);
          this.navigateBack();
        } else {
          this.message.error(res.errorMessages);
        }
      },
    });
  }

  navigateBack() {
    this.router.navigate(['/page/membership-policy/config/list']);
  }
}
