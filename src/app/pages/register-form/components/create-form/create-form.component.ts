import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit{

  isCreate = false;

  isSubmit = false;

  builderForm!: FormGroup

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.builderForm = this.fb.group({
      title: [''],
      hasFullName: [true],
      hasEmail: [true],
      hasPhoneNumber: [true],
      hasArea: [false],
      hasGender: [false],
      hasDob: [false],
      hasAddress: [false],
      hasDemand: [false],
      thankYouHtml: [''],
      status: []
    })
  }

  editForm() {}

  navigateBack() {

  }
}
