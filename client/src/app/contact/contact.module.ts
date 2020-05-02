import { NgModule } from '@angular/core';
import { ContactPageComponent } from './page/contact-page.component';
import { RouterModule, Routes } from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';
import {BingMapModule} from '../shared/components/bing-map/bing-map.module';

const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes), TranslocoModule, BingMapModule],
  declarations: [ContactPageComponent],
})
export class ContactModule {}
