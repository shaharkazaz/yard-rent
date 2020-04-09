import { Component } from '@angular/core';
import { CarouselConfig } from '@datorama/core/lib/carousel/carousel.types';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {
  constructor() {}
  private readonly generalPath = '../../../assets/images/co-founders/'
  founders = [
    {
      name: 'Niv',
      role: 'DevOps Engineer at Microsoft',
    },
    {
      name: 'Shahar',
      role: 'Front End Architect at Datorama',
    },
    {
      name: 'Ayelet',
      role: 'Software Engineer at Deep Instinct',
    },
    {
      name: 'Chen',
      role: 'Software Engineer at AnyVision',
    }
  ]
  private getFounderImage(name){
    return this.generalPath + name + '.jpg';
  }


}
