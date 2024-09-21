import {Injectable, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {VideoService} from "../../pages/e-learning-course/services/video.service";

declare global {
  interface Window {
    imsPluginMedia: any;
  }
}
declare var IMSWidgetMedia: any;
type CallbackFunction = (error: Error | null, response: string | null) => void;
@Injectable({
  providedIn: 'root'
})
export class VideoManagerService implements OnInit{
  selectedVideo = new Subject<string>();

  constructor(
    private videoService: VideoService,
  ) { }

  ngOnInit() {
    if (window.imsPluginMedia) {
      window.imsPluginMedia.initialize();
    }
  }

  getTokenFunction(callback: CallbackFunction): void {
    this.videoService.getTokenPlugVod().subscribe({
      next: (response) => {
        callback(null, response);
      },
      error: (error) => {
        console.log(error);
        callback(new Error("Lỗi lấy danh sách lưu trữ video!"), null);
      }
    });
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
                  this.selectedVideo.next(media.src);
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

  onSelectFile(): void {
    this.showPlugin();
  }
}
