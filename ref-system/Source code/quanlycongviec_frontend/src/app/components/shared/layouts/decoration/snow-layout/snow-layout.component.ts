import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-snow-layout',
  templateUrl: './snow-layout.component.html',
  styleUrls: ['./snow-layout.component.scss']
})
export class SnowLayoutComponent implements OnInit {

  n = 60;
  flakes: Flake[] = [];
  score = new Score();
  interval: number = null;

  constructor(
      private elementRef: ElementRef
  ) { }

  ngOnInit() {

    //if (new Date(Date.now()).getMonth() === 11) {

    //	if (Math.random() > 0.9) {

    this.build();
    this.run();
    //	}
    //}
  }

  getScreenSize(): { w: number, h: number } {
    return {
      w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
  }

  build() {

    const { w, h } = this.getScreenSize();

    for (let i = 0; i < this.n; i++) {

      const flake = new Flake();

      flake.setPosition(
          Math.round(Math.random() * w - 20),
          Math.round(Math.random() * h - 100)
      );

      this.flakes.push(flake);

      this.elementRef.nativeElement.appendChild(this.score.nativeElement);
      this.elementRef.nativeElement.appendChild(flake.nativeElement);
    }
  }

  run() {

    if (this.interval == null) {

      this.interval = window.setInterval(() => {

        const scrollTop = document.querySelector("html").scrollTop;
        const { w, h } = this.getScreenSize();

        this.flakes.forEach(flake => {

          const p = flake.nativeElement.getBoundingClientRect();
          let y = p.top + (1 + Math.random()) * flake.my;

          if (y < 0) {
            y = h;
          }

          if (y > h) {
            y = 0;
          }

          const vx = -3 * flake.mx * (- w * 0.5) / w;
          let x = p.left + Math.random() - 0.5 + vx;

          if (x < 0) {
            x = w - 20;
          }

          if (x > w - 20) {
            x = 0;
          }

          // Change direction
          if (Math.abs(flake.mx) < 4) {

            if (Math.random() < 1e-3) {
              flake.mx *= -1;
            }
          }
          else {
            if (Math.random() < 5e-2) {
              flake.mx *= -1;
            }
            if (Math.random() < 5e-2) {
              flake.my *= -1;
            }
          }

          flake.setPosition(x, y + scrollTop);
        });

        const kills = this.flakes.filter(flake => flake.my === 0).length;
        if(kills > 0) {
          this.score.disp(`${kills} / ${this.n}`);
        }

        // If all flakes are killed
        if (kills === this.n) {

          this.build();
          this.n *= 2;
        }

      }, 50);
    }
  }

  stop() {

    if (this.interval != null) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
  }

}

class Flake {

  nativeElement: HTMLDivElement;
  mx = 1;
  my = 1;

  constructor(
  ) {
    this.nativeElement = document.createElement('div');
    this.nativeElement.style.position = 'fixed';
    this.nativeElement.style.zIndex = '5000';
    this.nativeElement.style.cursor = 'pointer';
    this.nativeElement.style.userSelect = 'none';
    this.nativeElement.style.padding = '1em';
    this.nativeElement.style.fontSize = `${Math.round(10 + 20 * Math.random())}px`;

    this.nativeElement.addEventListener('click', () => {

      switch(Math.abs(this.my)) {

        case 1:
          this.droplet();
          break;

        case 4:
          this.skull();
          break;

        default:
          //this.flake();
          this.nativeElement.style.display = 'none';
          this.mx = 0;
          this.my = 0;
          break;
      }
    });

    this.flake();
  }

  setPosition(x, y) {
    this.nativeElement.style.left = `${x}px`;
    this.nativeElement.style.top = `${y}px`;
  }

  flake() {
    this.mx = Math.sign(this.mx);
    this.my = 1;
    this.nativeElement.innerHTML = '&#10052;';
    this.nativeElement.style.color = '#9999AA';
  }

  droplet() {
    this.mx = Math.sign(this.mx);
    this.my = 4;
    this.nativeElement.innerHTML = '&#128167;';
    this.nativeElement.style.color = 'lightBlue';
  }

  skull() {
    this.mx = Math.sign(this.mx) * 6;
    this.my = -6;
    this.nativeElement.innerHTML = '&#9760;';
    this.nativeElement.style.color = 'darkred';
  }

}

class Score {

  nativeElement: HTMLDivElement;

  constructor() {
    this.nativeElement = document.createElement('div');
    this.nativeElement.style.position = 'fixed';
    this.nativeElement.style.zIndex = '5000';
    this.nativeElement.style.top = '10px';
    this.nativeElement.style.left = '10px';
    this.nativeElement.style.fontSize = '36px';
    this.nativeElement.style.fontWeight = 'bold';
  }

  disp(text: string) {
    this.nativeElement.innerText = text;
  }

}
