import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ELearningConfigService} from "../../services/config.service";
import {filter, finalize} from "rxjs";
import {AboutUsConfig} from "../../models/AboutUSConfig";

@Component({
  selector: 'app-about-us-config',
  templateUrl: './about-us-config.component.html',
  styleUrls: ['./about-us-config.component.scss']
})
export class AboutUsConfigComponent implements OnInit{
  aboutUsConfig!: FormGroup;
  loading: boolean = false;

  configList =  [
    { name: 'SEO', value: 'seo' },
    { name: 'Ảnh banner', value: 'banner' },
    { name: 'Về chúng tôi', value: 'aboutUs' },
    { name: 'Dịch vụ', value: 'services' },
    { name: 'Sự kiện sắp tới', value: 'listEvent' },
    { name: 'Lý do lựa chọn', value: 'whyChooseUs' },
    { name: 'Đội ngũ giảng viên', value: 'teachers' },
    { name: 'Lời chứng thực', value: 'testimonial' },
    { name: 'Lời mời giảng viên', value: 'registerTeacher' },
    { name: 'Lời mời cộng tác viên', value: 'registerCollab' },
  ];
  currentConfig: string = this.configList[0].value;

  private fieldsToConvert = {
    aboutUs: ['countCourse'],
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private eLearningConfigService: ELearningConfigService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.pathDataForm();
  }

  initForm():void {
    this.aboutUsConfig = this.fb.group({
      seo: this.fb.group({
        title: [null],
        desc: [null],
        keywords: [null],
        image: [null]
      }),
      banner: this.fb.group({
        backgroundImage: [null],
      }),
      aboutUs: this.fb.group({
        backgroundImage: [null],
        image01: [null],
        image02: [null],
        countCourse: [null],
        title: [null],
        subTitle01: [null],
        desc01: [null],
        subTitle02: [null],
        desc02: [null],
      }),
      services: this.fb.group({
        backgroundImage: [null],
        title: [null],
        icon01: [null],
        subTitle01: [null],
        desc01: [null],
        backgroundColor01: ['#ffffff'],
        icon02: [null],
        subTitle02: [null],
        desc02: [null],
        backgroundColor02: ['#ffffff'],
        icon03: [null],
        subTitle03: [null],
        desc03: [null],
        backgroundColor03: ['#ffffff'],
        icon04: [null],
        subTitle04: [null],
        desc04: [null],
        backgroundColor04: ['#ffffff'],
      }),
      listEvent: this.fb.group({
        backgroundImage: [null],
        title: [null],
        desc: [null],
        image: [null],
        video: [null],
      }),
      whyChooseUs: this.fb.group({
        imageLeft: [null],
        backgroundImage: [null],
        title: [null],
        desc: [null],
        icon01: [null],
        subTitle01: [null],
        icon02: [null],
        subTitle02: [null],
        icon03: [null],
        subTitle03: [null],
        icon04: [null],
        subTitle04: [null],
      }),
      teachers: this.fb.group({
        backgroundImage: [null],
        title: [null],
        titleSmall: [null],
      }),
      testimonial: this.fb.group({
        backgroundImage: [null],
      }),
      registerTeacher: this.fb.group({
        backgroundImage: [null],
        image: [null],
      }),
      registerCollab: this.fb.group({
        backgroundImage: [null],
      })
    });

    this.setupValueConverters();
  }

  pathDataForm(): void {
    this.eLearningConfigService.getAboutUsConfig().subscribe({
      next: res => {
        if (res.success) {
          this.aboutUsConfig.patchValue(res.data);
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err? err.message : 'Lỗi lấy cấu hình trang giới thiệu');
      }
    })
  }

  private setupValueConverters(): void {
    Object.entries(this.fieldsToConvert).forEach(([sectionName, fields]) => {
      const section = this.aboutUsConfig.get(sectionName) as FormGroup;
      if (section) {
        fields.forEach(fieldName => {
          const control = section.get(fieldName);
          if (control) {
            control.valueChanges
              .pipe(
                filter(value => value !== null && value !== undefined)
              )
              .subscribe(value => {
                const stringValue = this.convertToString(value);
                if (stringValue !== value) {
                  control.patchValue(stringValue, { emitEvent: false });
                }
              });
          }
        });
      }
    });
  }

  private convertToString(value: any): string {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.join(',');
    return String(value);
  }

  edit() :void {
    const formData: AboutUsConfig = this.aboutUsConfig.value;
    this.eLearningConfigService.updateAboutUsConfig(formData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.message.success(res.messages);
            this.navigateBack();
          } else {
            this.message.error(res.errorMessages);
          }
        },
        error: (err) => {
          this.message.error(err);
        },
      })
  }

  navigateBack(): void {
    this.router.navigate(['page/e-learning-config/list']).then();
  }
}
