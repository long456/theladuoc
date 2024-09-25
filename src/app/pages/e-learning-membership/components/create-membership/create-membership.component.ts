import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {MembershipService} from "../../services/membership.service";
import {take} from "rxjs";
import {FileManagerService} from "../../../../shared/services/file-manager.service";
import {MembershipOption} from "../../models/MembershipOption";

@Component({
  selector: 'app-create-membership',
  templateUrl: './create-membership.component.html',
  styleUrls: ['./create-membership.component.scss']
})
export class CreateMembershipComponent implements OnInit{
  @ViewChild('inputContent') getInputElement!: ElementRef;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  membershipForm!: FormGroup;
  membershipPolicyId!: number;
  isActive = false;
  webData: string = '';
  membershipOpList: MembershipOption[] = [];
  membershipLevel: number = 0;
  lowestMemLv: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private membershipService: MembershipService,
    private fileManagerService: FileManagerService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.membershipForm = this.fb.group({
      name: [null, [Validators.required]],
      level: [1],
      priceMonth: [0],
      price3Month: [0],
      priceYear: [0],
      priceForever: [0],
      referrerReward: [0],
      referrerReward2: [0],
      isPopular: [true],
      content: [[]],
      icon: [null, [Validators.required]],
      status: [1],
    });

    this.getDataMemOp();

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.membershipPolicyId = id;
        this.membershipService.getMembershipById(this.membershipPolicyId).subscribe({
          next: res => {
            if (res.success) {
              this.membershipLevel = res.data.level;
              const data = {
                ...res.data,
                content: JSON.parse(res.data.content)
              }

              if (res.data.policyMapDiscount && res.data.policyMapDiscount.length > 0) {
                this.pathDiscountValue(res.data.policyMapDiscount);
              }

              this.membershipForm.patchValue(data);
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        })
      });
    }
  }

  getLowestLevel() {
    if (this.membershipOpList.length > 0) {
      const lowest = this.membershipOpList.reduce((previous, current) => {
        return current.level < previous.level ? current : previous;
      });
      return lowest.level;
    }
    return 0;
  }

  getDataMemOp():void {
    this.membershipService.getMemberPolicyOption().subscribe({
      next: res => {
        if (res.success) {
          this.membershipOpList = res.data.map((item: MembershipOption) => {
            return {
              ...item,
              discount: 0
            }
          });
          this.lowestMemLv = this.getLowestLevel();
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err);
      }
    });
  }

  pathDiscountValue(arrDiscount: any[]): void {
    const arrMemOp = this.membershipOpList.map(item1 => {
      const item2 = arrDiscount.find(item2 => item2.memberPolicyLevelId === item1.id);
      return { ...item1, discount: item2.discount };
    });

    this.membershipOpList =  arrMemOp
  }

  pathLevelValue(e: InputEvent) {
    this.membershipForm.get('level')?.patchValue(e);
  }

  changeActive(): void {
    this.isActive = true;
    if (this.isActive && this.webData.trim() !== '') {
      let data = [...this.membershipForm.get('content')?.value]
      data.push(this.webData)
      this.membershipForm.get('content')?.patchValue(data);
      this.webData = '';
      // this.getInputElement.nativeElement.focus();
    }
  }

  deleteContent(slug : string): void {
    let data = [...this.membershipForm.get('content')?.value];
    data = data.filter(item => item !== slug);
    this.membershipForm.get('content')?.patchValue(data);
  }

  formatterCurrency(value: number): string {
    return new Intl.NumberFormat().format(value);
  }

  formatterPercent(value: number): string {
    return new Intl.NumberFormat().format(value) + ' %';
  }

  parserPercent(value: string): string {
    return value.replace(' %', '');
  }

  edit() {
    this.isSubmit  = true;
    if (this.membershipForm.valid) {
      const discount = this.membershipOpList.map((item) => {
        return {
          memberPolicyLevelId: item.id,
          discount: item.discount
        }
      });
      const data = {
        ...this.membershipForm.value,
        status: this.membershipForm.value.status? 1 : 0,
        listDiscount: discount.length > 0 ? discount : null,
      }

      if (this.isCreate) {
        this.membershipService.createMembership(data).subscribe(
          {
            next: res => {
              if (res.success) {
                this.message.success('Tạo hạng thành viên thành công');
                this.navigateBack();
              } else {
                this.message.error(res.errorMessages)
              }
            },
            error: err => {}
          })
      } else {
        const policyData = {
          ...data,
          id: this.membershipPolicyId,
        }

        this.membershipService.updateMembership(policyData).subscribe(
          {
            next: res => {
              if (res.success) {
                this.message.success('Cập nhật hạng thành viên thành công');
                this.navigateBack();
              } else {
                this.message.error(res.errorMessages)
              }
            },
            error: err => {}
          })
      }
    }
  }

  selectFile() {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.membershipForm.get('icon')?.patchValue(data);
    });
  }

  navigateBack():void {
    this.router.navigate(['/page/membership-policy']);
  }
}
