import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  // documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents : Document[] = [];
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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

  //  deleteDocument(document: Document) {
  //   if (!document) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   this.documentListChangedEvent.next(this.documents.slice());
  // }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
        let currentId = parseInt(document.id);
        if (currentId > maxId) {
        maxId = currentId;
        }
    }
    return maxId;
  }
  addDocument(newDocument: Document) {
    if (!newDocument) {
        return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
      if (!originalDocument || !newDocument) {
          return
      }
      let pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
          return;
      }
      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      let documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
        return;
    }
    let pos = this.documents.indexOf(document);
    if (pos < 0) {
        return;
    }
    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
}
}
