import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import videojs from 'video.js';

require('videojs-contrib-quality-levels');
require('videojs-hls-quality-selector');

@Component({
  selector: 'app-videostream',
  templateUrl: './videostream.component.html',
  styleUrls: ['./videostream.component.css']
})
export class VideostreamComponent implements OnInit {
  @ViewChild('target', {static: true}) target: ElementRef;
  @Input() titleVideo: string;
  @Input() control = true;
  @Input() autoplay = true;
  @Input() titleVideoEvent: EventEmitter<object>;
  titleVideoResult: any;
  currentTime: any;
  player: videojs.Player;
  poster = '../../../../assets/images/hinhnen.jpg';

  constructor() {
  }

  ngOnInit(): void {
    if (this.titleVideoEvent) {
      this.titleVideoEvent.subscribe((event) => {
        console.log(event);
        this.titleVideoResult = event;
        this.getVideo();
      });
    }
    if (this.titleVideo) {
      this.titleVideoResult = this.titleVideo;
      this.getVideo();
    }
  }

  getVideo() {
    const options = {
      autoplay: this.autoplay,
      controls: this.control,
      sources: [{
        src: 'https://layhen.vn/hls/vod/' + this.titleVideoResult + '/playlist.m3u8',
        type: 'application/x-mpegURL'
      }],
      poster: this.poster
    };
    this.player = videojs(this.target.nativeElement, options, function onPlayerReady() {
      // tslint:disable-next-line:one-variable-per-declaration
      const myPlayer = this, id = myPlayer.id();
      myPlayer.hlsQualitySelector();
    });
  }

  getImage(){

  }
}
