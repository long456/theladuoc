import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
  ) { }

  getEventList(page?: any, pageSize?: any, filter?: any): Observable<any>{
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

    return this.http.get('Event', {params: option});
  }

  getEventById(id: number): Observable<any>{
    return this.http.get('Event/' + id);
  }

  createEvent(data: any): Observable<any>{
    return this.http.post('Event', data);
  }

  updateEvent(data: any): Observable<any>{
    return this.http.put('Event', data);
  }

  softDeleteEvent(listId: number[]): Observable<any>{
    return this.http.delete('Event/soft-delete', {body: listId});
  }
}
