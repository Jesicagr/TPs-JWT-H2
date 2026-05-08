import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private client: Client;
  private messageSubject = new Subject<string>();
  public lastMessage: string = '';

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8081/ws-backend', 
      onConnect: () => {
        this.client.subscribe('/topic/notificaciones', (message) => {
          this.lastMessage = message.body;
          this.messageSubject.next(message.body);
        });
      }
    });
    this.client.activate();
  }

  getMessages() { return this.messageSubject.asObservable(); }
  sendMessage(msg: string) {
    this.client.publish({ destination: '/app/nueva-compra', body: msg });
  }
}