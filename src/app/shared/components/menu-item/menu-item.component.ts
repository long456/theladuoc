import {Component, Input} from '@angular/core';
import {MenuItem} from "../../models/MenuItem";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() menuData: MenuItem[] = [];
  constructor(
    private router: Router,
  ) {
  }

  navigate(link : string | undefined) {
    if (link) {
      this.router.navigateByUrl(link);
    }
  }
}
