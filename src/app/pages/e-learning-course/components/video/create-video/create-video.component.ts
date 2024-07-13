import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { VideoService } from "../../../services/video.service";
import { ChapterService } from "../../../services/chapter.service";

declare global {
  interface Window {
    imsPluginMedia: any;
  }
}
declare var IMSWidgetMedia: any;

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.scss']
})
export class CreateVideoComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.eCourseId = Number(this.route.snapshot.params['courseId']);

    this.videoForm = this.fb.group({
      title: ['', [Validators.required]],
      chapterId: [null, [Validators.required]],
      mediaPath: [null, [Validators.required]],
      duration: [0, [Validators.min(1)]],
      priority: [0],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
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

    // Sử dụng API của thư viện đã import từ CDN
    if (window.imsPluginMedia) {
      window.imsPluginMedia.initialize();
    }
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

  onSelectFile() {
    this.showPlugin();
  }

  private getTokenFunction(callback: (error: any, token: string | null) => void): void {
    this.videoService.getTokenPlugVod().subscribe(
      (token) => callback(null, token),  // Gọi callback với token khi thành công
      (error) => callback(error, null)   // Gọi callback với lỗi khi có lỗi
    );
  }

  private showPlugin(): void {
    if (typeof IMSWidgetMedia !== 'undefined') {
      IMSWidgetMedia.init({
        locale: 'vi',
        plugins: {
          name: 'media',
          options: {
            getTokenFunction: this.getTokenFunction.bind(this)
          },
          methods: {
            name: 'mediaManager',
            options: {
              callback: (arrMedia: any[]) => {
                  arrMedia.forEach((media) => {
                    this.videoForm.get('mediaPath')?.patchValue(media.src);
                  });
              }
            }
          }
        }
      });
    } else {
      console.error('IMSWidgetMedia is not defined. Make sure the script is loaded.');
    }
  }

  navigateBack() {
    this.router.navigate(['page/e-course/video/' + this.eCourseId + '/list']);
  }
}
