import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {CatalogService} from "../../../services/catalog.service";
import {finalize} from "rxjs";
import {Catalog} from "../../../models/Catalog";

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.scss']
})
export class CatalogDetailComponent implements OnInit {
  catalogForm!: FormGroup;
  catalogId!: number;
  isCreate: boolean = false;
  isSubmit: boolean = false;
  loading: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.catalogId = Number(this.route.snapshot.params['id']);

    this.catalogForm = this.fb.group({
      catalogName: [null, [Validators.required]],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const { id } = params;
        this.catalogId = id;
        this.pathDataForm();
      });
    }
  }

  pathDataForm(): void {
    this.catalogService.getCatalogDetail(this.catalogId).subscribe({
      next: res => {
        if (res.success) {
          this.catalogForm.patchValue(res.data);
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
    if (!this.catalogForm.valid) return;


    const catalog: Catalog = {
      ...this.catalogForm.value,
      status: this.catalogForm.value.status? 1 : 0
    }

    this.loading = true;
    const actionCatalog = this.isCreate
      ? this.catalogService.createCatalog(catalog)
      : this.catalogService.updateCatalog({ ...catalog, catalogId: Number(this.catalogId) });

    actionCatalog
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
    this.router.navigate(['page/price-list/catalog']).then();
  }
}
