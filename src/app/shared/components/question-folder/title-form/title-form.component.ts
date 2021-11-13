import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, ViewChild } from '@angular/core';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['../form.component.scss']
})
export class TitleFormComponent implements OnInit {
  Editor = ClassicEditor;
  @Input() title = '';
  @Output() setTitle = new EventEmitter<string>();
  @ViewChild('editor') editorComponent: CKEditorComponent;

  constructor() { }

  ngOnInit(): void {

  }


  get editorInstance() {
    return this.editorComponent.editorInstance;
  }

  resetTitle() {
    this.editorInstance.setData('');
  }


  /* event handler */
  onReady(e: any) {
    
  }

  onChange( { editor } : ChangeEvent ) {
    this.setTitle.emit(editor.getData())
  }

  onResetTitle() {
    this.resetTitle();
  }
  
}
