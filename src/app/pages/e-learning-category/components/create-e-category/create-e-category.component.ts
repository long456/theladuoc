import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileManagerService} from "../../../../shared/services/file-manager.service";
import {take} from "rxjs";
import {ELearningServicesService} from "../../services/e-learning-services.service";

@Component({
  selector: 'app-create-e-category',
  templateUrl: './create-e-category.component.html',
  styleUrls: ['./create-e-category.component.scss']
})
export class CreateECategoryComponent implements OnInit{
  isCreate: boolean = false;
  isSubmit: boolean = false;
  categoryForm!: FormGroup;
  categoryId!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private eLearningServicesService: ELearningServicesService,
    private fileManagerService: FileManagerService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];

    this.categoryForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.maxLength(200)]],
      iconPath: [''],
      status: [1],
      priority: [0],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.categoryId = id;

        this.eLearningServicesService.getCategoryById(this.categoryId).subscribe({
          next: res => {
            if (res.success) {
              this.categoryForm.patchValue(res.data);
            }
          }
        })
      });
    }
  }

  selectFile() {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.categoryForm.get('iconPath')?.patchValue(data);
    });
  }

  edit() {
    this.isSubmit  = true;
    if (this.categoryForm.valid) {
      const data = {
        ...this.categoryForm.value,
      }

      if (this.isCreate) {
        this.eLearningServicesService.createCategory(data).subscribe(
          {
            next: res => {
              if (res.success) {
                this.message.success('Tạo danh mục thành công');
                this.navigateBack();
              } else {
                this.message.error(res.errorMessages)
              }
            },
            error: err => {}
          })
      } else {
        const categoryData = {
          ...data,
          categoryId: this.categoryId,
        }

        this.eLearningServicesService.updateCategory(categoryData).subscribe(
          {
            next: res => {
              if (res.success) {
                this.message.success('Cập nhật danh mục thành công');
                this.navigateBack();
              } else {
                this.message.error(res.errorMessages)
              }
            },
            error: err => {}
          })
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/page/e-category']);
  }
}
