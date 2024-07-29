import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {MembershipService} from "../../services/membership.service";
import {take} from "rxjs";
import {FileManagerService} from "../../../../shared/services/file-manager.service";

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

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.membershipPolicyId = id;
        this.membershipService.getMembershipById(this.membershipPolicyId).subscribe({
          next: res => {
            if (res.success) {
              const data = {
                ...res.data,
                content: JSON.parse(res.data.content)
              }
              this.membershipForm.patchValue(data);
            }
          }
        })
      });
    }
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
      const data = {
        ...this.membershipForm.value,
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
