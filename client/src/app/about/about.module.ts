import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './page/about-page.component';
import {CommonModule} from '@angular/common';
import {TranslocoModule} from "@ngneat/transloco";

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, TranslocoModule],
  declarations: [AboutPageComponent],
  exports: [AboutPageComponent]
})



export class AboutModule {}
