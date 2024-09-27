import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileManagerService} from "../../../../../shared/services/file-manager.service";
import {ForumConfigService} from "../../../services/forum-config.service";
import {finalize, take} from "rxjs";
import {ForumConfig} from "../../../models/ForumConfig";

@Component({
  selector: 'app-forum-config-detail',
  templateUrl: './forum-config-detail.component.html',
  styleUrls: ['./forum-config-detail.component.scss']
})
export class ForumConfigDetailComponent implements OnInit {
  forumConfigForm!: FormGroup;
  forumConfigId!: number;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private fileManagerService: FileManagerService,
    private forumConfigService: ForumConfigService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.forumConfigId = Number(this.route.snapshot.params['id']);

    this.forumConfigForm = this.fb.group({
      name: [null, [Validators.required]],
      logo: [null, [Validators.required]],
      banner: [null, [Validators.required]],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.forumConfigId = id;
        this.forumConfigService.getForumConfigDetail(this.forumConfigId).subscribe({
          next: res => {
            if (res.success) {
              this.forumConfigForm.patchValue(res.data);
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

  onSelectFile(type: 'logo' | 'banner'):void{
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.forumConfigForm.get(type)?.patchValue(data);
    });
  }

  edit():void {
    this.isSubmit = true;
    if (!this.forumConfigForm.valid) return;

    const forumConfig: ForumConfig = {
      ...this.forumConfigForm.value,
      status: this.forumConfigForm.value.status? 1 : 0
    }

    this.loading = true;
    const actionForumConfig = this.isCreate
      ? this.forumConfigService.createForumConfig(forumConfig)
      : this.forumConfigService.updateForumConfig({ ...forumConfig, id: Number(this.forumConfigId) });

    actionForumConfig
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
    this.router.navigate(['page/forum/config']).then();
  }
}
