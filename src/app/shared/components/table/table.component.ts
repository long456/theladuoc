import {AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {ColumnDirective} from "../../directives/table/column.directive";
import {COL_DATA_TYPE} from "../../models/Table"
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit{

  @Input() loading = false;
  @Input() rows = <any>[];
  @Input() clientPagination = true;
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() totalRows = 0;

  @ContentChildren(ColumnDirective) columns!: QueryList<ColumnDirective>;

  COL_DATA_TYPE = COL_DATA_TYPE;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

}
