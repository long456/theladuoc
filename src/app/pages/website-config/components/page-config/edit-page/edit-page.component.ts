import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {PageConfigService} from "../../../services/page-config.service";
import {debounceTime, distinctUntilChanged, fromEvent, map} from "rxjs";
import {config} from "../../../../../shared/models/ckeditor";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit{
  @ViewChild('pageName') pageNameField!: ElementRef;
  pageForm!: FormGroup;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  ckEditorConfig: any = config;
  pageId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private pageConfigService: PageConfigService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.pageForm = this.fb.group({
      name: [null, [Validators.required]],
      contentHtml: [null],
      slug: [null, [Validators.pattern('^[a-zA-Z0-9\\-]+$')]],
      description: [null],
      seoImage: [null],
      type: [1],
      websiteConfigId: [],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.pageId = id;

        this.pageConfigService.getPageById(id).subscribe({
          next: res => {
            if (res) {
              const dataPage = {
                ...res,
                name: res.pageName,
              }
              this.pageForm.patchValue(dataPage);
            }
          }
        })
      });
    }
  }

  ngAfterViewInit() {
    fromEvent(this.pageNameField.nativeElement, 'keydown')
      .pipe(
        debounceTime(250),
        map((event: any) => event.target.value.trim()),
        distinctUntilChanged()
      )
      .subscribe(inputData => {
        const slug = this.renderSlug(inputData);
        this.pageForm.get('slug')?.patchValue(slug);
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

  edit():void {
    this.isSubmit = true;
    if (this.pageForm.valid) {
      const pageFormData = {
        ...this.pageForm.value,
      }

      if (this.isCreate) {
        this.pageConfigService.createPage(pageFormData).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error('Lỗi tạo trang');
          }
        });
      } else {
        this.pageConfigService.updatePage(pageFormData, this.pageId).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
        });
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/setting/website-config/page-config']);
  }
}
