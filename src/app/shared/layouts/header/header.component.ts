import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../../../layouts/auth-layout/auth/services/login.service";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../layouts/auth-layout/auth/services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { StudentService } from "../../../pages/student/services/student.service";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { Boarding } from "boarding.js";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})

export class HeaderComponent implements OnInit {
  private subscription: Subscription;
  linkAvatar!: string;
  userData!: any;
  downloadStatus!: string;
  lang: string = '';

  tutorialModel?: { [ key: string ]: string };
  filteredOptions: { [ key: string ]: string }[] = [];
  options: { [ key: string ]: string }[] = [];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private studentService: StudentService,
    private translateService: TranslateService,
  ) {
    this.subscription = new Subscription();
    this.filteredOptions = this.options;
  }

  ngOnInit() {
    this.options = [
      { label: 'organization', keywords: 'tổ chức, to chuc' },
      { label: 'withdrawal', keywords: 'rut tien, rút tiền' },
      { label: 'payment_method', keywords: 'phuong thuc thanh toan, phương thức thanh toán' },
      { label: 'permission_group', keywords: 'nhom quyen, nhóm quyền' },
      { label: 'Website', keywords: 'trang web' },
      { label: 'website_page', keywords: 'trang con' },
      { label: 'header_menu', keywords: 'thanh menu' },
      { label: 'footer', keywords: 'chân trang, chan trang' },
      { label: 'course', keywords: 'khoa hoc, khoá học, khóa học' },
      { label: 'class', keywords: 'lop hoc, lớp học' },
      { label: 'lesson', keywords: 'buoi hoc, buổi học' },
      { label: 'landing_page', keywords: 'landing page' },
      { label: 'learning_ticket', keywords: 've hoc tap, vé học tập' },
      { label: 'registration_form', keywords: 'form dang ky, form đăng ký' },
    ]

    const baseUrl = environment.baseImgUrl
    const dataUser = localStorage.getItem('data');
    if (dataUser) {
      const parseUserData = JSON.parse(dataUser);
      const avatarUrl = parseUserData.avatar;
      this.linkAvatar = baseUrl + avatarUrl;
      this.userData = parseUserData
    } else {
      this.authService.getUserProfile().subscribe({
        next: res => {
          if (res.success) {
            this.linkAvatar = baseUrl + res.data.avatar;
            this.userData = res.data;
          }
        }
      });
    }

    this.subscription = this.studentService.exportStatus$.subscribe((status) => {
      this.showMessage(status);
    });

    this.lang = localStorage.getItem('lang') || 'vi';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showMessage(status: string) {
    switch (status) {
      case 'pending':
        this.downloadStatus = 'pending';
        this.createNotification('info', 'Quá trình download file excel đang chạy');
        break;
      case 'completed':
        this.downloadStatus = 'completed';
        this.createNotification('success', 'Download file thành công')
        break;
      case 'error':
        this.downloadStatus = 'error';
        this.createNotification('error', 'Có lỗi khi download file')
        break;
      default:
        this.downloadStatus = '';
    }
  }

  signOut() {
    this.loginService.logOut()
    this.router.navigate([ 'auth' ]);
  }

  editProfile() {
    this.router.navigate([ 'page/profile' ]);
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      'Export file excel',
      content
    );
  }

  changeLang(e: any): void {
    localStorage.setItem('lang', e);
    this.translateService.use(e);
  }

  startBoarding(key: string): void {
    let translate = this.translateService
    let boarding = new Boarding({
      className: 'ant-card',
      animate: true,
      padding: 10,
      closeBtnText: translate.instant('close'),
      doneBtnText: translate.instant('finish'),
      nextBtnText: translate.instant('next'),
      prevBtnText: translate.instant('back'),
      onBeforeHighlighted({ highlightDomElement }: any) {
        if (highlightDomElement.classList.contains('add-btn')) return
        const liEl = highlightDomElement?.closest('[nz-submenu]')
        if (!liEl?.classList.contains('ant-menu-submenu-open')) highlightDomElement?.click()
        else {
          if (highlightDomElement.hasAttribute('nz-menu-item')) highlightDomElement.click()
        }
        const menuListEl = document.querySelector('.menu-list')
        if (!menuListEl) return
        highlightDomElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      },
      onPopoverRender(el: any) {
        el.popoverPrevBtn.classList.add('ant-btn', 'ant-btn-sm')
        el.popoverNextBtn.classList.add('ant-btn', 'ant-btn-sm', 'ant-btn-primary')
        el.popoverCloseBtn.classList.add('ant-btn', 'ant-btn-sm', 'ant-btn-dashed')
        el.popoverPrevBtn.style.marginRight = '.5rem'
        el.popoverPrevBtn.style.marginLeft = '2rem'
        el.popoverFooter.style.marginTop = '1rem'
      }
    });
    const commonSettingSteps = [ {
      element: '#settings .ant-menu-submenu-title',
      popover: {
        title: ' ',
        description: `${translate.instant('pick')} <strong>${translate.instant('settings')}</strong>`,
        side: 'right',
        alignment: 'center'
      },
    } ]

    const commonOrganizationSteps = [
      ...commonSettingSteps,
      {
        element: '#organizations',
        popover: {
          title: ' ',
          description: `${translate.instant('pick')} <strong>${translate.instant('organization')}</strong>`,
          side: 'right',
          alignment: 'center'
        },
      }
    ]

    const commonFeatureSteps = [
      ...commonSettingSteps,
      {
        element: '#features .ant-menu-submenu-title', //submenu
        popover: {
          title: " ",
          description: `${translate.instant('pick')} <strong>${translate.instant('features')}</strong>`,
          prefferedSide: "right",
          alignment: "center",
        },
      }
    ]

    const commonWebsiteSteps = [
      ...commonFeatureSteps,
      {
        element: '#Website .ant-menu-submenu-title', //submenu of submenu
        popover: {
          title: " ",
          description: `${translate.instant('pick')} <strong>Website</strong>`,
          prefferedSide: "right",
          alignment: "center",
        },
      }
    ]

    const commonCourseFunnelSteps = [
      ...commonFeatureSteps,
      {
        element: '#course_funnel .ant-menu-submenu-title', //submenu of submenu
        popover: {
          title: " ",
          description: `${translate.instant('pick')} <strong>${translate.instant('course_funnel')}</strong>`,
          prefferedSide: "right",
          alignment: "center",
        },
      },
    ]

    const addButtonStep = (text: string, prefix: string = 'setting') => ({
      element: '.add-btn',
      popover: {
        title: " ",
        description: `${translate.instant('click_here_to')} ${translate.instant(prefix)} ${translate.instant(text)}`,
        prefferedSide: "left",
        alignment: "center",
      },
      onNext({ highlightDomElement }: any) { highlightDomElement?.click() }
    })

    const tutorials = [
      {
        //Thiết lập tổ chức
        key: 'organizations',
        steps: [
          ...commonOrganizationSteps,
          addButtonStep('organization')
        ]
      },
      {
        //Cấu hình rút tiền
        key: 'widthdrawal',
        steps: [
          ...commonOrganizationSteps,
          {
            element: '.anticon-dollar',
            popover: {
              title: " ",
              description: `${translate.instant('click_here_to')} ${translate.instant('withdrawal_settings')}`,
              prefferedSide: "top",
              alignment: "center",
            },
            onNext({ highlightDomElement }: any) { highlightDomElement?.click() }
          },
        ]
      },
      {
        //Thiết lập phương thức thanh toán
        key: 'payment_method',
        steps: [
          ...commonSettingSteps,
          {
            element: '#payment_methods',
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('payment_method')}</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('payment_method')
        ]
      },
      {
        //Thiết lập nhóm quyền
        key: 'permission_group',
        steps: [
          ...commonFeatureSteps,
          {
            element: '#permission_groups',
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('permission_group')}</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('permission_group')
        ]
      },
      {
        //Thiết lập website
        key: 'Website',
        steps: [
          ...commonWebsiteSteps,
          {
            element: '#website_settings', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('website_settings')}</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
        ]
      },
      {
        //Thiết lập trang con của website
        key: 'website_page',
        steps: [
          ...commonWebsiteSteps,
          {
            element: '#pages', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('pages')}</strong}`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('trang con')
        ]
      },
      {
        //Thiết lập thanh menu của website
        key: 'header_menu',
        steps: [
          ...commonWebsiteSteps,
          {
            element: '#menu_settings', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} ${translate.instant('menu_settings')}`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('header_menu')
        ]
      },
      {
        //Thiết lập chân trang của website
        key: 'footer',
        steps: [
          ...commonWebsiteSteps,
          {
            element: '#footer_settings', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} ${translate.instant('footer_settings')}`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('chân trang')
        ]
      },
      {
        //Thiết lập khoá học
        key: 'course',
        steps: [
          ...commonCourseFunnelSteps,
          {
            element: '#courses', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('courses')}</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('course')
        ]
      },
      {
        //Thiết lập lớp học
        key: 'class',
        steps: [
          ...commonCourseFunnelSteps,
          {
            element: '#classes', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('classes')}</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('class')
        ]
      },
      {
        //Thiết lập buổi học
        key: 'lesson',
        steps: [
          ...commonCourseFunnelSteps,
          {
            element: '#course_funnel #lessons', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('lessons')}</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
        ]
      },
      {
        //Thiết lập landing page
        key: 'landing_page',
        steps: [
          ...commonCourseFunnelSteps,
          {
            element: '#course_funnel #landing_page', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>Landing page</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('landing_page')
        ]
      },
      {
        //Thiết lập vé học tập
        key: 'learning_ticket',
        steps: [
          ...commonCourseFunnelSteps,
          {
            element: '#course_funnel #learning_tickets', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('learning_ticket')}</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('learning_ticket')
        ]
      },
      {
        //Thiết lập form đăng ký
        key: 'registration_form',
        steps: [
          ...commonCourseFunnelSteps,
          {
            element: '#course_funnel #registration_form', //submenu of submenu
            popover: {
              title: " ",
              description: `${translate.instant('pick')} <strong>${translate.instant('registration_form')}</strong>`,
              prefferedSide: "right",
              alignment: "center",
            },
          },
          addButtonStep('registration_form')
        ]
      },
    ]

    const { steps }: any = tutorials.find((t: any) => t.key === key || t.key.includes(key))
    boarding.defineSteps(steps);
    boarding.start();
  }

  searchTutorial(value: string): void {
    this.filteredOptions = this.options.filter(option => option[ 'label' ].toLowerCase().indexOf(value?.toLowerCase()) !== -1 || option[ 'keywords' ].toLowerCase().indexOf(value?.toLowerCase()) !== -1);
  }

  onSelectTutorial(ctx: any): void {
    if (ctx.isUserInput) {
      const value = ctx.source.nzValue
      this.startBoarding(value)
    }
  }
}
