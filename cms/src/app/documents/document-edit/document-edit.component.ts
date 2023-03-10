import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
   id: string;


  constructor(
    private documents: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) {}


    ngOnInit(){
      this.route.params.subscribe((params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documents.getDocument(this.id);

        if (!this.originalDocument) {
          return;
        }
        this.editMode = true;
        console.log("Edit mode is: "+ this.editMode);
        // copies originalDocument object and into this.document object - no reference passed
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      })
    }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url,
      value.children,
    );
    if (this.editMode) {
      this.documents.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documents.addDocument(newDocument);
    }
    this.editMode = false;
    this.router.navigateByUrl('/documents');
  }

  onCancel() {
    this.router.navigateByUrl('/documents');
  }

}
