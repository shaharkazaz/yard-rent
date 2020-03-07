import { NgModule } from '@angular/core';
import { ContactPageComponent } from './contact-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [ContactPageComponent],
  exports: [ContactPageComponent]
})
export class ContactPageModule {}
