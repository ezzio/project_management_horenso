import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.css']
})
export class ReadmoreComponent implements OnInit {
  @Input() content: string;
  @Input() limit: number;
  @Input() completeWords: boolean;
  shortContent: string;
  isContentToggled: boolean;
  nonEditedContent: string;
  constructor() { }

  ngOnInit() {
    this.nonEditedContent = this.content;
    this.shortContent = this.formatContent(this.content);
  }

  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.shortContent = this.isContentToggled ? this.nonEditedContent : this.formatContent(this.content);
  }

  formatContent(content: string) {
    if(content && content.length > this.limit){
      // if (this.completeWords) {
      //   this.limit = content.substr(0, this.limit).lastIndexOf(' ');
      // }
      return `${content.substr(0, this.limit)}...`;
    } else {
      return content;
    }
  }

}
