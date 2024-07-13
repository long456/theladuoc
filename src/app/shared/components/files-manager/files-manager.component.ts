import {ChangeDetectorRef, Component, inject, OnInit, ViewContainerRef} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {CourseService} from "../../../pages/setting/services/course.service";
import {BehaviorSubject, catchError, combineLatest, delay, map, mergeMap, Observable, of, tap} from "rxjs";
import {FileManagerService} from "../../services/file-manager.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";

@Component({
  selector: 'app-files-manager',
  templateUrl: './files-manager.component.html',
  styleUrls: ['./files-manager.component.scss']
})
export class FilesManagerComponent implements OnInit{
  readonly nzModalData= inject(NZ_MODAL_DATA);
  selectedOwner: any = 0;

  listOwner: any[] = [];

  listImg$!: Observable<{
    data: any[],
    ownerId: number,
    page: number;
    pageSize: number;
  }>;

  listFile$!: Observable<{
    data: any[],
    ownerId: number,
    page: number;
    pageSize: number;
  }>;

  tab$ = new BehaviorSubject('Ảnh');
  ownerId$ = new BehaviorSubject(0);
  page$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);

  loading = false;

  fileSelected!: number;

  fileNameSelected = '';

  dataFileSelected!: any;

  isActive: boolean = false;

  constructor(
    private courseService : CourseService,
    private fileManagerService: FileManagerService,
    private message: NzMessageService,
    private modal: NzModalRef,
    private modalConfirm :NzModalService,
    private cdr: ChangeDetectorRef,
    private nzContextMenuService: NzContextMenuService,
  ) {}

  ngOnInit() {
    this.courseService.getAllTeacher().subscribe(res => {
      if (res.success) {
        this.listOwner = res.data;
        this.listOwner.unshift({
          fullName: "Tổ chức",
          id: 0
        })
      }
    });

    this.listImg$ = combineLatest([
      this.ownerId$,
      this.page$,
      this.pageSize$,
      this.tab$,
    ])
    .pipe(
      tap(() => {
        this.loading = true;
        this.cdr.detectChanges();
      }),
      mergeMap(([id, page, pageSize, tabName]) => {
        if (tabName === 'Ảnh') {
          if (id !== 0) {
            return this.fileManagerService.getImgByOwner(id, page, pageSize)
              .pipe(
                map((value) => {
                  return {
                    data: value.data.medias,
                    page: value.data.paginationInfo.pageCurrent,
                    pageSize: value.data.paginationInfo.pageSize,
                  }
                }),
                catchError(err => {
                  this.message.error('Lỗi load dữ liệu danh sách file');
                  return of(err.message)
                })
              )
          } else {
            return this.fileManagerService.getImgOrganization(id, page, pageSize)
              .pipe(
                map((value) => {
                  return {
                    data: value.data.medias,
                    page: value.data.paginationInfo.pageCurrent,
                    pageSize: value.data.paginationInfo.pageSize,
                  }
                }),
                catchError(err => {
                  this.message.error('Lỗi load dữ liệu danh sách file');
                  return of(err.message)
                })
              )
          }
        } else {
          return of(null);
        }
      }),
      delay(200),
      tap(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }),
    )

    this.listFile$ = combineLatest([
      this.ownerId$,
      this.page$,
      this.pageSize$,
      this.tab$,
    ])
    .pipe(
      tap(() => {
        this.loading = true;
        this.cdr.detectChanges();
      }),
      mergeMap(([id, page, pageSize, tabName]) => {
        if (tabName === 'File') {
          if (id !== 0) {
            return this.fileManagerService.getFileByOwner(id, page, pageSize)
              .pipe(
                map((value) => {
                  return {
                    data: value.data.medias,
                    page: value.data.paginationInfo.pageCurrent,
                    pageSize: value.data.paginationInfo.pageSize,
                  }
                }),
                catchError(err => {
                  this.message.error('Lỗi load dữ liệu danh sách file');
                  return of(err.message)
                })
              )
          } else {
            return this.fileManagerService.getFileOrganization(id, page, pageSize)
              .pipe(
                map((value) => {
                  return {
                    data: value.data.medias,
                    page: value.data.paginationInfo.pageCurrent,
                    pageSize: value.data.paginationInfo.pageSize,
                  }
                }),
                catchError(err => {
                  this.message.error('Lỗi load dữ liệu danh sách file');
                  return of(err.message)
                })
              )
          }
        } else {
          return of(null);
        }
      }),
      delay(200),
      tap(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }),
    )
  }

  onTabSelect(e: any) {
    this.tab$.next(e.tab.nzTitle);
  }

  onOwnerSelect(e: number) {
    this.selectedOwner = e;
    this.ownerId$.next(e);
  }

  onFileSelect(data: any) {
    this.fileSelected = data.id;
    this.dataFileSelected = data;
  }

  closeModal() {
    this.modal.destroy();
  }

  onChoseFile() {
    this.modal.triggerOk().then();
  }

  uploadFile(e: Event) {
    let files = (e.target as HTMLInputElement).files as FileList;
    const formData = new FormData();
    formData.append('File', files[0]);
    formData.append('TeacherId', this.selectedOwner === 0 ? '' : this.selectedOwner);
    this.fileManagerService.uploadFile(formData).subscribe({
      next: res => {
        if (res.success) {
          this.message.success('Upload file thành công.');
          (e.target as HTMLInputElement).value = '';
          this.pageSize$.next(10);
        } else {
          this.message.error('Có lỗi khi upload file.');
        }
      },
      error: err => {
        this.message.error('Có lỗi khi upload file.');
      }
    })
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, data: any): void {
    this.onFileSelect(data);
    this.nzContextMenuService.create($event, menu);
  }

  deleteFile() {
    this.modalConfirm.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa mục đã chọn ?',
      nzOnOk: () => {
        this.fileManagerService.deleteFile(this.fileSelected).subscribe({
          next: res => {
            if (res.success) {
              this.pageSize$.next(10);
              this.message.success(res.messages);
            } else {
              this.message.error(res.errorMessages)
            }
          },
          error: err => {
            this.message.error('Lỗi xóa file');
          }
        })
      }
    });
  }

  openFakeModel():void {
    this.fileNameSelected = this.dataFileSelected.fileName;
    this.isActive = true;
  }

  closeFakeModel():void {
    this.isActive = false;
  }

  changeFileName() {
    if (this.fileNameSelected === '') {
      this.message.error('Tên file không được để trống');
    } else {
      const data = {
        mediaId: this.fileSelected,
        fileName: this.fileNameSelected,
      }
      this.fileManagerService.changeFileName(data).subscribe({
        next: res => {
          if (res.success) {
            this.pageSize$.next(10);
            this.message.success(res.messages);
            this.isActive = false;
          } else {
            this.message.error(res.errorMessages);
          }
        },
        error: err => {
          this.message.error('Lỗi cập nhật tên file');
        }
      })
    }
  }

  onScroll(e: any) {
    console.log(e)
  }
}
