import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileManagerService} from "../../../../../shared/services/file-manager.service";
import {ForumCategoryService} from "../../../services/forum-category.service";
import {finalize, take} from "rxjs";
import {ForumConfig} from "../../../models/ForumConfig";

@Component({
  selector: 'app-forum-category-detail',
  templateUrl: './forum-category-detail.component.html',
  styleUrls: ['./forum-category-detail.component.scss']
})
export class ForumCategoryDetailComponent implements OnInit {
  forumCategoryForm!: FormGroup;
  forumCategoryId!: number;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private fileManagerService: FileManagerService,
    private forumCategoryService: ForumCategoryService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.forumCategoryId = Number(this.route.snapshot.params['id']);

    this.forumCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
      banner: [null, [Validators.required]],
      status: [1],
      number: [0],
      shortDescription: [null],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.forumCategoryId = id;
        this.forumCategoryService.getForumCategoryDetail(this.forumCategoryId).subscribe({
          next: res => {
            if (res.success) {
              this.forumCategoryForm.patchValue(res.data);
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        })
      });
    }
  }

  onSelectFile():void{
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.forumCategoryForm.get('banner')?.patchValue(data);
    });
  }

  edit():void {
    this.isSubmit = true;
    if (!this.forumCategoryForm.valid) return;


    const forumConfig: ForumConfig = {
      ...this.forumCategoryForm.value,
      status: this.forumCategoryForm.value.status? 1 : 0
    }

    this.loading = true;
    const actionForumCategory = this.isCreate
      ? this.forumCategoryService.createForumCategory(forumConfig)
      : this.forumCategoryService.updateForumCategory({ ...forumConfig, id: Number(this.forumCategoryId) });

    actionForumCategory
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
    });
  }

  navigateBack():void {
    // navigate đến trang danh sách
    this.router.navigate(['page/forum/category']).then();
  }
}
