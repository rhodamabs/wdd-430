import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactListChangedEvent = new Subject<Contact[]>();
  contacts : Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

   getContacts() {
    this.http.get('https://wdd430-b4ae9-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
      {
        next: (contacts: Contact []) => {
          this.contacts= contacts.sort();
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log('Something went wrong', error);
        }
      }
    )

   }
   storeContacts() {
    this.http.put('https://wdd430-b4ae9-default-rtdb.firebaseio.com/documents.json',
      JSON.stringify(this.contacts),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    )
  }

   getContact(id: string):Contact {
    return this.contacts.find(contact => contact.id == id)
   }


  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
        let currentId = parseInt(contact.id);
        if (currentId > maxId) {
        maxId = currentId;
        }
    }
    return maxId;
  }
  addContact(newContact: Contact) {
    if (!newContact) {
        return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
    }

    updateContact(originalContact: Contact, newContact: Contact) {
      if (!originalContact || !newContact) {
          return
      }
      let pos = this.contacts.indexOf(originalContact);
      if (pos < 0) {
          return;
      }
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
      let contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
        return;
    }
    let pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
}

}
