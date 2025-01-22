import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private dbUrl = '/assets/db.json';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any> {
    return this.http.get<any>(this.dbUrl);
  }

  sendMessage(message: any): Observable<any> {
    // This method can be used to send messages if needed
    return new Observable(observer => {
      observer.next(message);
      observer.complete();
    });
  }
}
