import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from '@datorama/core/lib/carousel/carousel.types';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  constructor() {}

  cofounders = [
    {
    name: 'Niv',
    role: 'DevOps Engineer at Microsoft',
    img: '../../../assets/images/co-founders/Niv.jpg'
    },
    {
      name: 'Shahar',
      role: 'Front End Architect at Datorama',
      img: '../../../assets/images/co-founders/Shahar.jpg'
    },
    {
      name: 'Ayelet',
      role: 'Software Engineer at Deep Instinct',
      img: '../../../assets/images/co-founders/Ayelet.jpg'
    },
    {
      name: 'Chen',
      role: 'Software Engineer at AnyVision',
      img: '../../../assets/images/co-founders/Chen.jpg'
    }
  ]



  ngOnInit() {}
}
