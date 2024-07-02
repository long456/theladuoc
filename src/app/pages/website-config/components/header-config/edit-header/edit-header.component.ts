import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {HeaderConfigService} from "../../../services/header-config.service";
import {PageConfigService} from "../../../services/page-config.service";

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent implements OnInit{
  headerForm!: FormGroup;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  headerId!: number;
  listAllPage: any[] = [];
  listAllHeader: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private headerConfigService: HeaderConfigService,
    private pageConfigService: PageConfigService,
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.headerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      no: [0],
      navParentId: [null],
      websiteConfigId: [null],
      pageId: [null],
      status: [true],
      isDropdown: [true],
    });

    this.pageConfigService.getAllPage().subscribe({
      next: res => {
        if (res) {
          this.listAllPage = res;
        }
      }
    });

    this.headerConfigService.getAllHeader().subscribe({
      next: res => {
        if (res) {
          this.listAllHeader = res;
        }
      }
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.headerId = id;

        this.headerConfigService.getHeaderById(id).subscribe({
          next: res => {
            if (res) {
              this.headerForm.patchValue(res);
            }
          }
        })
      });
    }


  }

  edit(): void{
    this.isSubmit = true;
    if (this.headerForm.valid) {
      const pageFormData = {
        ...this.headerForm.value,
      }

      if (this.isCreate) {
        this.headerConfigService.createHeader(pageFormData).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        });
      } else {
        this.headerConfigService.updateHeader(pageFormData, this.headerId).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        });
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/website-config/header']);
  }
}
