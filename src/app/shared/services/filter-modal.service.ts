import { Injectable } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {FilterFormComponent} from "../components/filter-form/filter-form.component";
import {Subject, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterModalService {
  filter = new Subject<string>();

  constructor(
    private modal: NzModalService,
    private http: HttpClient,
  ) { }

  getFilter(data: any) {
    this.modal.create<FilterFormComponent>({
      nzTitle: 'Lọc dữ liệu',
      nzData: data,
      nzContent: FilterFormComponent,
      nzWidth: 1100,
      nzFooter: null,
      nzOnOk: instance => {
        instance.getFilterData.pipe(take(1)).subscribe({
          next: (value : any)  => {
            this.filter.next(value);
          }
        })
      }
    });
  }
}
