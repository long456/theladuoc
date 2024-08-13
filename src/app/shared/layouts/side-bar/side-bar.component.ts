import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from "../../models/MenuItem";
import { Router } from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  isCollapsed: boolean = false;

  dataOrg!: any;

  treeMenu: MenuItem[] = [
    {
      name: 'Báo cáo',
      icon: 'bar-chart',
      link: '',
      children: [
        {
          name: 'Tăng trưởng',
          icon: '',
          link: '',
        },
        {
          name: 'Hiệu quả khóa học',
          icon: '',
          link: '',
          children: [
            {
              name: 'Phễu Khóa học',
              icon: '',
              link: '',
              children: [
                {
                  name: 'Khóa học phễu',
                  icon: '',
                  link: 'page/report/report-funnel-course',
                },
                {
                  name: 'Khóa học lớn',
                  icon: '',
                  link: 'page/report/report-big-course',
                }
              ]
            },
            {
              name: 'E-learning',
              icon: '',
              link: '',
              children: [
                {
                  name: 'Khóa học miễn phí',
                  icon: '',
                  link: 'page/report/report-free-course',
                },
                {
                  name: 'Khóa học thành viên',
                  icon: '',
                  link: 'page/report/report-member-course',
                },
                {
                  name: 'Khóa học trả phí',
                  icon: '',
                  link: 'page/report/report-paid-course',
                },
                {
                  name: 'Khóa học cộng tác viên',
                  icon: '',
                  link: 'page/report/report-collaborator-course',
                },
                {
                  name: 'Khóa học giảng viên',
                  icon: '',
                  link: 'page/report/report-instructor-course',
                }
              ]
            },
          ]
        },
        {
          name: 'Hiệu quả nhân sự',
          icon: '',
          link: '',
          children: [
            {
              name: 'Diễn giả',
              icon: '',
              link: 'page/report/report-speaker',
            },
            {
              name: 'Nhân viên sales',
              icon: '',
              link: 'page/report/report-sales-staff',
            }
          ]
        }
      ]
    },
    {
      name: 'Vận hành',
      icon: 'reconciliation',
      link: '',
      children: [
        {
          name: 'Học viên',
          icon: '',
          link: '',
          children: [
            {
              name: 'Chưa chia',
              icon: '',
              link: 'page/student/none-divide',
            },
            {
              name: 'Đang chờ',
              icon: '',
              link: 'page/student/waiting',
            },
            {
              name: 'Đang chăm',
              icon: '',
              link: 'page/student/take-care',
            },
            {
              name: 'Đang học',
              icon: '',
              link: 'page/student/studying',
            },
            {
              name: 'Referral',
              icon: '',
              link: '',
            },
          ]
        },
        {
          name: 'Xác thực thanh toán',
          icon: '',
          link: 'page/payment/auth',
        },
        {
          name: 'Yêu cầu hoàn tiền',
          icon: '',
          link: 'page/payment/refund',
        },
        {
          name: 'Điểm danh',
          icon: '',
          link: '',
          children: [
            {
              name: 'Danh sách buổi học',
              icon: '',
              link: 'page/attendance/lesson',
            },
            {
              name: 'Danh sách điểm danh',
              icon: '',
              link: 'page/attendance/attend',
            }
          ]
        },
        {
          name: 'E-learning',
          icon: '',
          link: '',
          children: [
            {
              name: 'Chưa chia',
              icon: '',
              link: 'page/e-learning-student/none-divide',
            },
            {
              name: 'Đang chờ',
              icon: '',
              link: 'page/e-learning-student/waiting',
            },
            {
              name: 'Đang chăm',
              icon: '',
              link: 'page/e-learning-student/take-care',
            },
            {
              name: 'Đang học',
              icon: '',
              link: 'page/e-learning-student/studying',
            },
            {
              name: 'Đăng ký khóa học',
              icon: '',
              link: 'page/e-learning-student/register',
            },
          ]
        },
        {
          name: 'Nghiệp vụ kế toán',
          icon: '',
          link: '',
          children: [
            {
              name: 'Xác thực thanh toán',
              icon: '',
              link: '/',
            },
            {
              name: 'Yêu cầu hoàn tiền',
              icon: '',
              link: '/',
            },
            {
              name: 'Lịch sử thanh toán',
              icon: '',
              link: 'page/transaction-history',
            },
          ],
        },
        {
          name: 'Yêu cầu liên hệ',
          icon: '',
          link: 'page/guests',
        },
        {
          name: 'Nhân sự',
          icon: '',
          link: '',
          children: [
            {
              name: 'Trao quyền',
              icon: '',
              link: 'page/staff',
            }
          ],
        },
      ]
    },
    {
      name: 'Thiết lập',
      icon: 'setting',
      link: '',
      children: [
        {
          name: 'Tổ chức',
          icon: '',
          link: 'page/organization',
        },
        {
          name: 'Tính năng',
          icon: '',
          link: '',
          children: [
            {
              name: 'Nhóm quyền',
              icon: '',
              link: 'page/setting/permission',
            },
            {
              name: 'Referral',
              icon: '',
              children: [
                {
                  name: 'Cuộc thi tính điểm',
                  icon: '',
                  link: 'page/setting/referral/loyalty',
                },
                {
                  name: 'Tri ân học viên',
                  icon: '',
                  link: '',
                },
              ]
            },
            {
              name: 'Website',
              icon: '',
              link: '',
              children: [
                {
                  name: 'Thiết lập website',
                  icon: '',
                  link: 'page/setting/website-config/config',
                },
                {
                  name: 'Danh sách trang',
                  icon: '',
                  link: 'page/setting/website-config/page-config',
                },
                {
                  name: 'Cấu hình thanh menu',
                  icon: '',
                  link: 'page/setting/website-config/header',
                },
                {
                  name: 'Cấu hình chân trang',
                  icon: '',
                  link: 'page/setting/website-config/footer',
                },
              ]
            },
            {
              name: 'Phễu khóa học',
              icon: '',
              link: '',
              children: [
                {
                  name: 'Khóa học',
                  icon: '',
                  link: 'page/setting/course',
                },
                {
                  name: 'Lớp học',
                  icon: '',
                  link: 'page/setting/class',
                },
                {
                  name: 'Buổi học',
                  icon: '',
                  link: 'page/setting/lesson',
                },
                {
                  name: 'Landing page',
                  icon: '',
                  link: 'page/setting/landing-page',
                },
                {
                  name: 'Vé khóa học',
                  icon: '',
                  link: 'page/setting/ticket',
                },
                {
                  name: 'Form đăng ký',
                  icon: '',
                  link: 'page/setting/register-form',
                },
              ]
            },
            {
              name: 'E-learning',
              icon: '',
              link: '',
              children: [
                {
                  name: 'Danh sách khóa học',
                  icon: '',
                  link: 'page/e-course',
                },
                {
                  name: 'Danh mục khóa học',
                  icon: '',
                  link: 'page/e-category',
                },
              ]
            },
            {
              name: 'Tư cách thành viên',
              icon: '',
              link: '',
              children: [
                {
                  name: 'Yêu cầu nâng hạng',
                  icon: '',
                  link: 'page/membership-policy/request-upgrade',
                },
                {
                  name: 'Hạng thành viên',
                  icon: '',
                  link: 'page/membership-policy',
                },
                {
                  name: 'Cấu hình chung',
                  icon: '',
                  link: 'page/membership-policy/config',
                },
              ]
            },
            {
              name: 'Email SMTP',
              icon: '',
              link: 'page/setting/email-account',
            },
            {
              name: 'Email',
              icon: '',
              children: [
                // {
                //   name : 'Email hệ thống',
                //   icon: '',
                //   link: 'page/setting/email/system-email',
                // },
                {
                  name: 'Email thông báo',
                  icon: '',
                  link: 'page/setting/email/notifications-email',
                },
              ]
            },
            {
              name: 'Ấn phẩm',
              icon: '',
              link: 'page/setting/publication',
            },
            {
              name: 'Sản phẩm',
              icon: '',
              link: '',
              children: [
                {
                  name: 'Danh sách sản phẩm',
                  icon: '',
                  link: 'page/setting/product',
                },
                {
                  name: 'Danh sách kho hàng',
                  icon: '',
                  link: 'page/setting/warehouse',
                },
              ]
            },
            {
              name: 'Dịch vụ khách hàng',
              icon: '',
              link: '',
              children: [
                {
                  name: 'Danh sách khách hàng',
                  icon: '',
                  link: 'page/customer',
                },
                {
                  name: 'Đơn chạy Ads',
                  icon: '',
                  link: 'page/customer/ads',
                },
              ]
            }
          ]
        },
      ]
    },
  ];

  ngOnInit() {
    if (localStorage.getItem('org') != null) {
      this.dataOrg = JSON.parse(<string>localStorage.getItem('org'));
    }
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
