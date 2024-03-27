import {Component, Input, OnInit} from '@angular/core';
import {NzTreeNodeOptions} from "ng-zorro-antd/tree";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit{

  @Input() treeData: NzTreeNodeOptions[] = []

  constructor() {
  }

  ngOnInit() {
  }
}
