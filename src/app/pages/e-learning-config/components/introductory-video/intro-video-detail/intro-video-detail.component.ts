import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {IntroVideoService} from "../../../services/intro-video.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileManagerService} from "../../../../../shared/services/file-manager.service";
import {take} from "rxjs";
import {VideoManagerService} from "../../../../../shared/services/video-manager.service";

@Component({
  selector: 'app-intro-video-detail',
  templateUrl: './intro-video-detail.component.html',
  styleUrls: ['./intro-video-detail.component.scss']
})
export class IntroVideoDetailComponent implements OnInit{
  introVideoForm!: FormGroup;
  constructor(
    private router: Router,
    private message: NzMessageService,
    private introVideoService: IntroVideoService,
    private fb: FormBuilder,
    private fileManagerService: FileManagerService,
    private videoManagerService: VideoManagerService,
  ) {}

  ngOnInit():void{
    this.introVideoForm = this.fb.group({
      bannerVideoIntroElearning: [null],
      videoIntroElearning: [null],
    });
  }

  selectFile():void{
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.introVideoForm.get('bannerVideoIntroElearning')?.patchValue(data);
    });
  }

  selectVideoUrl():void{
    this.videoManagerService.onSelectFile();
    this.videoManagerService.selectedVideo.pipe(take(1)).subscribe((data) => {
      this.introVideoForm.get('videoIntroElearning')?.patchValue(data);
    });
  }

  edit():void{
    const introVid = {
      ...this.introVideoForm.value
    }
    this.introVideoService.updateConfigVideoIntro(introVid).subscribe({
      next: res => {
        if (!res.success) {
          throw new Error(res.errorMessages);
        }
        this.message.success(res.messages);
        this.navigateBack();
      },
      error: err => {
        this.message.error(err.message? err.message : 'Lỗi cập nhật video giới thiệu')
      }
    })
  }

  navigateBack():void{
    this.router.navigate(['page/e-learning-config/intro-video/list']);
  }
}
