import {Injectable, ViewContainerRef} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {FilesManagerComponent} from "../components/files-manager/files-manager.component";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  selectedFile = new Subject<string>();

  constructor(
    private modal: NzModalService,
    private http: HttpClient,
  ) { }

  selectFile() {
    this.modal.create<FilesManagerComponent>({
      nzTitle: 'Quản lý file',
      nzContent: FilesManagerComponent,
      nzWidth: 1000,
      nzFooter: null,
      nzOnOk: instance => {
        this.selectedFile.next(instance.dataFileSelected.filePath);
      }
    });
  }

  getImgByOwner(id: number, page?: any, pageSize?: any,): Observable<any> {
    let option = {
      PageIndex: page,
      pageSize: pageSize,
    }

    return this.http.get('Media/list-popup-image/' + id, {params: option});
  }

  getImgOrganization(id: number, page?: any, pageSize?: any,): Observable<any> {
    let option = {
      PageIndex: page,
      pageSize: pageSize,
    }

    return this.http.get('Media/list-popup-image-org', {params: option});
  }

  getFileByOwner(id: number, page?: any, pageSize?: any,): Observable<any> {
    let option = {
      PageIndex: page,
      pageSize: pageSize,
    }

    return this.http.get('Media/list-popup-file/' + id, {params: option});
  }

  getFileOrganization(id: number, page?: any, pageSize?: any,): Observable<any> {
    let option = {
      PageIndex: page,
      pageSize: pageSize,
    }

    return this.http.get('Media/list-popup-file-org', {params: option});
  }

  uploadFile(data: any): Observable<any>{
    return this.http.post('Media/upload', data);
  }

  deleteFile(id: number): Observable<any>{
    return this.http.delete('Media/delete/' + id);
  }

  changeFileName(data: any): Observable<any>{
    return this.http.post('Media/update-filename', data);
  }
}
