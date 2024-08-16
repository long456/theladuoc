import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestimonialComponent} from "./components/testimonial/testimonial.component";
import {CreateTestimonialComponent} from "./components/create-testimonial/create-testimonial.component";


const routes: Routes = [
  {
    path:'',
    component: TestimonialComponent
  },
  {
    path:'create',
    data: {isCreate: true},
    component: CreateTestimonialComponent
  },
  {
    path:':id',
    data: {isCreate: false},
    component: CreateTestimonialComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TestimonialsRoutingModule {}
