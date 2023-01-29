import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message: Message;

  @Output() messageAdded = new EventEmitter<Message>();

  onAddMessage() {
    this.messageAdded.emit();
  }

}
