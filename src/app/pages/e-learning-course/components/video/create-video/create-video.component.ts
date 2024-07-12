import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {VideoService} from "../../../services/video.service";
import {ChapterService} from "../../../services/chapter.service";

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.scss']
})
export class CreateVideoComponent implements OnInit{
  isCreate: boolean = false;
  eCourseId!: number;
  videoForm!: FormGroup;
  isSubmit: boolean = false;
  videoId!: number;
  chapterList: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private videoService: VideoService,
    private chapterService: ChapterService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.eCourseId = Number(this.route.snapshot.params['courseId']);

    this.videoForm = this.fb.group({
      title: ['', [Validators.required]],
      chapterId: [null, [Validators.required]],
      mediaPath: [null],
      duration: [0, [Validators.min(1)]],
      priority: [0],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.videoId = id;
        this.videoService.getVideoById(this.videoId).subscribe({
          next: res => {
            if (res.success) {
              this.videoForm.patchValue(res.data);
            }
          }
        })
      });
    }

    this.chapterService.getChapterByCourse(this.eCourseId).subscribe(res => {
      if (res.success) {
        this.chapterList = res.data;
      }
    })
  }

  edit() {
    this.isSubmit = true;
    if (this.videoForm.valid) {
      const data = {
        ...this.videoForm.value,
        status: this.videoForm.get('status')?.value ? 1 : 0,
      };

      if (this.isCreate) {
        this.videoService.createVideo(data).subscribe({
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
      } else {
        data['videoId'] = this.videoId;
        this.videoService.updateVideo(data).subscribe({
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
    this.router.navigate(['page/e-course/video/' + this.eCourseId +'/list']);
  }
}
