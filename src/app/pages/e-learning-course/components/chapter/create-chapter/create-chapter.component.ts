import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ChapterService} from "../../../services/chapter.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit{
  isCreate: boolean = false;
  eCourseId!: number;
  chapterForm!: FormGroup;
  isSubmit: boolean = false;
  chapterId!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private chapterService: ChapterService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.eCourseId = Number(this.route.snapshot.params['courseId']);

    this.chapterForm = this.fb.group({
      title: ['', [Validators.required]],
      priority: [0],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.chapterId = id;
        this.chapterService.getChapterById(this.chapterId).subscribe({
          next: res => {
            if (res.success) {
              this.chapterForm.patchValue(res.data);
            }
          }
        })
      });
    }
  }

  edit() {
    this.isSubmit = true;
    if (this.chapterForm.valid) {
      const data = {
        ...this.chapterForm.value,
        status: this.chapterForm.get('status')?.value ? 1 : 0,
      };
      if (this.isCreate) {
        data['elearningId'] = this.eCourseId;
        this.chapterService.createChapter(data).subscribe({
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
        data['chapterId'] = this.chapterId;
        this.chapterService.updateChapter(data).subscribe({
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
    this.router.navigate(['page/e-course/chapter/' + this.eCourseId +'/list']);
  }
}
