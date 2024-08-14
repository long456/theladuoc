import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(
    private http: HttpClient,
  ) { }

  getTestimonialList(page?: any, pageSize?: any, filter?: any): Observable<any>{
    let option = {
      PageIndex: page,
      pageSize: pageSize,
    }

    if (filter) {
      option = {
        ...filter,
        PageIndex: page,
        pageSize: pageSize,
      }
    }

    return this.http.get('Testimonial', {params: option});
  }

  getTestimonialById(id: number): Observable<any>{
    return this.http.get('Testimonial/' + id);
  }

  createTestimonial(data: any): Observable<any>{
    return this.http.post('Testimonial', data);
  }

  updateTestimonial(data: any): Observable<any>{
    return this.http.put('Testimonial', data);
  }

  softDeleteTestimonials(listId: number[]): Observable<any>{
    return this.http.delete('Testimonial/soft-delete', {body: listId});
  }
}
