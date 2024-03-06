import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './components/permissions/permission/permission.component';
import {SetupRoutingModules} from "./setup-routing.modules";
import {SharedModule} from "../../shared/shared.module";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CreatePermissionComponent } from './components/permissions/create-permission/create-permission.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ListPermisionComponent } from './components/permissions/list-permision/list-permision.component';
import { CourseComponent } from './components/courses/course/course.component';
import { ListCourseComponent } from './components/courses/list-course/list-course.component';
import { CreateCourseComponent } from './components/courses/create-course/create-course.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {NzCollapseModule} from "ng-zorro-antd/collapse";

@NgModule({
  declarations: [
    PermissionComponent,
    CreatePermissionComponent,
    ListPermisionComponent,
    CourseComponent,
    ListCourseComponent,
    CreateCourseComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModules,
    SharedModule,
    NzModalModule,
    NzCheckboxModule,
    FormsModule,
    NzSwitchModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCollapseModule
  ]
})
export class SettingModule { }
