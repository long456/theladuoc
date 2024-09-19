import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {ResourcesService} from "../../../services/resources.service";
import {take} from "rxjs";
import {FileManagerService} from "../../../../../shared/services/file-manager.service";

@Component({
  selector: 'app-create-resources',
  templateUrl: './create-resources.component.html',
  styleUrls: ['./create-resources.component.scss']
})
export class CreateResourcesComponent implements OnInit{
  isCreate: boolean = false;
  isSubmit: boolean = false;
  eCourseId!: number;
  resourcesId!: number;
  resourcesForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private resourcesService: ResourcesService,
    private fileManagerService: FileManagerService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.eCourseId = Number(this.route.snapshot.params['courseId']);

    this.resourcesForm = this.fb.group({
      name: [null, [Validators.required]],
      fullPath: [null, [Validators.required]],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.resourcesId = id;
        this.resourcesService.getResourcesById(this.resourcesId).subscribe({
          next: res => {
            if (res.success) {
              this.resourcesForm.patchValue(res.data);
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err.error);
          }
        })
      });
    }
  }

  selectFile() {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.resourcesForm.get('fullPath')?.patchValue(data);
    });
  }

  edit():void {
    this.isSubmit = true;
    if (!this.resourcesForm.valid) return;

    const dataResources = {
      ...this.resourcesForm.value,
      status: this.resourcesForm.get('status')?.value ? 1 : 0,
      elearningId: this.eCourseId,
    };
    const action = this.isCreate
      ? this.resourcesService.createResources(dataResources)
      : this.resourcesService.updateResources({ ...dataResources, resourceID: Number(this.resourcesId) });

    action.subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success(res.messages);
          this.navigateBack();
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: (err) => {
        this.message.error(err.message);
      },
    });
  }

  navigateBack():void {
    this.router.navigate(['page/e-course/resources/' + this.eCourseId + '/list']);
  }
}
