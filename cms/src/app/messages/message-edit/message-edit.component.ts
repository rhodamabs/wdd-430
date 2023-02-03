import { Component, ElementRef, ViewChild , EventEmitter,Output} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Rhoda Mabundu';

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const newMessage = new Message('1',subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);

  }
  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';

  }
}
