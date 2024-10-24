import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {PriceService} from "../../../services/price.service";
import {finalize} from "rxjs";
import {Price} from "../../../models/Price";
import {CurrencyData} from "../../../../../shared/helper/CurrencyData";
import {Currency} from "../../../../../shared/models/Currency";
import {Catalog} from "../../../models/Catalog";
import {CatalogService} from "../../../services/catalog.service";
import {CurrencyPipe} from "@angular/common";
import {config} from "../../../../../shared/models/ckeditor";

@Component({
  selector: 'app-price-detail',
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.scss']
})
export class PriceDetailComponent implements OnInit{
  priceForm!: FormGroup;
  priceId!: number;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  loading = false;
  currencyData: Currency[] = CurrencyData;
  catalogList: Catalog[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private priceService: PriceService,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.priceId = Number(this.route.snapshot.params['id']);

    this.priceForm = this.fb.group({
      priceListName: [null, [Validators.required]],
      priceValueSix: [null, [Validators.required]],
      priceValueYear: [null, [Validators.required]],
      catalogId: [null, [Validators.required]],
      description: [null],
      currency: ['VND'],
      status: [1],
    });
    this.getDataCatalog();
    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.priceId = id;
        this.pathDataForm();
      });
    }
  }

  getDataCatalog():void {
    this.catalogService.getAllCatalog().subscribe({
      next: res => {
        if (res.success) {
          this.catalogList = res.data.listCatalog;
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
    this.priceService.getPriceDetail(this.priceId).subscribe({
      next: res => {
        if (res.success) {
          this.priceForm.patchValue(res.data);
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
    if (!this.priceForm.valid) return;


    const catalog: Price = {
      ...this.priceForm.value,
      status: this.priceForm.value.status? 1 : 0
    }

    this.loading = true;
    const actionPrice = this.isCreate
      ? this.priceService.createPrice(catalog)
      : this.priceService.updatePrice({ ...catalog, priceListId: Number(this.priceId) });

    actionPrice
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
    this.router.navigate(['page/price-list/price']).then();
  }

  protected readonly ckEditorConfig = config;
}
