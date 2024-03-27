import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {WebConfigService} from "../../services/web-config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzTreeNodeOptions} from "ng-zorro-antd/tree";


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

  nodes :NzTreeNodeOptions[] = [
    {
      title: 'Home',
      key: '1',
      children: [
        {
          title: 'A',
          key: 'a',
          parentKey: '1'
        }
      ]
    },{
      title: 'About',
      key: '2',
    }
  ]
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
      facebookLink: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      youtubeLink: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      tiktokLink: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      zaloLink: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
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
