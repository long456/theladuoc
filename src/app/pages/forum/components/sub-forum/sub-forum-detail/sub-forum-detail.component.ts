import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileManagerService} from "../../../../../shared/services/file-manager.service";
import {SubForumService} from "../../../services/sub-forum.service";
import {debounceTime, distinctUntilChanged, finalize, of, Subject, switchMap, take} from "rxjs";
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
  listUserPolicyLevel: any[]=[];
  listUserRole: any[]=[];
  listOpAdmin: any[] = [];
  isFreeAllowed: boolean = false;
  // Tạo Subject để xử lý search admin
  searchSubject = new Subject<string>();
  // Đặt thành true để tắt việc filter local của ng-zorro
  nzFilterOption = () => true;

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
      avatar: [null, [Validators.required]],
      description: [null],
      facebookLink: [null],
      instagramLink: [null],
      zaloLink: [null],
      twitterLink: [null],
      communityCategoryId: [null, [Validators.required]],
      pined: [false],
      isFeature: [false],
      status: [1],
      userPolicyLevelAllowJoin: [null],
      userRoleAllowJoin: [null],
      adminIds: [null],
    });

    this.getDataCategory();

    if (!this.isCreate) {
      this.patchDataForm();
    }

    this.searchSubject
      .pipe(
        debounceTime(300), // Đợi 300ms sau mỗi lần nhập
        distinctUntilChanged(), // Chỉ gọi API khi giá trị thay đổi
        switchMap((searchText) => {
          if (searchText.trim().length === 0) {
            // Nếu không có text search, trả về mảng rỗng hoặc dữ liệu mặc định
            return of([]);
          }
          // Gọi API search
          return this.subForumService.getUserByString(searchText, this.subForumId);
        })
      )
      .subscribe({
        next: res => {
          if (res.success)
            this.listOpAdmin = res.data;
          else
            this.message.error(res.errorMessages);
        },
        error: err => {
          this.message.error(err);
        }
      })
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
            this.listUserPolicyLevel = res.data.userRoleAndUserPolicyLevel.listUserPolicyLevel;
            this.listUserRole = res.data.userRoleAndUserPolicyLevel.listUserRole;
            this.listOpAdmin = res.data.listAdmin;
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

  onSelectFile(type: 'banner' | 'avatar'):void{
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.subForumForm.get(type)?.patchValue(data);
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

  searchAdmin(value: string):void {
    this.searchSubject.next(value);
  }

  onValueChange(event: any, type: 'role' | 'policy') {
    if (type === "role")
      this.subForumForm.get('userRoleAllowJoin')?.patchValue(event);
    else
      this.subForumForm.get('userPolicyLevelAllowJoin')?.patchValue(event);
  }
}
