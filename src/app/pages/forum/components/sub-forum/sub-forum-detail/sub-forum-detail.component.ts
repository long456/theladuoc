import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileManagerService} from "../../../../../shared/services/file-manager.service";
import {SubForumService} from "../../../services/sub-forum.service";
import {finalize, take} from "rxjs";
import {ForumConfig} from "../../../models/ForumConfig";
import {SubForum} from "../../../models/SubForum";
import {ForumCategoryService} from "../../../services/forum-category.service";
import {ForumCategory} from "../../../models/ForumCategory";

@Component({
  selector: 'app-sub-forum-detail',
  templateUrl: './sub-forum-detail.component.html',
  styleUrls: ['./sub-forum-detail.component.scss']
})
export class SubForumDetailComponent implements OnInit{
  subForumForm!: FormGroup;
  subForumId!: number;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  loading = false;
  categoryData: ForumCategory[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private fileManagerService: FileManagerService,
    private subForumService: SubForumService,
    private forumCategoryService: ForumCategoryService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.subForumId = Number(this.route.snapshot.params['id']);

    this.subForumForm = this.fb.group({
      name: [null, [Validators.required]],
      banner: [null, [Validators.required]],
      description: [null, [Validators.required]],
      facebookLink: [null],
      instagramLink: [null],
      zaloLink: [null],
      twitterLink: [null],
      communityCategoryId: [null, [Validators.required]],
      status: [1],
    });

    this.getDataCategory();

    if (!this.isCreate) {
      this.patchDataForm();
    }
  }

  getDataCategory(): void {
    this.forumCategoryService.getAllForumCategory().subscribe({
      next: res => {
        this.categoryData = res;
      },
      error: err => {
        this.message.error(err);
      }
    })
  }

  patchDataForm(): void {
    this.route.params.pipe().subscribe(params => {
      const { id } = params;
      this.subForumId = id;
      this.subForumService.getSubForumDetail(this.subForumId).subscribe({
        next: res => {
          if (res.success) {
            this.subForumForm.patchValue(res.data);
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

  onSelectFile():void{
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.subForumForm.get('banner')?.patchValue(data);
    });
  }

  navigateBack():void {
    // navigate đến trang danh sách
    this.router.navigate(['page/forum/sub-forum']).then();
  }

  edit():void {
    this.isSubmit = true;
    if (!this.subForumForm.valid) return;


    const subForum: SubForum = {
      ...this.subForumForm.value,
      status: this.subForumForm.value.status? 1 : 0
    }

    this.loading = true;
    const actionSubForum = this.isCreate
      ? this.subForumService.createSubForum(subForum)
      : this.subForumService.updateSubForum({ ...subForum, id: Number(this.subForumId) });

    actionSubForum
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
}
