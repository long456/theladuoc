import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {WebConfigService} from "../../../services/web-config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TreeNode} from "../../../../../shared/models/Tree";


@Component({
  selector: 'app-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss']
})
export class EditConfigComponent implements OnInit{

  configForm!: FormGroup;
  isSubmit = false;

  bgHeaderValue = 'Chọn màu';
  bgFooterValue = 'Chọn màu';

  configId = 0;

  nodes: TreeNode[] = [
    {
      name: 'Home',
      url: '',
      navCode: '',
      parentCode: '',
    },
    {
      name: 'About',
      url: '',
      navCode: '',
      parentCode: '',
      children: [
        {
          name: 'Permission',
          url: '',
          navCode: '',
          parentCode: '',
        }
      ]
    }
  ]

  regexUrl = '^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$';

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private webConfigService: WebConfigService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.configForm = this.fb.group({
      name: [null, [Validators.required]],
      headerLogo: [''],
      headerBackground: ['#ffffff'],
      footerLogo: [''],
      footerBackground: ['#ffffff'],
      copyright: [''],
      footerDescription: [],
      facebookLink: [null, Validators.pattern(this.regexUrl)],
      youtubeLink: [null, Validators.pattern(this.regexUrl)],
      tiktokLink: [null, Validators.pattern(this.regexUrl)],
      zaloLink: [null, Validators.pattern(this.regexUrl)],
    });

    this.route.params.pipe().subscribe(params => {
      const {id} = params;
      this.configId = id;

      this.patchValueForm(id);
    })
  }

  patchValueForm(id: number) {
    this.webConfigService.getWebConfigById(id).subscribe({
      next: res => {
        this.configForm.patchValue(res);
        this.bgHeaderValue = this.configForm.value.headerBackground;
        this.bgFooterValue = this.configForm.value.footerBackground;
      }
    })
  }

  edit() {
    this.isSubmit = true;
    if (this.configForm.valid) {
      this.webConfigService.updateWebConfig(this.configForm.value, this.configId).subscribe({
        next: res => {
          if (res.success) {
            this.message.success(res.messages);
            this.navigateBack();
          } else {
            this.message.error(res.errorMessages);
          }
        },
        error: err => {
          this.message.error(err.error);
        }
      })
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/website-config/config'])
  }

  active(element: any) {
    element.click()
  }

  onColorChange(e: any, type: 0 | 1): void {
    if (type) {
      this.bgHeaderValue = e.target.value
    } else {
      this.bgFooterValue = e.target.value
    }
  }

  editNavigation() {

  }
}
