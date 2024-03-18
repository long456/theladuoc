import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RegisterFormService} from "../../services/register-form.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit{

  isCreate = false;

  isSubmit = false;

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registerFormService: RegisterFormService,
    private message: NzMessageService,
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
      thankYouUrl: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      zaloLink: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      redirectLink: [null, Validators.pattern('^[a-zA-Z0-9\\-]+$')],
      status: [1]
    })
  }

  editForm() {
    this.isSubmit = true;
    if (this.builderForm.valid) {
      const data = {
        ...this.builderForm.value,

        status: this.builderForm.get('status')?.value ? 1 : 0,
      }
      delete data.title,

      this.registerFormService.createForm(data).subscribe({
        next: res => {
          if (res.success) {
            this.message.success(res.messages)
          } else {
            this.message.error(res.errorMessages)
          }
        },
        error: err => {
          console.log(err)
          this.message.error(err)
        }
      })
    }
    console.log(this.builderForm.value)
  }

  navigateBack() {

  }

  onCkEditorReady( editor: any ): boolean {
    const result = true;
    // editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    //   return new UploadAdapter (loader, {}, currentComponent.httpClient);
    // };


    // console.log('editor');
    // console.log(editor);

    return result;
  }
}
