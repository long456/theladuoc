import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ELearningConfigService} from "../../services/config.service";

@Component({
  selector: 'app-about-us-config',
  templateUrl: './about-us-config.component.html',
  styleUrls: ['./about-us-config.component.scss']
})
export class AboutUsConfigComponent implements OnInit{
  aboutUsConfig!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private eLearningConfigService: ELearningConfigService,
  ) {}

  ngOnInit() {
    this.initForm();
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
        backgroundColor01: [null],
        icon02: [null],
        subTitle02: [null],
        desc02: [null],
        backgroundColor02: [null],
        icon03: [null],
        subTitle03: [null],
        desc03: [null],
        backgroundColor03: [null],
        icon04: [null],
        subTitle04: [null],
        desc04: [null],
        backgroundColor04: [null],
      }),
      listEvent: this.fb.group({
        backgroundImage: [null],
        title: [null],
        desc: [null],
        image: [null],
        video: [null],
      })
    });
  }
}
