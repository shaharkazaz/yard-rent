import { NgModule } from '@angular/core';
import { ContactPageComponent } from './page/contact-page.component';
import { RouterModule, Routes } from '@angular/router';
import {TranslocoModule} from "@ngneat/transloco";

const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslocoModule],
  declarations: [ContactPageComponent],
})
export class ContactModule {}