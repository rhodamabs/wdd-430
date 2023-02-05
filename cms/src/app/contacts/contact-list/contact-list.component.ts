import { Component, Input,  OnInit } from '@angular/core';
import { Contact } from '../contact.model'
import { ContactService } from './../contact.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{


  @Input() contact: Contact[];
    constructor(private contactService : ContactService) {}

    ngOnInit(){
        this.contact = this.contactService.getContacts();
    }

    onSelected(contact : Contact) {
      this.contactService.contactSelectedEvent.emit(contact);
    }
}
