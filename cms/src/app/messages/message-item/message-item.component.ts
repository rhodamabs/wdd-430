import { Component, Input, OnInit} from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from './../../contacts/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{
  @Input() message: Message;
  messageSender: string;
  subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    let contact : Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name ?? "loading..";
    this.subscription = this.contactService.contactListChangedEvent.subscribe(()=>{
        contact = this.contactService.getContact(this.message.sender);
        this.messageSender = contact?.name ?? "-";
      }
    )
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }
  }
