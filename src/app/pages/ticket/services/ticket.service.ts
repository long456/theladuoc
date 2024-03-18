import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient,
  ) {}

  getAllTicket(): Observable<any> {

    return this.http.get('Ticket');
  }

  createTicket(data: any): Observable<any>  {
    return this.http.post('Ticket', data);
  }

  getTicketById(id: number): Observable<any>  {
    return this.http.get('Ticket/' + id);
  }
  updateTicketById(id: number, data: any): Observable<any>  {
    return this.http.put('Ticket/' +id ,data);
  }

  softDeleteTicket(data: number[]): Observable<any>  {
    return this.http.delete('Ticket/soft-delete',{body: data});
  }
}
