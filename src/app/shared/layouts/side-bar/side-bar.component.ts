import { Component, Input, OnInit } from '@angular/core';
import { type MenuItem } from "../../models/MenuItem";
import { Router } from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [ './side-bar.component.scss' ]
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
      i18n_key: 'reports',
      children: [
        {
          name: 'Tăng trưởng',
          icon: '',
          link: '',
          i18n_key: 'growth',
        },
        {
          name: 'Hiệu quả khóa học',
          icon: '',
          link: '',
          i18n_key: 'course_outcomes',
          children: [
            {
              name: 'Phễu khóa học',
              icon: '',
              link: '',
              i18n_key: 'funnel_course',
              children: [
                {
                  name: 'Khóa học phễu',
                  icon: '',
                  i18n_key: 'tiered_courses',
                  link: 'page/report/report-funnel-course',
                },
                {
                  name: 'Khóa học lớn',
                  icon: '',
                  i18n_key: 'big_courses',
                  link: 'page/report/report-big-course',
                }
              ]
            },
            {
              name: 'E-learning',
              icon: '',
              link: '',
              i18n_key: 'e_learning',
              children: [
                {
                  name: 'Khóa học miễn phí',
                  icon: '',
                  i18n_key: 'free_courses',
                  link: 'page/report/report-free-course',
                },
                {
                  name: 'Khóa học thành viên',
                  icon: '',
                  i18n_key: 'membership_courses',
                  link: 'page/report/report-member-course',
                },
                {
                  name: 'Khóa học trả phí',
                  icon: '',
                  i18n_key: 'paid_courses',
                  link: 'page/report/report-paid-course',
                },
                {
                  name: 'Khóa học cộng tác viên',
                  icon: '',
                  i18n_key: 'partner_courses',
                  link: 'page/report/report-collaborator-course',
                },
                {
                  name: 'Khóa học giảng viên',
                  icon: '',
                  i18n_key: 'tutor_courses',
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
          i18n_key: 'staff_productivity',
          children: [
            {
              name: 'Diễn giả',
              icon: '',
              i18n_key: 'teachers',
              link: 'page/report/report-speaker',
            },
            {
              name: 'Nhân viên sales',
              icon: '',
              i18n_key: 'sales',
              link: 'page/report/report-sales-staff',
            }
          ]
        }
      ]
    },
    {
      name: 'Vận hành',
      icon: 'reconciliation',
      i18n_key: 'operation',
      link: '',
      children: [
        {
          name: 'Học viên',
          icon: '',
          i18n_key: 'learners',
          link: '',
          children: [
            {
              name: 'Chưa chia',
              icon: '',
              i18n_key: 'bystanding',
              link: 'page/student/none-divide',
            },
            {
              name: 'Đang chờ',
              icon: '',
              i18n_key: 'waiting',
              link: 'page/student/waiting',
            },
            {
              name: 'Đang chăm',
              icon: '',
              i18n_key: 'caring',
              link: 'page/student/take-care',
            },
            {
              name: 'Đang học',
              icon: '',
              i18n_key: 'studying',
              link: 'page/student/studying',
            },
            {
              name: 'Referral',
              icon: '',
              i18n_key: 'Referral',
              link: '',
            },
          ]
        },
        {
          name: 'Điểm danh',
          icon: '',
          link: '',
          i18n_key: 'check_in',
          children: [
            {
              name: 'Danh sách buổi học',
              icon: '',
              i18n_key: 'lessons',
              link: 'page/attendance/lesson',
            },
            {
              name: 'Danh sách điểm danh',
              icon: '',
              i18n_key: 'check_in_list',
              link: 'page/attendance/attend',
            }
          ]
        },
        {
          name: 'E-learning',
          icon: '',
          link: '',
          i18n_key: 'e_learning',
          children: [
            {
              name: 'Chưa chia',
              icon: '',
              i18n_key: 'bystanding',
              link: 'page/e-learning-student/none-divide',
            },
            {
              name: 'Đang chờ',
              icon: '',
              i18n_key: 'waiting',
              link: 'page/e-learning-student/waiting',
            },
            {
              name: 'Đang chăm',
              icon: '',
              i18n_key: 'caring',
              link: 'page/e-learning-student/take-care',
            },
            {
              name: 'Đăng ký khóa học',
              icon: '',
              i18n_key: 'joined_course',
              link: 'page/e-learning-student/register',
            },
            {
              name: 'Đang học',
              icon: '',
              i18n_key: 'studying',
              link: 'page/e-learning-student/studying',
            },
          ]
        },
        {
          name: 'Nghiệp vụ kế toán',
          icon: '',
          link: '',
          i18n_key: 'accounting',
          children: [
            {
              name: 'Xác thực thanh toán',
              icon: '',
              i18n_key: 'payment_verification',
              link: 'page/payment/auth',
            },
            {
              name: 'Yêu cầu hoàn tiền',
              icon: '',
              i18n_key: 'refund_requests',
              link: 'page/payment/refund',
            },
            {
              name: 'Lịch sử thanh toán',
              icon: '',
              i18n_key: 'transaction_history',
              link: 'page/transaction-history',
            },
            {
              name: 'Yêu cầu rút tiền',
              icon: '',
              i18n_key: 'withdraw_requests',
              link: 'page/payment/withdraw',
            },
          ],
        },
        {
          name: 'Tư cách thành viên',
          icon: '',
          i18n_key: 'membership',
          link: '',
          children: [
            {
              name: 'Yêu cầu nâng hạng',
              icon: '',
              i18n_key: 'upgrade_request_list',
              link: 'page/membership-policy/request-upgrade',
            },
          ]
        },
        {
          name: 'Yêu cầu liên hệ',
          icon: '',
          i18n_key: 'contact_requests',
          link: 'page/guests',
        },
        {
          name: 'Nhật ký gửi mail',
          icon: '',
          i18n_key: 'email_logs',
          link: 'page/setting/email/queue',
        },
        {
          name: 'Nhân sự',
          icon: '',
          link: '',
          i18n_key: 'staff',
          children: [
            {
              name: 'Trao quyền',
              icon: '',
              i18n_key: 'permission_management',
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
      i18n_key: 'settings',
      children: [
        {
          name: 'Tổ chức',
          icon: '',
          i18n_key: 'organizations',
          link: 'page/organization',
        },
        {
          name: 'Phương thức thanh toán',
          icon: '',
          i18n_key: 'payment_methods',
          link: 'page/payment/method',
        },
        {
          name: 'Tính năng',
          icon: '',
          i18n_key: 'features',
          link: '',
          children: [
            {
              name: 'Nhóm quyền',
              icon: '',
              i18n_key: 'permission_groups',
              link: 'page/setting/permission',
            },
            {
              name: 'Referral',
              icon: '',
              i18n_key: 'Referral',
              children: [
                {
                  name: 'Cuộc thi tính điểm',
                  icon: '',
                  i18n_key: 'point_contests',
                  link: 'page/setting/referral/loyalty',
                },
                {
                  name: 'Tri ân học viên',
                  icon: '',
                  i18n_key: 'student_appreciations',
                  link: '',
                },
              ]
            },
            {
              name: 'Website',
              icon: '',
              link: '',
              i18n_key: 'Website',
              children: [
                {
                  name: 'Thiết lập website',
                  icon: '',
                  i18n_key: 'website_settings',
                  link: 'page/setting/website-config/config',
                },
                {
                  name: 'Danh sách trang',
                  icon: '',
                  i18n_key: 'pages',
                  link: 'page/setting/website-config/page-config',
                },
                {
                  name: 'Cấu hình thanh menu',
                  icon: '',
                  i18n_key: 'menu_settings',
                  link: 'page/setting/website-config/header',
                },
                {
                  name: 'Cấu hình chân trang',
                  icon: '',
                  i18n_key: 'footer_settings',
                  link: 'page/setting/website-config/footer',
                },
              ]
            },
            {
              name: 'Tin tức hoạt động',
              icon: '',
              link: '',
              i18n_key: 'news',
              children: [
                {
                  name: 'Danh mục tin tức',
                  icon: '',
                  i18n_key: 'posting_categories',
                  link: 'page/news-category',
                },
                {
                  name: 'Danh sách tin tức',
                  icon: '',
                  i18n_key: 'posts',
                  link: 'page/news',
                },
                {
                  name: 'Sự kiện giáo dục',
                  icon: '',
                  i18n_key: 'edu_events',
                  link: 'page/event',
                },
                {
                  name: 'Lời chứng thực',
                  icon: '',
                  i18n_key: 'testimonials',
                  link: 'page/testimonials',
                },
              ],
            },
            {
              name: 'Phễu khóa học',
              icon: '',
              link: '',
              i18n_key: 'funnel_course',
              children: [
                {
                  name: 'Khóa học',
                  icon: '',
                  i18n_key: 'courses',
                  link: 'page/setting/course',
                },
                {
                  name: 'Lớp học',
                  icon: '',
                  i18n_key: 'classes',
                  link: 'page/setting/class',
                },
                {
                  name: 'Buổi học',
                  icon: '',
                  i18n_key: 'lessons',
                  link: 'page/setting/lesson',
                },
                {
                  name: 'Landing page',
                  icon: '',
                  i18n_key: 'Landing page',
                  link: 'page/setting/landing-page',
                },
                {
                  name: 'Vé khóa học',
                  icon: '',
                  i18n_key: 'learning_tickets',
                  link: 'page/setting/ticket',
                },
                {
                  name: 'Form đăng ký',
                  icon: '',
                  i18n_key: 'registration_form',
                  link: 'page/setting/register-form',
                },
              ]
            },
            {
              name: 'E-learning',
              icon: '',
              link: '',
              i18n_key: 'e_learning',
              children: [
                {
                  name: 'Danh sách khóa học',
                  icon: '',
                  i18n_key: 'course_list',
                  link: 'page/e-course',
                },
                {
                  name: 'Danh mục khóa học',
                  icon: '',
                  i18n_key: 'course_categories',
                  link: 'page/e-category',
                },
                {
                  name: 'Video giới thiệu',
                  icon: '',
                  i18n_key: 'introduction_video',
                  link: 'page/e-learning-config/intro-video/list',
                },
              ]
            },
            {
              name: 'Tư cách thành viên',
              icon: '',
              link: '',
              i18n_key: 'membership',
              children: [
                {
                  name: 'Hạng thành viên',
                  icon: '',
                  i18n_key: 'membership_tier',
                  link: 'page/membership-policy',
                },
                {
                  name: 'Cấu hình chung',
                  icon: '',
                  i18n_key: 'membership_settings',
                  link: 'page/membership-policy/config',
                },
              ]
            },
            {
              name: 'Diễn đàn cộng đồng',
              icon: '',
              i18n_key: 'forum',
              link: '',
              children: [
                {
                  name: 'Cấu hình chung',
                  icon: '',
                  i18n_key: 'forum_settings',
                  link: 'page/forum',
                },
                {
                  name: 'Danh mục cộng đồng',
                  icon: '',
                  i18n_key: 'community_category',
                  link: 'page/forum/category',
                },
                {
                  name: 'Danh sách cộng đồng',
                  icon: '',
                  i18n_key: 'forum_communities',
                  link: 'page/forum/sub-forum',
                }
              ]
            },
            {
              name: 'Email SMTP',
              icon: '',
              i18n_key: 'Email SMTP',
              link: 'page/setting/email-account',
            },
            {
              name: 'Email',
              icon: '',
              i18n_key: 'Email',
              children: [
                // {
                //   name : 'Email hệ thống',
                //   icon: '',
                //   i18n_key: 'system_email',
                //   link: 'page/setting/system-email',
                // },
                {
                  name: 'Email thông báo',
                  i18n_key: 'notification_emails',
                  icon: '',
                  link: 'page/setting/email/notifications-email',
                },
              ]
            },
            {
              name: 'Ấn phẩm',
              icon: '',
              i18n_key: 'publications',
              link: 'page/setting/publication',
            },
            {
              name: 'Sản phẩm',
              icon: '',
              i18n_key: 'products',
              link: '',
              children: [
                {
                  name: 'Danh sách sản phẩm',
                  icon: '',
                  i18n_key: 'product_list',
                  link: 'page/setting/product',
                },
                {
                  name: 'Danh sách kho hàng',
                  icon: '',
                  i18n_key: 'warehouse_list',
                  link: 'page/setting/warehouse',
                },
              ]
            },
            {
              name: 'Dịch vụ khách hàng',
              icon: '',
              link: '',
              i18n_key: 'customer_service',
              children: [
                {
                  name: 'Danh sách khách hàng',
                  icon: '',
                  i18n_key: 'customers',
                  link: 'page/customer',
                },
                {
                  name: 'Đơn chạy Ads',
                  icon: '',
                  i18n_key: 'ads_order',
                  link: 'page/customer/ads',
                },
              ]
            }
          ]
        },
      ]
    },
  ]
;

  ngOnInit() {
    if (localStorage.getItem('org') != null) {
      this.dataOrg = JSON.parse(<string>localStorage.getItem('org'));
    }
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
