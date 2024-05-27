import {Component, Input, OnInit} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import {FlatNode, TreeNode} from "../../models/Tree";
import {NzTreeFlatDataSource, NzTreeFlattener} from "ng-zorro-antd/tree-view";



@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit{

  @Input() treeData: TreeNode[] = [];

  selectListSelection = new SelectionModel<FlatNode>(true);
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }

  ngOnInit() {
    this.dataSource.setData(this.treeData);
  }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  addNavigation() {
    console.log(this.treeData)
    let data = {
      name: 'test',
      url: '',
      navCode: '',
      parentCode: '',
    }
    this.treeData.push(data)
    this.dataSource.setData(this.treeData);
  }

  transformer(node: TreeNode, level: number): FlatNode{
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    }
  }

}
