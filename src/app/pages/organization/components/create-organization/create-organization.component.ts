import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationService} from "../../services/organization.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileManagerService} from "../../../../shared/services/file-manager.service";
import {take} from "rxjs";
import {config} from "../../../../shared/models/ckeditor";

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit{

  // @ViewChild('inputWebsite') getInputElement!: ElementRef;

  isCreate = false;
  orgForm!: FormGroup;
  isSubmit = false;
  isActive = false;
  webData: string = '';
  organizationId!: number
  listDirectors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private message: NzMessageService,
    private fileManagerService: FileManagerService,
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.orgForm = this.fb.group({
      name: ['', [Validators.required]],
      websiteCms: ['', [Validators.required]],
      websiteElearning: [''],
      websiteForum: [''],
      website: [null, [Validators.required]],
      splitData: [1],
      userId: [null],
      email: ['', [Validators.email]],
      mobile: ['', [Validators.pattern('[0-9]{10,15}')]],
      logo: [null],
      logo1x1: [null],
      favicon: [null],
      status: [true],
      address: [null],
      map: [null]
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.organizationId = id;

        this.organizationService.getOrganizationById(id).subscribe({
          next: res => {
            if (res.success) {
              this.orgForm.patchValue(res.data.organization);
              this.listDirectors = res.data.directors;
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
      // this.getInputElement.nativeElement.focus();
    }
  }

  deleteWeb(slug : string): void {
    let data = [...this.orgForm.get('website')?.value];
    data = data.filter(item => item !== slug);
    this.orgForm.get('website')?.patchValue(data);
  }

  editOrg() {
    this.isSubmit  = true;
    console.log(this.orgForm)
    if (this.orgForm.valid) {
      const data = {
        ...this.orgForm.value,
        status: this.orgForm.get('status')?.value ? 1 : 0,
      }
      console.log(data)
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
              this.message.success('Cập nhật thông tin tổ chức thành công');
              localStorage.setItem('org', JSON.stringify(res.data));
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages)
            }
          },
        })
      }
    }
  }

  // handleDataOrgUpdate():void {
  //   this.organizationService.getInfoOrganization().subscribe({
  //     next: res => {
  //       if (res.success) {
  //         localStorage.setItem('org', JSON.stringify(res.data));
  //       }
  //     }
  //   });
  // }

  selectFile(typeImg: string) {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      switch (typeImg) {
        case ('logo') :
          this.orgForm.get('logo')?.patchValue(data);
          break;
        case ('logo1x1') :
          this.orgForm.get('logo1x1')?.patchValue(data);
          break;
        case ('favicon') :
          this.orgForm.get('favicon')?.patchValue(data);
          break;
      }
    });
  }

  deleteImg(type: 'logo' | 'logo1x1' | 'favicon'): void {
    switch (type) {
      case ('logo') :
        this.orgForm.get('logo')?.patchValue('');
        break;
      case ('logo1x1') :
        this.orgForm.get('logo1x1')?.patchValue('');
        break;
      case ('favicon') :
        this.orgForm.get('favicon')?.patchValue('');
        break;
    }
  }

  navigateBack() {
    this.router.navigate(['/page/organization/']).then(() => {
      location.reload();
    })
  }
}
