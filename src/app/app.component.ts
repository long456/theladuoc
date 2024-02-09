import { Component } from '@angular/core';
import {MenuItem} from "./shared/models/MenuItem";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
}
