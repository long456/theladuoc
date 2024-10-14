import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Catalog} from "../../../models/Catalog";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {BenefitService} from "../../../services/benefit.service";
import {CatalogService} from "../../../services/catalog.service";
import {finalize} from "rxjs";
import {BenefitGroup} from "../../../models/BenefitGroup";

@Component({
  selector: 'app-benefit-detail',
  templateUrl: './benefit-detail.component.html',
  styleUrls: ['./benefit-detail.component.scss']
})
export class BenefitDetailComponent implements OnInit{
  benefitForm!: FormGroup;
  benefitId!: number;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  loading = false;
  catalogList: Catalog[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private benefitService: BenefitService,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.benefitId = Number(this.route.snapshot.params['id']);

    this.benefitForm = this.fb.group({
      name: [null, [Validators.required]],
      catalogId: [null, [Validators.required]],
    });
    this.getDataCatalog();
    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.benefitId = id;
        this.pathDataForm();
      });
    }
  }

  getDataCatalog():void {
    this.catalogService.getAllCatalog().subscribe({
      next: res => {
        if (res.success) {
          this.catalogList = res.data;
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err);
      }
    })
  }

  pathDataForm(): void {
    this.benefitService.getBenefitGroupDetail(this.benefitId).subscribe({
      next: res => {
        if (res.success) {
          this.benefitForm.patchValue(res.data);
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err);
      }
    })
  }

  edit():void {
    this.isSubmit = true;
    if (!this.benefitForm.valid) return;


    const benefit: BenefitGroup = {
      ...this.benefitForm.value,
      status: this.benefitForm.value.status? 1 : 0
    }

    this.loading = true;
    const actionBenefit = this.isCreate
      ? this.benefitService.createBenefitGroup(benefit)
      : this.benefitService.updateBenefitGroup({ ...benefit, id: Number(this.benefitId) });

    actionBenefit
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
      });
  }

  navigateBack():void {
    // navigate đến trang danh sách
    this.router.navigate(['page/price-list/benefit-group']).then();
  }
}
