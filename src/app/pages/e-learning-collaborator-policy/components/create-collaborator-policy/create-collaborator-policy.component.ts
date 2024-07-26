import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {CollaboratorPolicyService} from "../../services/collaborator-policy.service";

@Component({
  selector: 'app-create-collaborator-policy',
  templateUrl: './create-collaborator-policy.component.html',
  styleUrls: ['./create-collaborator-policy.component.scss']
})
export class CreateCollaboratorPolicyComponent implements OnInit{
  @ViewChild('inputContent') getInputElement!: ElementRef;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  collaboratorPolicyForm!: FormGroup;
  collaboratorPolicyId!: number;

  isActive = false;
  webData: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private collaboratorPolicyService: CollaboratorPolicyService
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.collaboratorPolicyForm = this.fb.group({
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
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.collaboratorPolicyId = id;
        this.collaboratorPolicyService.getCollaboratorPolicyById(this.collaboratorPolicyId).subscribe({
          next: res => {
            if (res.success) {
              const data = {
                ...res.data,
                content: JSON.parse(res.data.content)
              }
              this.collaboratorPolicyForm.patchValue(data);
            }
          }
        })
      });
    }
  }

  changeActive(): void {
    this.isActive = true;
    if (this.isActive && this.webData.trim() !== '') {
      let data = [...this.collaboratorPolicyForm.get('content')?.value]
      data.push(this.webData)
      this.collaboratorPolicyForm.get('content')?.patchValue(data);
      this.webData = '';
      // this.getInputElement.nativeElement.focus();
    }
  }

  deleteContent(slug : string): void {
    let data = [...this.collaboratorPolicyForm.get('content')?.value];
    data = data.filter(item => item !== slug);
    this.collaboratorPolicyForm.get('content')?.patchValue(data);
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
    if (this.collaboratorPolicyForm.valid) {
      const data = {
        ...this.collaboratorPolicyForm.value,
      }

      if (this.isCreate) {
        this.collaboratorPolicyService.createCollaboratorPolicy(data).subscribe(
          {
            next: res => {
              if (res.success) {
                this.message.success('Tạo gói chính sách thành công');
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
          id: this.collaboratorPolicyId,
        }

        this.collaboratorPolicyService.updateCollaboratorPolicy(policyData).subscribe(
          {
            next: res => {
              if (res.success) {
                this.message.success('Cập nhật gói chính sách thành công');
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

  navigateBack():void {
    this.router.navigate(['/page/collaborator-policy']);
  }
}
