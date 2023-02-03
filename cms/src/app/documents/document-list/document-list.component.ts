import { Component, Output, EventEmitter,Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  @Input() documents : Document[] = [
    new Document('1', 'Grades',
    'An total of semester grades','www.example.com',
     []),
     new Document('2', 'Blogs', 'TESOL Blog Assignments',
     'www.wordpress.com',[]),
     new Document('3', 'Blogs', 'My LinkedIn Profile',
     'www.linkedin.com',[]),
     new Document('4', 'Git Pages', 'GitHub Assignments',
     'www.github.com',[])
  ];
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
