import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {FooterConfigService} from "../../../services/footer-config.service";


@Component({
  selector: 'app-edit-footer',
  templateUrl: './edit-footer.component.html',
  styleUrls: ['./edit-footer.component.scss']
})
export class EditFooterComponent implements OnInit{
  footerForm!: FormGroup;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  footerId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private footerConfigService: FooterConfigService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.footerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      no: [null],
      columnName: [null],
      websiteConfigId: [null],
      pageId: [null],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.footerId = id;

        this.footerConfigService.getFooterById(id).subscribe({
          next: res => {
            if (res) {
              this.footerForm.patchValue(res);
            }
          }
        })
      });
    }
  }

  edit(): void{
    this.isSubmit = true;
    if (this.footerForm.valid) {
      const pageFormData = {
        ...this.footerForm.value,
      }

      if (this.isCreate) {
        this.footerConfigService.createFooter(pageFormData).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
        });
      } else {
        this.footerConfigService.updateFooter(pageFormData, this.footerId).subscribe({
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
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/website-config/footer']);
  }
}
