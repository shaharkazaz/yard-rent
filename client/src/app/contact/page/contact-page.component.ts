import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements AfterViewInit {

  @ViewChild('canvasEl', {static: true}) canvasEl: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.drawCanvas();
  }

  private drawCanvas() {
    const context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    context.font = '15px Arial';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillStyle = 'black'
    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
    context.fillText('@YardRent', x,y);
  }

  openGithub() {
    window.open('https://github.com/shaharkazaz/yard-rent', '_blank')
  }
}
