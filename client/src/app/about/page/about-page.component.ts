import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {
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

}
