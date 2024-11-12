import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePageConfig} from "../../models/HomePage-Config";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ELearningConfigService} from "../../services/config.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-home-page-config',
  templateUrl: './home-page-config.component.html',
  styleUrls: ['./home-page-config.component.scss']
})
export class HomePageConfigComponent implements OnInit{
  homePageConfig!: FormGroup;
  loading: boolean = false;

  configList =  [
    { name: 'SEO', value: 'seo' },
    { name: 'Ảnh banner', value: 'banner' },
    { name: 'Danh mục khóa học', value: 'courseCategory' },
    { name: 'Về chúng tôi', value: 'aboutUs' },
    { name: 'Các khóa học', value: 'listCourse' },
    { name: 'Video giới thiệu', value: 'introVideo' },
    { name: 'Sự kiện giáo dục', value: 'listEvent' },
    { name: 'Lời chứng thực', value: 'testimonial' },
    { name: 'Lý do lựa chọn', value: 'whyChooseUs' },
    { name: 'Tìm khóa học', value: 'findCourse' },
    { name: 'Tin tức', value: 'listPost' },
    { name: 'Câu hỏi thường gặp', value: 'faq' }
  ];

  currentConfig: string = this.configList[0].value;
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
    this.homePageConfig = this.fb.group({
      seo: this.fb.group({
        title: [null],
        desc: [null],
        keywords: [null],
        image: [null]
      }),
      banner: this.fb.group({
        backgroundBanner: [null],
        titleSmall: [null],
        title: [null],
        slogan: [null],
        isShowForm: [true],
        imageRight: [null],
      }),
      courseCategory: this.fb.group({
        backgroundImage: [null],
      }),
      aboutUs: this.fb.group({
        backgroundImage: [null],
        countStudent: [null],
        desc01: [null],
        desc02: [null],
        icon01: [null],
        icon02: [null],
        image01: [null],
        image02: [null],
        image03: [null],
        isShowButton: [true],
        subTitle01: [null],
        subTitle02: [null],
        title: [null],
      }),
      listCourse: this.fb.group({
        backgroundImage: [null],
      }),
      introVideo: this.fb.group({
        videoLink: [null],
        videoBanner: [null],
      }),
      listEvent: this.fb.group({
        backgroundImage: [null],
      }),
      testimonial: this.fb.group({
        backgroundImage: [null],
      }),
      whyChooseUs: this.fb.group({
        backgroundImage: [null],
        title: [null],
        desc: [null],
        icon01: [null],
        subTitle01: [null],
        subDesc01: [null],
        icon02: [null],
        subTitle02: [null],
        subDesc02: [null],

        iconStatistics01: [null],
        statistics01: [0],
        titleStatistics01: [null],
        iconStatistics02: [null],
        statistics02: [0],
        titleStatistics02: [null],
        iconStatistics03: [null],
        statistics03: [0],
        titleStatistics03: [null],
        iconStatistics04: [null],
        statistics04: [0],
        titleStatistics04: [null],
      }),
      findCourse: this.fb.group({
        backgroundImage: [null],
      }),
      listPost: this.fb.group({
        backgroundImage: [null],
      }),
      faq: this.fb.group({
        backgroundImage: [null],
        image01: [null],
        image02: [null],
        image03: [null],
      })
    })
  }

  pathDataForm(): void {
    this.eLearningConfigService.getHomeConfig().subscribe({
      next: res => {
        if (res.success) {
          this.homePageConfig.patchValue(res.data);
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err? err.message : 'Lỗi lấy cấu hình trang chủ');
      }
    })
  }

  edit(): void {
    const countStudent = this.homePageConfig.get('aboutUs.countStudent')?.value;
    this.homePageConfig.get('aboutUs.countStudent')?.setValue(countStudent.toString());
    const formData: HomePageConfig = this.homePageConfig.value;
    this.eLearningConfigService.updateHomeConfig(formData)
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
    this.router.navigate(['page/e-learning-config/list']);
  }

}
