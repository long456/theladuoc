import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ELearningConfigService} from "../../services/config.service";
import {finalize} from "rxjs";
import {GeneralConfig} from "../../models/GeneralConfig";

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.scss']
})
export class GeneralConfigComponent implements OnInit{
  generalConfigForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private fb: FormBuilder,
    private eLearningConfigService: ELearningConfigService,
  ) {}

  ngOnInit() {
    this.generalConfigForm = this.fb.group({
      colorMain: ['#fff'],
      colorTextButton: ['#fff'],
      colorTextTitle: ['#fff'],
      colorTextDesc: ['#fff'],
      header: this.fb.group({
        backgroundColor: ['#fff'],
        logo: [null],
        textColor: ['#fff'],
      }),
      footer: this.fb.group({
        backgroundColor: ['#fff'],
        logo: [null],
        textColor: ['#fff'],
        linkBCT: [null],
      })
    })

    this.pathDataForm();
  }

  pathDataForm(): void {
    this.eLearningConfigService.getGeneralConfig().subscribe({
      next: res => {
        if (res.success) {
          this.generalConfigForm.patchValue(res.data);
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err? err.message : 'Lỗi lấy cấu hình chung');
      }
    })
  }

  edit():void{
    const generalConf: GeneralConfig = {
      ...this.generalConfigForm.value
    }

    this.eLearningConfigService.updateGeneralConfig(generalConf)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.message.success(res.messages);
            this.navigateBack();
          } else {
            this.message.error(res.errorMessages);
          }
        },
        error: (err) => {
          this.message.error(err);
        },
    })
  }

  navigateBack(): void {
    this.router.navigate(['page/e-learning-config/list']);
  }
}
