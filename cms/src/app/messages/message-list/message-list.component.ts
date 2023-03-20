import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [MessageService]
})
export class MessageListComponent {
  messages: Message[];


  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages();

    this.messageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );

  }


  onAddMessage(message: Message) {
    this.messages.push(message);
  }


}
