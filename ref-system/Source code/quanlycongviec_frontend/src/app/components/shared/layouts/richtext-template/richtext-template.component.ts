import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import * as QuillNamespace from 'quill';
const Quill = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
import {TimerObservable} from 'rxjs-compat/observable/TimerObservable';
import {debounceTime, distinctUntilChanged, takeWhile} from 'rxjs/operators';
import {interval, Observable, Subject} from 'rxjs';
Quill.register('modules/imageResize', ImageResize);
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-richtext-template',
  templateUrl: './richtext-template.component.html',
  styleUrls: ['./richtext-template.component.css'],
})
export class RichtextTemplateComponent implements OnInit {
  content: any;
  editorModules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image']
      ]
    },
    imageResize: true
  };
  @Output() richTextEvent = new EventEmitter<any>();
  @Input() contentHtml: any;
  result: any;
  modelChanged: Subject<string> = new Subject<string>();
  constructor() {
    this.modelChanged.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.richTextEvent.emit(value);
      });
  }
  ngOnInit() {
    if (this.contentHtml){
      this.content = this.contentHtml;
    }

  }
}
