import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  private maxMessageId: number;

  constructor(private http: HttpClient ) {
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
        let currentId = parseInt(message.id);
        if (currentId > maxId) {
        maxId = currentId;
        }
    }
    return maxId;
  }

  getMessages() {
    this.http.get<Message[]>('https://wdd430-b4ae9-default-rtdb.firebaseio.com/messages.json').subscribe(
      {
        next: (messages: Message[]) => {
          this.messages = messages.sort();
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log("GET request complete.");
        }
      }
    )
  }

  storeMessages() {
    this.http.put('https://wdd430-b4ae9-default-rtdb.firebaseio.com/messages.json',
      JSON.stringify(this.messages),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).subscribe(
      () => {
        this.messageChangedEvent.next(this.messages.slice());
      }
    )
  }

  getMessage(id: string): Message | undefined {
  
    return this.messages.find(message => message.id == id)
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

}