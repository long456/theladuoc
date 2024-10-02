import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.scss']
})
export class AddAgencyComponent implements OnInit{
  readonly nzModalData = inject(NZ_MODAL_DATA);
  agencyForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.agencyForm = this.fb.group({
      studentId: [null],
      name: [null],
      agentCode: [null, [Validators.required, Validators.maxLength(5)]],
    })
    this.pathDataForm();
  }

  pathDataForm(): void {
    if (this.nzModalData) {
      const dataForm = {
        name: this.nzModalData.fullName,
        studentId: this.nzModalData.id
      }
      this.agencyForm.patchValue(dataForm);
    }
  }
}
