import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home-page-config',
  templateUrl: './home-page-config.component.html',
  styleUrls: ['./home-page-config.component.scss']
})
export class HomePageConfigComponent implements OnInit{
  homePageConfig!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm():void {
    this.homePageConfig = this.fb.group({
      seo: this.fb.group({
        title: [null, Validators.required],
        desc: [null, Validators.required],
        keywords: [null, Validators.required],
        image: [null, Validators.required]
      }),
      banner: this.fb.group({
        backgroundBanner: [null, Validators.required],
        titleSmall: [null, Validators.required],
        title: [null, Validators.required],
        slogan: [null, Validators.required],
        isShowForm: [null, Validators.required],
        imageRight: [null, Validators.required],
      }),
      courseCategory: this.fb.group({
        backgroundImage: [null, Validators.required],
      }),
      aboutUs: this.fb.group({
        backgroundImage: [null, Validators.required],
        image01: [null, Validators.required],
        image02: [null, Validators.required],
        image03: [null, Validators.required],
        countStudent: [null, Validators.required],
        title: [null, Validators.required],
        subTitle01: [null, Validators.required],
        desc01: [null, Validators.required],
        icon01: [null, Validators.required],
        subTitle02: [null, Validators.required],
        desc02: [null, Validators.required],
        icon02: [null, Validators.required],
        isShowButton: [true],
      }),
      listCourse: this.fb.group({
        backgroundImage: [null, Validators.required],
      }),
      introVideo: this.fb.group({
        videoLink: [null, Validators.required],
        videoBanner: [null, Validators.required],
      }),
      listEvent: this.fb.group({
        backgroundImage: [null, Validators.required],
      }),
      testimonial: this.fb.group({
        backgroundImage: [null, Validators.required],
      }),
      whyChooseUs: this.fb.group({
        backgroundImage: [null, Validators.required],
        title: [null, Validators.required],
        desc: [null, Validators.required],
        icon01: [null, Validators.required],
        subTitle01: [null, Validators.required],
        subDesc01: [null, Validators.required],
        icon02: [null, Validators.required],
        subTitle02: [null, Validators.required],
        subDesc02: [null, Validators.required],
      }),
      findCourse: this.fb.group({
        backgroundImage: [null, Validators.required],
      }),
      listPost: this.fb.group({
        backgroundImage: [null, Validators.required],
      }),
      fag: this.fb.group({
        backgroundImage: [null, Validators.required],
        image01: [null, Validators.required],
        image02: [null, Validators.required],
        image03: [null, Validators.required],
      })
    })
  }

  edit(): void {}

  navigateBack(): void {}
}
