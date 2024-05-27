import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {teacher} from "../../../setting/models/course";
import {CourseService} from "../../../setting/services/course.service";
import {PublicationService} from "../../services/publication.service";
import {NzMessageService} from "ng-zorro-antd/message";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.scss']
})
export class CreatePublicationComponent implements OnInit{

  @ViewChild('canvas') myCanvas!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  @HostListener('paste', ['$event']) onPaste(e: any) {
    const items = e.clipboardData.items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }
    if (blob !== null) {
      this.fileBackground = blob;
      this.nameFilePreview = blob.name;
      this.blobToDataUrl(blob);
    } else {
      this.message.error('Chưa có file nào được copy hoặc định dạng file copy không hợp lệ')
    }
  }

  isCreate: boolean = false;
  isSubmit: boolean = false;

  backgroundImgList: any[] = [];

  textColorValue = 'Chọn màu';

  type: 'type1' | 'type2' | 'type3' = "type1" ;

  bgImgSrc: any = '/assets/img/vip1.png';

  nameFilePreview!: string;

  publicationForm!: FormGroup;

  listTeacher: teacher[] = [];

  fileBackground!: File;

  publicationId!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private courseService : CourseService,
    private publicationService: PublicationService,
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.publicationForm = this.fb.group({
      name: ['', [Validators.required]],
      ownerId: [''],
      slug: [''],
    });

    this.courseService.getAllTeacher().subscribe(res => {
      if (res.success) {
        this.listTeacher = res.data;
      }
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.publicationId = id;
        this.publicationService.getPublicationById(id).subscribe({
          next: res => {
            this.publicationForm.patchValue(res);
          }
        })
      })
    }
  }

  formatter(value: number): string{
    return `${value}%`;
  }

  formatterFontSize(value: number): string{
    return `${value}px`;
  }

  active(element: any) {
    element.click()
  }

  onColorChange(e: any): void {
    this.textColorValue = e.target.value
  }

  onTypeChange() {
    this.fileInput.nativeElement.value = "";
    this.nameFilePreview = '';
    if (this.type === 'type1') {
      this.bgImgSrc = '/assets/img/vip1.png';
      return;
    }

    if (this.type === 'type2') {
      this.bgImgSrc = '/assets/img/vip2.png';
      return;
    }

    if (this.type === 'type3') {
      this.bgImgSrc = '/assets/img/vip3.png';
      return;
    }
  }

  blobToDataUrl(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.bgImgSrc = e.target?.result;
    }
    reader.readAsDataURL(file)
  }

  uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    this.nameFilePreview = files[0].name
    this.fileBackground = files[0];
    this.blobToDataUrl(files[0]);
  }

  edit() {
    this.isSubmit = true;
    if (!this.fileBackground) {
      this.message.error('Chưa upload ảnh nền');
      return;
    }

    if (this.publicationForm.valid) {
      const formData = new FormData();
      formData.append('File', this.fileBackground, this.publicationForm.value.name + '.png');
      for ( let key in this.publicationForm.value ) {
        formData.append(key, this.publicationForm.value[key]);
      }
      if (this.isCreate) {
        this.publicationService.createPublication(formData).subscribe({
          next: res => {
            this.message.success(res.messages);
            this.navigateBack();
          },
          error: err => {
            this.message.error(err);
          }
        });
      } else {
        formData.append('id', this.publicationId);
        this.publicationService.updatePublication(formData).subscribe({
          next: res => {
            this.message.success(res.messages);
            this.navigateBack();
          },
          error: err => {
            this.message.error(err);
          }
        });
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/publication']);
  }

}
