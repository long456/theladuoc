import {Component, Input, OnInit, Output, EventEmitter, inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {filterItem} from "../../models/Table";
import {formatDate} from "@angular/common";
// import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit{
  @Input() filterData: filterItem[] = [];
  @Input() isExportExcel: boolean = false;
  @Output() getFilterData = new EventEmitter<any>();
  @Output() getExcelData = new EventEmitter<any>();
  filterForm!: FormGroup;
  nzModalData!: any;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    // console.log(inject(NZ_MODAL_DATA));
    // this.nzModalData = inject(NZ_MODAL_DATA);

    if (this.nzModalData?.filterData) {
      this.filterData = this.nzModalData.filterData;
    }
    this.filterForm = this.fb.group(this.getFormControl(this.filterData));

    if (this.nzModalData?.currentFilter) {
      this.filterForm.patchValue(this.nzModalData?.currentFilter);
    }
  }

  getFormControl(data: filterItem[]) {
    const control: { [key: string]: any; } = {}
    console.log(data)
    data.forEach(item => {
      control[item.name] = ['']
    })

    return control
  }

  filter() {
    const data = this.getSubmitData();
    this.getFilterData.emit(data);
  }

  exportDataExcel() {
    const data = this.getSubmitData();
    this.getExcelData.emit(data);
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
        delete data[prop];
      }
    }

    // if(this.nzModalData) {
    //   this.modal.triggerOk().then();
    // }

    return data;
  }

  clearForm() {
    this.filterForm.reset();
    this.filter();
  }

}
