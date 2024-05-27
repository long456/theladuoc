import {
  Component,
  ContentChildren,
  Input,
  OnInit, Output,
  EventEmitter,
  QueryList
} from '@angular/core';
import {ColumnDirective} from "../../directives/table/column.directive";
import {COL_DATA_TYPE} from "../../models/Table"


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  @Input() loading = false;
  @Input() rows = <any>[];
  @Input() clientPagination = true;
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() pageTotal = 0;

  @Output() onItemSelection = new EventEmitter<any>();
  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  isChecked = false
  setOfCheckedId = new Set<number>();

  @ContentChildren(ColumnDirective) columns!: QueryList<ColumnDirective>;

  COL_DATA_TYPE = COL_DATA_TYPE;

  constructor() { }

  ngOnInit(): void {
  }

  onItemChecked(data: any) {
    if (this.setOfCheckedId.has(data.id)) {
      this.setOfCheckedId.delete(data.id)
    } else {
      this.setOfCheckedId.add(data.id)
    }

    if (this.setOfCheckedId.size === 10) {
      this.isChecked = true
    } else {
      this.isChecked = false
    }

    this.onItemSelection.emit(Array.from(this.setOfCheckedId))
  }

  onCheckedAll() {
    this.isChecked = !this.isChecked
    if (this.isChecked) {
      this.rows.forEach((item : any) => {
        this.setOfCheckedId.add(item.id)
      })
    } else {
      this.rows.forEach((item : any) => {
        this.setOfCheckedId.delete(item.id)
      })
    }

    this.onItemSelection.emit(Array.from(this.setOfCheckedId))
  }

}
