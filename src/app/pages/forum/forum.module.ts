import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForumRoutingModule} from "./forum-routing.module";
import { ForumConfigComponent } from './components/config/forum-config/forum-config.component';
import { ForumConfigDetailComponent } from './components/config/forum-config-detail/forum-config-detail.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { ForumCategoryListComponent } from './components/category/forum-category-list/forum-category-list.component';
import { ForumCategoryDetailComponent } from './components/category/forum-category-detail/forum-category-detail.component';
import { SubForumListComponent } from './components/sub-forum/sub-forum-list/sub-forum-list.component';
import { SubForumDetailComponent } from './components/sub-forum/sub-forum-detail/sub-forum-detail.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzDividerModule} from "ng-zorro-antd/divider";

@NgModule({
  declarations: [
    ForumConfigComponent,
    ForumConfigDetailComponent,
    ForumCategoryListComponent,
    ForumCategoryDetailComponent,
    SubForumListComponent,
    SubForumDetailComponent
  ],
    imports: [
        CommonModule,
        ForumRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzSelectModule,
        NzInputNumberModule,
        NzCheckboxModule,
        FormsModule,
        NzDividerModule,
    ]
})
export class ForumModule { }
