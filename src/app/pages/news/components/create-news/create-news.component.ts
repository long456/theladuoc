import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NewsService} from "../../services/news.service";
import {FileManagerService} from "../../../../shared/services/file-manager.service";
import {take} from "rxjs";
import {config} from "../../../../shared/models/ckeditor";
import {NewsCategoryService} from "../../../news-category/services/news-category.service";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit{
  isCreate: boolean = false;
  isSubmit: boolean = false;
  newsForm!: FormGroup;
  newsId!: number;
  categoryList!: any[];
  ckEditorConfig: any = config;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private newsService: NewsService,
    private newsCategoryService: NewsCategoryService,
    private fileManagerService: FileManagerService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.newsForm = this.fb.group({
      title: [null,[Validators.required]],
      description: [null,[Validators.required]],
      content: [null,[Validators.required]],
      keyWords: [null],
      avatarImagePath: [null],
      showBys: [null],
      categories: [null],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.newsId = id;
        this.newsService.getNewsById(this.newsId).subscribe({
          next: res => {
            if (res.success)
              this.newsForm.patchValue(res.data);
          }
        })
      })
    }

    this.newsCategoryService.getAllCategory().subscribe(res => {
      if (res.success) {
        this.categoryList = res.data;
      }
    })
  }

  onSelectFile():void {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.newsForm.get('avatarImagePath')?.patchValue(data);
    });
  }

  edit():void {
    this.isSubmit = true;
    if (!this.newsForm.value.content) {
      this.message.error('Nội dung không được để trống');
      return
    }

    if (this.newsForm.valid) {
      const dataNews = {
        ...this.newsForm.value,
      }

      if (this.isCreate) {
        this.newsService.createNews(dataNews).subscribe({
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
        });
      } else {
        const updateNewsData = {
          ...dataNews,
          id: this.newsId,
        }
        this.newsCategoryService.updateNewsCategory(updateNewsData).subscribe({
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

  navigateBack():void {
    this.router.navigate(['/page/news']);
  }
}
