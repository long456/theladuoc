import {Component, Input} from '@angular/core';
import {MenuItem} from "../../models/MenuItem";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
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
              name : 'Đang chờ',
              icon: '',
              link: '',
            },
            {
              name : 'Đang chăm',
              icon: '',
              link: '',
            },
            {
              name : 'Đang học',
              icon: '',
              link: '',
            },
            {
              name : 'Referral',
              icon: '',
              link: '',
            },
          ]
        },
        {
          name : 'Phân quyền',
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
          name : 'Tính năng',
          icon: '',
          link: '',
        },
      ]
    },
  ]

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
