import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from '@datorama/core/lib/carousel/carousel.types';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  constructor() {}
  generalPath = '../../../assets/images/co-founders/'
  cofounders = [
    {
    name: 'Niv',
    role: 'DevOps Engineer at Microsoft',
    img:  this.generalPath + 'Niv.jpg'
    },
    {
      name: 'Shahar',
      role: 'Front End Architect at Datorama',
      img: this.generalPath + 'Shahar.jpg'
    },
    {
      name: 'Ayelet',
      role: 'Software Engineer at Deep Instinct',
      img: this.generalPath + 'Ayelet.jpg'
    },
    {
      name: 'Chen',
      role: 'Software Engineer at AnyVision',
      img: this.generalPath + 'Chen.jpg'
    }
  ]

}
