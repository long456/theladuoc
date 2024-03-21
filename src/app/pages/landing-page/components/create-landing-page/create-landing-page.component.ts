import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {debounceTime, distinctUntilChanged, fromEvent, map} from "rxjs";

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



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.landingPageForm = this.fb.group({
      name: [null, [Validators.required]],
      status: [1],
      courseId: [null, [Validators.required]],
      websiteId: [null],
      landingPageCode: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      htmlContent: [],
      pixelCode: [],
      seoOgTag: [],
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
    console.log(this.landingPageForm.value)
  }

  navigateBack() {
    this.router.navigate(['/page/setting/landing-page']);
  }
}
