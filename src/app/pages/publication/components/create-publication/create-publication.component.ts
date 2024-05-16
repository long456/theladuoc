import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  isSubmit: boolean = false;

  backgroundImgList: any[] = [];

  textColorValue = 'Chọn màu';

  type: 'type1' | 'type2' | 'type3' = "type1" ;

  bgImgSrc: any = '/assets/img/vip1.png';

  nameFilePreview!: string;

  publicationForm!: FormGroup;

  listTeacher: teacher[] = [];

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
    this.publicationForm = this.fb.group({
      Name: ['', [Validators.required]],
      OwnerId: [''],
      Slug: [''],
    });

    this.courseService.getAllTeacher().subscribe(res => {
      if (res.success) {
        this.listTeacher = res.data;
      }
    })
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

  uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    this.nameFilePreview = files[0].name
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      this.bgImgSrc = reader.result as string;
    }
  }

  edit() {
    if (this.publicationForm.valid) {
      html2canvas(this.myCanvas.nativeElement).then(
        canvas => {
          canvas.toBlob((blob:any) => {
            const formData = new FormData();
            formData.append('File', blob, this.publicationForm.value.Name + '.png');
            for ( let key in this.publicationForm.value ) {
              formData.append(key, this.publicationForm.value[key]);
            }

            this.publicationService.createPublication(formData).subscribe({
              next: res => {
                this.message.success(res.messages);
                this.navigateBack();
              },
              error: err => {
                this.message.error(err);
              }
            })
          })
        }
      );
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/publication']);
  }

}
