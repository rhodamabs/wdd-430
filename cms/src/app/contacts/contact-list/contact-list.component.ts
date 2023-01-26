import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model'


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  @Input() contact: Contact[] = [
      new Contact("1", "R. Kent Jackson",
      "jacksonk@byui.edu","208-496-3771","../../assets/images/jacksonk.jpg","null" ),
      new Contact ("1","Rex Barzee",
      "barzeer@byui.edu","208-496-3768", "../../assets/images/barzeer.jpg","null")
    ];

    onSelected(contact : Contact) {
      this.selectedContactEvent.emit(contact);
    }
}
