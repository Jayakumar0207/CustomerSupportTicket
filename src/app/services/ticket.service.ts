import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ticket } from '../model/ticket.model';

export interface TicketPayload {
  userId: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private httpClient: HttpClient) {}

  CreateTicket(data: TicketPayload): Observable<any> {
    return this.httpClient.post(
      environment.jsonTicketApi + '/CreateTicket',
      data
    );
  }
  GetAllTicketbyUserID(userID: string): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(
      environment.jsonTicketApi + '/GetTicketsByUserId',
      {
        params: { userid: userID },
      }
    );
  }
  GetTicketDetails(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(environment.jsonApi + '/ticket' + id, {
      observe: 'response',
    });
  }
  GetTicketComments(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(
      environment.jsonApi + '/ticket' + id + '/comments',
      { observe: 'response' }
    );
  }
}
