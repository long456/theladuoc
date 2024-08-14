import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestimonialsRoutingModule} from "./testimonials-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { CreateTestimonialComponent } from './components/create-testimonial/create-testimonial.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    TestimonialComponent,
    CreateTestimonialComponent
  ],
  imports: [
    CommonModule,
    TestimonialsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzRateModule,
    NzSelectModule
  ]
})
export class TestimonialsModule { }
