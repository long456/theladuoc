import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListLessonComponent} from "./components/list-lesson/list-lesson.component";
import {ListAttendanceComponent} from "./components/list-attendance/list-attendance.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'lesson'
  },
  {
    path: 'lesson',
    component: ListLessonComponent
  },
  {
    path: 'attend',
    component: ListAttendanceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AttendanceRoutingModule {}
