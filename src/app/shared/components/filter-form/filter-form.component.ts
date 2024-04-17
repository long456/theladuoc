import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {filterItem} from "../../models/Table";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit{

  @Input() filterData: filterItem[] = [];
  @Output() getFilterData = new EventEmitter<any>();
  filterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group(this.getFormControl(this.filterData))
  }

  getFormControl(data: filterItem[]) {
    const control: { [key: string]: any; } = {}
    data.forEach(item => {
      control[item.name] = ['']
    })

    return control
  }

  filter() {
    const data = this.getSubmitData();
    this.getFilterData.emit(data);
  }

  getSubmitData() {
    const isDateRange = this.filterData.filter(item => item.type === "date-range");
    const data = {...this.filterForm.value}

    if (isDateRange.length > 0) {
      if (this.filterForm.value[isDateRange[0].name] !== '' && this.filterForm.value[isDateRange[0].name] !== null) {
        data['startDate'] = formatDate(this.filterForm.value[isDateRange[0].name][0] ,'dd/MM/YYYY', 'en-US');
        data['endDate'] = formatDate(this.filterForm.value[isDateRange[0].name][1] ,'dd/MM/YYYY', 'en-US');
      } else {
        data['startDate'] = ''
        data['endDate'] = ''
      }
      delete data[isDateRange[0].name];
    }

    for (const prop in data) {
      if (data[prop] === '' || data[prop] === null) {
        delete data[prop]
      }
    }

    return data
  }

  clearForm() {
    this.filterForm.reset();
    this.getFilterData.emit(null);
  }

}
