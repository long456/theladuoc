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
      icon: 'bar-chart',
      link: '',
      name: 'reports',
      children: [
        {
          icon: '',
          link: '',
          name: 'growth',
        },
        {
          icon: '',
          link: '',
          name: 'course_outcomes',
          children: [
            {
              icon: '',
              link: '',
              name: 'funnel_course',
              children: [
                {
                  icon: '',
                  link: 'page/report/report-funnel-course',
                  name: 'tiered_courses',
                },
                {
                  icon: '',
                  link: 'page/report/report-big-course',
                  name: 'big_courses',
                },
              ],
            },
            {
              icon: '',
              link: '',
              name: 'e_learning',
              children: [
                {
                  icon: '',
                  link: 'page/report/report-free-course',
                  name: 'free_courses',
                },
                {
                  icon: '',
                  link: 'page/report/report-member-course',
                  name: 'membership_courses',
                },
                {
                  icon: '',
                  link: 'page/report/report-paid-course',
                  name: 'paid_courses',
                },
                {
                  icon: '',
                  link: 'page/report/report-collaborator-course',
                  name: 'partner_courses',
                },
                {
                  icon: '',
                  link: 'page/report/report-instructor-course',
                  name: 'tutor_courses',
                },
              ],
            },
          ],
        },
        {
          icon: '',
          link: '',
          name: 'staff_productivity',
          children: [
            {
              icon: '',
              link: 'page/report/report-speaker',
              name: 'teachers',
            },
            {
              icon: '',
              link: 'page/report/report-sales-staff',
              name: 'sales',
            },
          ],
        },
      ],
    },
    {
      icon: 'reconciliation',
      link: '',
      name: 'operation',
      children: [
        {
          icon: '',
          link: '',
          name: 'learners',
          children: [
            {
              icon: '',
              link: 'page/student/none-divide',
              name: 'bystanding',
            },
            {
              icon: '',
              link: 'page/student/waiting',
              name: 'waiting',
            },
            {
              icon: '',
              link: 'page/student/take-care',
              name: 'caring',
            },
            {
              icon: '',
              link: 'page/student/studying',
              name: 'studying',
            },
            {
              icon: '',
              link: '',
              name: 'Referral',
            },
          ],
        },
        {
          icon: '',
          link: '',
          name: 'check_in',
          children: [
            {
              icon: '',
              link: 'page/attendance/lesson',
              name: 'lessons',
            },
            {
              icon: '',
              link: 'page/attendance/attend',
              name: 'check_in_list',
            },
          ],
        },
        {
          icon: '',
          link: '',
          name: 'e_learning',
          children: [
            {
              icon: '',
              link: 'page/e-learning-student/none-divide',
              name: 'bystanding',
            },
            {
              icon: '',
              link: 'page/e-learning-student/waiting',
              name: 'waiting',
            },
            {
              icon: '',
              link: 'page/e-learning-student/take-care',
              name: 'caring',
            },
            {
              icon: '',
              link: 'page/e-learning-student/register',
              name: 'registered',
            },
            {
              icon: '',
              link: 'page/e-learning-student/studying',
              name: 'studying',
            },
          ],
        },
        {
          icon: '',
          link: '',
          name: 'accounting',
          children: [
            {
              icon: '',
              link: 'page/payment/auth',
              name: 'payment_verification',
            },
            {
              icon: '',
              link: 'page/payment/refund',
              name: 'refund_requests',
            },
            {
              icon: '',
              link: 'page/payment/withdraw',
              name: 'withdraw_requests',
            },
          ],
        },
        {
          icon: '',
          link: '',
          name: 'membership',
          children: [
            {
              icon: '',
              link: 'page/transaction-history',
              name: 'transaction_history',
            },
            {
              icon: '',
              link: 'page/membership-policy/request-upgrade',
              name: 'upgrade_requests',
            },
            {
              icon: '',
              link: 'page/e-learning-student/agency',
              name: 'agencies',
            },
          ],
        },
        {
          icon: '',
          link: 'page/guests',
          name: 'contact_requests',
        },
        {
          icon: '',
          link: 'page/setting/email/queue',
          name: 'email_logs',
        },
        {
          icon: '',
          link: '',
          name: 'staff',
          children: [
            {
              icon: '',
              link: 'page/staff',
              name: 'permission_management',
            },
          ],
        },
      ],
    },
    {
      icon: 'setting',
      link: '',
      name: 'settings',
      children: [
        {
          icon: '',
          link: 'page/organization',
          name: 'organizations',
        },
        {
          icon: '',
          link: 'page/payment/method',
          name: 'payment_methods',
        },
        {
          icon: '',
          link: '',
          name: 'features',
          children: [
            {
              icon: '',
              link: 'page/setting/permission',
              name: 'permission_groups',
            },
            {
              icon: '',
              link: '',
              name: 'Referral',
              children: [
                {
                  icon: '',
                  link: 'page/setting/referral/loyalty',
                  name: 'point_contests',
                },
                {
                  icon: '',
                  link: '',
                  name: 'student_appreciations',
                },
              ],
            },
            {
              icon: '',
              link: '',
              name: 'Website',
              children: [
                {
                  icon: '',
                  link: 'page/setting/website-config/config',
                  name: 'website_settings',
                },
                {
                  icon: '',
                  link: 'page/setting/website-config/page-config',
                  name: 'pages',
                },
                {
                  icon: '',
                  link: 'page/setting/website-config/header',
                  name: 'menu_settings',
                },
                {
                  icon: '',
                  link: 'page/setting/website-config/footer',
                  name: 'footer_settings',
                },
              ],
            },
            {
              icon: '',
              link: '',
              name: 'news',
              children: [
                {
                  icon: '',
                  link: 'page/news-category',
                  name: 'news_categories',
                },
                {
                  icon: '',
                  link: 'page/news',
                  name: 'posts',
                },
                {
                  icon: '',
                  link: 'page/event',
                  name: 'edu_events',
                },
                {
                  icon: '',
                  link: 'page/testimonials',
                  name: 'testimonials',
                },
              ],
            },
            {
              icon: '',
              link: '',
              name: 'course_funnel',
              children: [
                {
                  icon: '',
                  link: 'page/setting/course',
                  name: 'courses',
                },
                {
                  icon: '',
                  link: 'page/setting/class',
                  name: 'classes',
                },
                {
                  icon: '',
                  link: 'page/setting/lesson',
                  name: 'lessons',
                },
                {
                  icon: '',
                  link: 'page/setting/landing-page',
                  name: 'landing_page',
                },
                {
                  icon: '',
                  link: 'page/setting/ticket',
                  name: 'learning_tickets',
                },
                {
                  icon: '',
                  link: 'page/setting/register-form',
                  name: 'registration_form',
                },
              ],
            },
            {
              icon: '',
              link: '',
              name: 'e_learning',
              children: [
                {
                  icon: '',
                  link: 'page/e-learning-config/config/list',
                  name: 'elearning_ui_configuration',
                },
                {
                  icon: '',
                  link: 'page/e-course',
                  name: 'course_list',
                },
                {
                  icon: '',
                  link: 'page/e-category',
                  name: 'course_categories',
                },
                {
                  icon: '',
                  link: 'page/e-learning-config/intro-video/list',
                  name: 'introduction_video',
                },
              ],
            },
            {
              icon: '',
              link: '',
              name: 'membership',
              children: [
                {
                  icon: '',
                  link: 'page/membership-policy',
                  name: 'membership_tier',
                },
                {
                  icon: '',
                  link: 'page/membership-policy/config',
                  name: 'membership_settings',
                },
              ],
            },
            {
              icon: '',
              link: '',
              name: 'forum',
              children: [
                {
                  icon: '',
                  link: 'page/forum',
                  name: 'forum_settings',
                },
                {
                  icon: '',
                  link: 'page/forum/category',
                  name: 'community_category',
                },
                {
                  icon: '',
                  link: 'page/forum/sub-forum',
                  name: 'forum_communities',
                },
                {
                  icon: '',
                  link: 'page/forum/nav-forum',
                  name: 'footer_settings',
                },
              ],
            },
            {
              icon: '',
              link: 'page/setting/email-account',
              name: 'Email SMTP',
            },
            {
              icon: '',
              link: '',
              name: 'Email',
              children: [
                {
                  icon: '',
                  link: 'page/setting/email/notifications-email',
                  name: 'notification_emails',
                },
              ],
            },
            {
              icon: '',
              link: 'page/setting/publication',
              name: 'publications',
            },
            {
              icon: '',
              link: '',
              name: 'products',
              children: [
                {
                  icon: '',
                  link: 'page/setting/product',
                  name: 'product_list',
                },
                {
                  icon: '',
                  link: 'page/setting/warehouse',
                  name: 'warehouse_list',
                },
              ],
            },
            {
              icon: '',
              link: '',
              name: 'customer_service',
              children: [
                {
                  icon: '',
                  link: 'page/customer',
                  name: 'customers',
                },
                {
                  icon: '',
                  link: 'page/customer/ads',
                  name: 'ads_order',
                },
              ],
            },
            {
              name: 'platform_transfer',
              icon: '',
              link: '',
              children: [
                {
                  name: 'price_list_config',
                  icon: '',
                  children: [
                    {
                      name: 'category',
                      icon: '',
                      link: 'page/price-list/catalog',
                    },
                    {
                      name: 'price_list',
                      icon: '',
                      link: 'page/price-list/price',
                    },
                  ]
                },
                {
                  name: 'business_empower',
                  icon: '',
                  link: 'page/price-list/business-access',
                }
              ]
            },
          ],
        },
      ],
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
