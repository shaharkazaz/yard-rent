import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GettingStartedPageComponent} from "./page/getting-started-page.component";
import {TranslocoModule} from "@ngneat/transloco";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: GettingStartedPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslocoModule, CommonModule],
  declarations: [GettingStartedPageComponent]
})
export class GettingStartedModule {}
