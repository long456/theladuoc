import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {take} from "rxjs";
import {FileManagerService} from "../../../../shared/services/file-manager.service";
import {TestimonialService} from "../../services/testimonial.service";

@Component({
  selector: 'app-create-testimonial',
  templateUrl: './create-testimonial.component.html',
  styleUrls: ['./create-testimonial.component.scss']
})
export class CreateTestimonialComponent implements OnInit{
  isCreate: boolean = false;
  isSubmit: boolean = false;
  testimonialForm!: FormGroup;
  testimonialId!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private fileManagerService: FileManagerService,
    private testimonialService: TestimonialService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.testimonialForm = this.fb.group({
      fullName: [null,[Validators.required]],
      position: [null,[Validators.required]],
      starRate: [null],
      avatarImgPath: [null,[Validators.required]],
      videoUrl: [null],
      content: [null,[Validators.required]],
      type: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.testimonialId = id;
        this.testimonialService.getTestimonialById(id).subscribe({
          next: res => {
            if (res.success)
            this.testimonialForm.patchValue(res.data);
          }
        })
      })
    }
  }

  selectFile() {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.testimonialForm.get('avatarImgPath')?.patchValue(data);
    });
  }

  edit() {
    this.isSubmit = true;
    if (this.testimonialForm.valid) {
      const dataTestimonial = {
        ...this.testimonialForm.value,
      }

      if (this.isCreate) {
        this.testimonialService.createTestimonial(dataTestimonial).subscribe({
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
        });
      } else {
        const updateTestimonialData = {
          ...dataTestimonial,
          id: this.testimonialId,
        }
        this.testimonialService.updateTestimonial(updateTestimonialData).subscribe({
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

  navigateBack():void {
    this.router.navigate(['/page/testimonials']);
  }
}
