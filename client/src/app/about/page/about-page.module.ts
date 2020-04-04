import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [AboutPageComponent],
  exports: [AboutPageComponent]
})



export class AboutPageModule {}
