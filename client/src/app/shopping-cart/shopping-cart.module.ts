import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingCartPageComponent} from "./page/shopping-cart-page.component";
import {
  DatoButtonModule,
  DatoDirectivesModule,
  DatoGridV2Module,
  DatoIconModule,
  DatoLinkButtonModule
} from "@datorama/core";
import {TranslocoModule} from "@ngneat/transloco";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), DatoGridV2Module, DatoButtonModule, TranslocoModule, DatoDirectivesModule, CommonModule, DatoIconModule, DatoLinkButtonModule],
  declarations: [ShoppingCartPageComponent]
})
export class ShoppingCartModule {}
