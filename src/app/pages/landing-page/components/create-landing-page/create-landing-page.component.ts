import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {debounceTime, distinctUntilChanged, fromEvent, map} from "rxjs";
import {LandingPageService} from "../../services/landing-page.service";
import {CourseService} from "../../../setting/services/course.service";

@Component({
  selector: 'app-create-landing-page',
  templateUrl: './create-landing-page.component.html',
  styleUrls: ['./create-landing-page.component.scss']
})
export class CreateLandingPageComponent implements OnInit, AfterViewInit{

  @ViewChild('landingPageName') landingPageName!: ElementRef;

  isCreate: boolean = false;

  isSubmit: boolean = false;

  landingPageForm!: FormGroup;

  ckEditorConfig: any = {
    toolbar: [
      ['Source', 'Templates', 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'],
      [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
      [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ],
      [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ],
      [ 'Link', 'Unlink', 'Anchor' ],
      [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ],
      [ 'Styles', 'Format', 'Font', 'FontSize' ],
      [ 'TextColor', 'BGColor' ],
      [ 'Maximize', 'ShowBlocks' ]
    ],
    extraAllowedContent: 'style meta script section svg;link[!href,target];a[!href,target]'
  };

  landingPageId = 0;

  listCourse: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private landingPageService: LandingPageService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.landingPageForm = this.fb.group({
      name: [null, [Validators.required]],
      status: [1],
      courseId: [null, [Validators.required]],
      landingPageCode: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      htmlContent: [],
      pixelCode: [],
      seoOgTag: [],
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.landingPageId = id;
        this.landingPageService.getLandingPageById(id).subscribe({
          next: res => {
            this.landingPageForm.patchValue(res)
          }
        })
      })
    }

    this.courseService.getListCourse().subscribe(res => {
      this.listCourse = res;
    })
  }

  ngAfterViewInit() {
    fromEvent(this.landingPageName.nativeElement, 'keydown')
      .pipe(
        debounceTime(250),
        map((event: any) => event.target.value.trim()),
        distinctUntilChanged()
      )
      .subscribe(inputData => {
        const slug = this.renderSlug(inputData);
        this.landingPageForm.get('landingPageCode')?.patchValue(slug);
      });
  }

  renderSlug(str : any) {
    return str
      .toLowerCase() // Convert to lowercase
      .normalize("NFD") // Normalize Unicode
      .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
      .replace(/đ/g, "d") // Replace đ with d
      .replace(/[^\w\s-]/g, '') // Remove non-word characters except space and hyphen
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove consecutive hyphens
      .trim(); // Trim leading and trailing spaces
  }

  edit() {
    this.isSubmit = true;
    if (this.landingPageForm.valid) {
      const data = {
        ...this.landingPageForm.value,
        courseId: parseInt(this.landingPageForm.get('courseId')?.value),
        status: this.landingPageForm.get('status')?.value ? 1 : 0,
      }

      if (this.isCreate) {
        this.landingPageService.createLandingPage(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err.error);
          }
        })
      } else {
        this.landingPageService.updateLandingPage(this.landingPageId, data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
        })
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/landing-page']);
  }
}
