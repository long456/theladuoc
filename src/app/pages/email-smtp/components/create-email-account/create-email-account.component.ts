import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-email-account',
  templateUrl: './create-email-account.component.html',
  styleUrls: ['./create-email-account.component.scss']
})
export class CreateEmailAccountComponent implements OnInit{

  isCreate: boolean = false;

  emailAccountForm! : FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.emailAccountForm = this.fb.group({
      userId : [],
      addressEmail : [],
      name : [],
      host : [],
      userName : [],
      password : [],
      port : [],
      ssl : [true],
      isDefault : [true],
    });
  }

  edit() {

  }

  navigateBack(): void {
    this.router.navigate(['/page/setting/email-account']);
  }
}
