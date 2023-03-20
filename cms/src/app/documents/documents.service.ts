import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documentListChangedEvent = new Subject<Document[]>();
  documents : Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

   getDocuments() {
    this.http.get('https://wdd430-b4ae9-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      {
        next: (documents: Document[]) => {
          this.documents = documents.sort();
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.log('Something went wrong', error);
        }
      }
    )

   }
   storeDocuments() {
    this.http.put('https://wdd430-b4ae9-default-rtdb.firebaseio.com/documents.json',
      JSON.stringify(this.documents),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).subscribe(
      () => {
        this.documentListChangedEvent.next(this.documents.slice());
      }
    )
  }

   getDocument(id: string): Document {
    return this.documents.find(document => document.id == id)
   }

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
