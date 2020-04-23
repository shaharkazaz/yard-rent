import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderCompletePageComponent} from "./page/order-complete-page.component";
import {TranslocoModule} from "@ngneat/transloco";
import {DatoButtonModule, DatoIconModule} from "@datorama/core";
import {CommonModule} from "@angular/common";

const routes: Routes = [{
  path: '',
  component: OrderCompletePageComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes), TranslocoModule, DatoIconModule, DatoButtonModule, CommonModule],
  declarations: [OrderCompletePageComponent]
})
export class OrderCompleteModule {}
