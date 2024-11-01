import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ForumNavigationService} from "../../../services/forum-navigation.service";
import {ForumConfig} from "../../../models/ForumConfig";
import {finalize} from "rxjs";
import {ForumNav} from "../../../models/ForumNav";

@Component({
  selector: 'app-navigation-detail',
  templateUrl: './navigation-detail.component.html',
  styleUrls: ['./navigation-detail.component.scss']
})
export class NavigationDetailComponent implements OnInit{
  forumNavForm!: FormGroup;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  navId!: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private forumNavigationService: ForumNavigationService
  ) {}

  ngOnInit(): void {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.navId = Number(this.route.snapshot.params['id']);
    this.forumNavForm = this.fb.group({
      no: [0],
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      columnName: [null, [Validators.required]],
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        this.forumNavigationService.getForumNavDetail(this.navId).subscribe({
          next: res => {
            if (res.success) {
              this.forumNavForm.patchValue(res.data);
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

  edit(): void{
    this.isSubmit = true;
    if (!this.forumNavForm.valid) return;


    const forumNav: ForumNav = {
      ...this.forumNavForm.value,
    }

    this.loading = true;
    const actionForumNav = this.isCreate
      ? this.forumNavigationService.createForumNav(forumNav)
      : this.forumNavigationService.updateForumNav({ ...forumNav, id: Number(this.navId) });

    actionForumNav
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

  navigateBack() {
    this.router.navigate(['/page/forum/nav-forum']);
  }
}
