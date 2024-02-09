import {Component, Input} from '@angular/core';
import {MenuItem} from "../../models/MenuItem";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() menuData: MenuItem[] = [];
}
