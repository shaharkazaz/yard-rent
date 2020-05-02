import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  // @ts-ignore
  @ViewChild('canvasEl') canvasEl: ElementRef;

  private context: CanvasRenderingContext2D;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    this.draw();
  }

  private draw() {
    this.context.font = '15px Arial';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    this.context.fillStyle = 'black'
    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
    this.context.fillText('@YardRent', x,y);
  }

  open() {
    window.open('https://github.com/shaharkazaz/yard-rent', '_blank')
  }
}
