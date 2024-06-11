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
          name : 'Xác thực thanh toán',
          icon: '',
          link: 'page/payment-auth',
        },
        {
          name : 'Điểm danh',
          icon: '',
          link: 'page/attendance',
        },
        {
          name : 'Nhân sự',
          icon: '',
          link: '',
          children: [
            {
              name : 'Trao quyền',
              icon: '',
              link: 'page/staff',
            }
          ],
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
              name : 'Referral',
              icon: '',
              children: [
                {
                  name : 'Cuộc thi tính điểm',
                  icon: '',
                  link: 'page/setting/referral/loyalty',
                },
                {
                  name : 'Tri ân học viên',
                  icon: '',
                  link: '',
                },
              ]
            },
            {
              name : 'Website',
              icon: '',
              link: '',
              children: [
                {
                  name : 'Header & Footer',
                  icon: '',
                  link: 'page/setting/website-config/config',
                },
              ]
            },
            {
              name : 'Phễu khóa học',
              icon: '',
              link: '',
              children: [
                {
                  name : 'Khóa học',
                  icon: '',
                  link: 'page/setting/course',
                },
                {
                  name : 'Lớp học',
                  icon: '',
                  link: 'page/setting/class',
                },
                {
                  name : 'Buổi học',
                  icon: '',
                  link: 'page/setting/lesson',
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
            {
              name : 'E-learning',
              icon: '',
              link: '',
              children: [
                {
                  name : 'Danh mục khóa học',
                  icon: '',
                  link: 'page/setting/ticket',
                },
              ]
            },
            {
              name : 'Email SMTP',
              icon: '',
              link: 'page/setting/email-account',
            },
            {
              name : 'Email',
              icon: '',
              children: [
                // {
                //   name : 'Email hệ thống',
                //   icon: '',
                //   link: 'page/setting/email/system-email',
                // },
                {
                  name : 'Email thông báo',
                  icon: '',
                  link: 'page/setting/email/notifications-email',
                },
              ]
            },
            {
              name : 'Ấn phẩm',
              icon: '',
              link: 'page/setting/publication',
            },
            {
              name : 'Sản phẩm',
              icon: '',
              link: '',
              children: [
                {
                  name : 'Danh sách sản phẩm',
                  icon: '',
                  link: 'page/setting/product',
                },
                {
                  name : 'Danh sách kho hàng',
                  icon: '',
                  link: 'page/setting/warehouse',
                },
              ]
            }
          ]
        },
      ]
    },
  ]

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
