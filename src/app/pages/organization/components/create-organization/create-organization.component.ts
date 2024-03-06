import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationService} from "../../services/organization.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit{

  @ViewChild('inputWebsite') getInputElement!: ElementRef;

  isCreate = false;

  orgForm!: FormGroup;

  isSubmit = false;

  isActive = false;

  webData: string = '';

  organizationId!: number

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.orgForm = this.fb.group({
      name: ['', [Validators.required]],
      websiteCms: ['', [Validators.required]],
      website: [[], [Validators.required]],
      splitData: [0],
      email: ['', [Validators.email]],
      mobile: ['', [Validators.pattern('[0-9]{10,15}')]],
      status: [true]
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.organizationId = id;

        this.organizationService.getOrganizationById(id).subscribe({
          next: res => {
            if (res.success) {
              this.orgForm.patchValue(res.data.organization)
            }
          }
        })
      })
    }
  }

  changeActive(): void {
    this.isActive = true;

    if (this.isActive && this.webData.trim() !== '') {
      let data = [...this.orgForm.get('website')?.value]
      data.push(this.webData)
      this.orgForm.get('website')?.patchValue(data);
      this.webData = '';
      this.getInputElement.nativeElement.focus();
    }
  }

  deleteWeb(slug : string): void {
    let data = [...this.orgForm.get('website')?.value];
    data = data.filter(item => item !== slug);
    this.orgForm.get('website')?.patchValue(data);
  }

  editOrg() {
    this.isSubmit  = true;
    if (this.orgForm.valid) {
      const data = {
        ...this.orgForm.value,
        website: JSON.stringify(this.orgForm.get('website')?.value),
        status: this.orgForm.get('status')?.value ? 1 : 0,
      }
      if (this.isCreate) {
        this.organizationService.createOrganization(data).subscribe(
          {
            next: res => {
              if (res.success) {
                this.message.success('Tạo tổ chức thành công')
                this.navigateBack();
              } else {
                this.message.error(res.errorMessages)
              }
            },
            error: err => {}
          })
      } else {
        const orgData = {
          id: this.organizationId,
          ...data
        }
        this.organizationService.updateOrganization(orgData).subscribe({
          next: res => {
            if (res.success) {
              this.message.success('Cập nhật thông tin tổ chức thành công')
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages)
            }
          },
        })
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/organization/'])
  }
}
