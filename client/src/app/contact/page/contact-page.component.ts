import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEl', { static: true }) canvasEl: ElementRef;
  addresses: [];
  zoom: number;
  isLoaded: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.zoom = 10;
    this.contactService.getAllShops().subscribe(shops => {
      this.addresses = shops;
      this.isLoaded = true;
    });
  }

  ngAfterViewInit() {
    this.drawCanvas();
  }

  private drawCanvas() {
    const context = (this.canvasEl
      .nativeElement as HTMLCanvasElement).getContext('2d');
    context.font = '15px Arial';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillStyle = 'black';
    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
    context.fillText('@YardRent', x, y);
  }

  openGithub() {
    window.open('https://github.com/shaharkazaz/yard-rent', '_blank');
  }
}
