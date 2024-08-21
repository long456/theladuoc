import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NewsCategoryService} from "../../services/news-category.service";

@Component({
  selector: 'app-create-news-category',
  templateUrl: './create-news-category.component.html',
  styleUrls: ['./create-news-category.component.scss']
})
export class CreateNewsCategoryComponent implements OnInit{
  isCreate: boolean = false;
  isSubmit: boolean = false;
  newsCategoryForm!: FormGroup;
  newsCategoryId!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private newsCategoryService: NewsCategoryService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.newsCategoryForm = this.fb.group({
      title: [null,[Validators.required]],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.newsCategoryId = id;
        this.newsCategoryService.getNewsCategoryById(this.newsCategoryId).subscribe({
          next: res => {
            if (res.success)
              this.newsCategoryForm.patchValue(res.data);
          }
        })
      })
    }
  }

  edit() {
    this.isSubmit = true;
    if (this.newsCategoryForm.valid) {
      const dataCategory = {
        ...this.newsCategoryForm.value,
      }

      if (this.isCreate) {
        this.newsCategoryService.createNewsCategory(dataCategory).subscribe({
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
        const updateCategoryData = {
          ...dataCategory,
          id: this.newsCategoryId,
        }
        this.newsCategoryService.updateNewsCategory(updateCategoryData).subscribe({
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
    this.router.navigate(['/page/news-category']);
  }
}
