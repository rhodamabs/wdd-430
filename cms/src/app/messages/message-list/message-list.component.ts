import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  
  messages: Message[] = [
    new Message('1', 'Hello','How are you doing', 'Rhoda Mabundu'),
    new Message('2', 'Good Morning', 'How are you feeling today?','Masiya Mabundu'),
    new Message('3', 'School','I received your report card from the school','Rebecca Mushayawaro')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
