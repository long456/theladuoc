import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterFormService} from "../../services/register-form.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {CourseService} from "../../../setting/services/course.service";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit{

  isCreate = false;

  isSubmit = false;

  formId = 0;

  builderForm!: FormGroup

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

  listCourse: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registerFormService: RegisterFormService,
    private message: NzMessageService,
    private router: Router,
    private courseService: CourseService
  ) {
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate']

    this.builderForm = this.fb.group({
      title: ['', [Validators.required]],
      hasFullName: [true],
      hasEmail: [true],
      hasPhoneNumber: [true],
      hasArea: [false],
      hasGender: [false],
      hasDob: [false],
      hasAddress: [false],
      hasDemand: [false],
      thankYouHtml: [''],
      zaloLink: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      redirectLink: [null],
      courseId: [null,[Validators.required]],
      status: [1]
    })

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.formId = id;

        this.registerFormService.getFormDataById(id).subscribe({
          next: res => {
            this.builderForm.patchValue(res)
          },
          error: err => {
            this.message.error(err.error);
            this.navigateBack();
          }
        })
      })
    }

    this.courseService.getListCourse().subscribe(res => {
      this.listCourse = res;
    })
  }

  editForm() {
    this.isSubmit = true;
    if (this.builderForm.valid) {
      const data = {
        ...this.builderForm.value,
        status: this.builderForm.get('status')?.value ? 1 : 0,
      }

      if (this.isCreate) {
        this.registerFormService.createForm(data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages)
              this.navigateBack()
            } else {
              this.message.error(res.errorMessages)
            }
          },
          error: err => {
            this.message.error(err.error)
          }
        })
      } else {
        this.registerFormService.updateFormDataById(this.formId, data).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages)
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages)
            }
          }
        })
      }

    }
  }

  navigateBack() {
    this.router.navigate(['page/setting/register-form'])
  }

  onCkEditorReady( editor: any ): boolean {
    const result = true;

    return result;
  }
}
