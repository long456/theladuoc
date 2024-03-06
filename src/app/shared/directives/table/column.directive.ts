import {ContentChild, Directive, Input} from '@angular/core';
import {CellDirective} from "./cell.directive";
import {HeaderDirective} from "./header.directive";
import {COL_DATA_TYPE, FIX_COLUMN} from "../../models/Table";

@Directive({
  selector: 'table-column'
})
export class ColumnDirective {

  @Input() header = '';
  @Input() key = '';
  @Input() renderKey = '';
  @Input() dataType = COL_DATA_TYPE.TEXT;
  @Input() width = '100px';
  @Input() fixColumn: FIX_COLUMN = 'none';

  @ContentChild(CellDirective, { static: true }) tplCell?: CellDirective;
  @ContentChild(HeaderDirective, { static: true }) tplHeader?: HeaderDirective;

  constructor() { }
}
