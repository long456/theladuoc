import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit{

  isCreate = false;

  constructor() {
  }

  ngOnInit() {
  }

  editForm() {}

  navigateBack() {

  }
}
