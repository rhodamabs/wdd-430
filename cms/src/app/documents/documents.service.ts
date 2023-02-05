import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents : Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments() : Document[] {
    return this.documents.slice();
   }

   getDocument(id: string): Document {
    for (let doc of this.documents) {
      if (doc.id === id) {
        return doc;
      }
    }
    return null;
   }
}
