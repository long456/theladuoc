import {Component, Input} from '@angular/core';
import {MenuItem} from "../../models/MenuItem";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  constructor(
    private router: Router,
  ) {
  }
  isCollapsed: boolean = false;

  treeMenu: MenuItem[] = [
    {
      name : 'Báo cáo',
      icon: 'bar-chart',
      link: '',
      children: [
        {
          name : 'Tăng trưởng',
          icon: '',
          link: '',
        },
      ]
    },
    {
      name : 'Vận hành',
      icon: 'reconciliation',
      link: '',
      children: [
        {
          name : 'Học viên',
          icon: '',
          link: '',
          children: [
            {
              name : 'Chưa chia',
              icon: '',
              link: 'page/student/none-divide',
            },
            {
              name : 'Đang chờ',
              icon: '',
              link: 'page/student/waiting',
            },
            {
              name : 'Đang chăm',
              icon: '',
              link: 'page/student/take-care',
            },
            {
              name : 'Đang học',
              icon: '',
              link: 'page/student/studying',
            },
            {
              name : 'Referral',
              icon: '',
              link: '',
            },
          ]
        },
        {
          name : 'Nhân viên',
          icon: '',
          link: '',
        },
      ]
    },
    {
      name : 'Thiết lập',
      icon: 'setting',
      link: '',
      children: [
        {
          name : 'Tổ chức',
          icon: '',
          link: 'page/organization',
        },
        {
          name : 'Tính năng',
          icon: '',
          link: '',
          children: [
            {
              name : 'Nhóm quyền',
              icon: '',
              link: 'page/setting/permission',
            },
            {
              name : 'Khóa học',
              icon: '',
              link: 'page/setting/course',
            },
            {
              name : 'Website',
              icon: '',
              link: '',
              children: [
                {
                  name : 'Header & Footer',
                  icon: '',
                  link: 'page/setting/website/list-layouts',
                },
              ]
            },
            {
              name : 'Landing page',
              icon: '',
              link: 'page/setting/landing-page',
            },
            {
              name : 'Vé khóa học',
              icon: '',
              link: 'page/setting/ticket',
            },
            {
              name : 'Form đăng ký',
              icon: '',
              link: 'page/setting/register-form',
            },
          ]
        },
      ]
    },
  ]

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  // navigate(link : any) {
  //   console.log(link)
  //   this.router.navigateByUrl('page/student/waiting');
  // }
}
