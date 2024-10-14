import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../../services/catalog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthService} from "../../../../../layouts/auth-layout/auth/services/auth.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-benefit-config',
  templateUrl: './benefit-config.component.html',
  styleUrls: ['./benefit-config.component.scss']
})
export class BenefitConfigComponent implements OnInit{
  catalogId!: number;
  listBenefitPackage: any[] = [];
  listPrice: any[] = [];
  editId: string | null = null;
  loading: boolean = false;
  catalogData!: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private catalogService: CatalogService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.catalogId = Number(this.route.snapshot.params['id']);
    if (this.catalogId) {
      this.pathDataForm();
    }
  }

  pathDataForm(): void {
    this.catalogService.getCatalogDetail(this.catalogId).subscribe({
      next: res => {
        if (res.success) {
          this.catalogData = res.data
          this.listBenefitPackage = res.data.data;
          this.listPrice = res.data.listPriceList;
        } else {
          this.message.error(res.errorMessages);
        }
      },
      error: err => {
        this.message.error(err);
      }
    })
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addPackage():void {
    const benefitPackage = {
      groupName: '',
      createBySA: this.authService.isSuperAdmin(),
      benefits: []
    }

    this.listBenefitPackage.push(benefitPackage);
  }

  removePackage(index: number): void {
    this.listBenefitPackage.splice(index, 1);
  }

  addBenefit(list: any[], index: number): void {
    const benefit = {
      benefitId: index.toString() + list.length,
      benefitName: "",
      priceListIds: []
    }
    list.push(benefit);
  }

  removeBenefit(id: number, arr: any):void {
    arr.benefits.splice(id, 1);
  }

  onChecked(id: number, data: any): void{
    const index = data.indexOf(id);
    if (index > -1) {
      data.splice(index, 1);
    } else {
      data.push(id);
    }
  }

  updateSingleChecked(id: number, data: any): boolean {
    return data.includes(id);
  }

  edit(): void {
    const data = {
      ...this.catalogData,
      data: this.listBenefitPackage
    };
    this.catalogService.updateBenefitCatalog(data)
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

  navigateBack():void {
    // navigate đến trang danh sách
    this.router.navigate(['page/price-list/catalog']).then();
  }
}
