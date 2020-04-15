import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {
  DatoGridColumnDef,
  DatoGridColumnTypes,
  DatoGridControllerComponent, DatoGridFilterTypes,
  DatoGridOptions, GeneralGridActions,
  RowAction,
  RowSelectionTypeV2
} from "@datorama/core";
import {ShoppingCartQuery} from "../state/shopping-cart.query";
import {take} from "rxjs/operators";
import {ShoppingCartService} from "../state/shopping-cart.service";
import {AuthQuery} from "../../auth/state/auth.query";
import {User} from "../../auth/state/auth.model";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartPageComponent implements OnInit, AfterViewInit{
  @ViewChild(DatoGridControllerComponent, { static: false })
  private gridController: DatoGridControllerComponent;
  gridOptions: DatoGridOptions = {
    gridName: 'shopping-cart',
    columnDefs: this.getColumns(),
    getRowHeight: ({node: { rowPinned }}) => rowPinned && rowPinned === 'bottom' ? 35 : 100
  };
  gridActions: GeneralGridActions = {export: false};
  rowActions: RowAction[] = this.getRowActions();
  totalAmount: number;
  user: User;
  constructor(private shoppingCartQuery: ShoppingCartQuery, private shoppingCartService: ShoppingCartService, private authQuery: AuthQuery) {}

  ngOnInit() {
    this.user = this.authQuery.getValue().user;
  }

  ngAfterViewInit() {
    this.hasItems && this.initGrid();
  }

  get hasItems() {
    return this.shoppingCartQuery.getCount() > 0;
  }

  get hasEnoughRewards() {
    return this.totalAmount <= this.user.rewards;
  }

  private getColumns(): DatoGridColumnDef[] {
    return [
      {
        headerName: 'cart-table.name',
        field: 'name',
        type: DatoGridColumnTypes.String
      },
      {
        headerName: 'cart-table.image',
        field: 'image',
        filter: DatoGridFilterTypes.None,
        sortable: false,
        cellRenderer: ({data}) => data.image ? `<img class="m-10" height="80" src="${data.image}" />` : ''
      },
      {
        headerName: 'cart-table.description',
        field: 'description',
        type: DatoGridColumnTypes.String,
        filter: DatoGridFilterTypes.None,
        sortable: false,
      },
      {
        headerName: 'cart-table.rewards',
        field: 'rewards',
        type: DatoGridColumnTypes.Number,
        valueFormatter: ({data}) => data.rewards ? `${data.rewards} ⭐️` : ''
      },
    ];
  }

  private getRowActions(): RowAction[] {
    return [
      {
        key: 'delete',
        label: 'remove-from-cart',
        icon: 'delete',
        visibleWhen: RowSelectionTypeV2.ANY,
        onClick: (rows) => {
          this.shoppingCartService.delete(rows.map((row) => row.data._id));
          this.initGrid();
        }
      }
    ];
  }

  private initGrid() {
    const cartItems = this.shoppingCartQuery.getAll();
    this.totalAmount = cartItems.reduce((sum, item) => sum + item.rewards, 0);
    this.gridController.gridService.setRows(cartItems);
    this.gridController.gridQuery.waitForGrid().pipe(take(1)).subscribe(() => {
      this.gridController.gridService.api.grid.setPinnedBottomRowData([{name: 'Total', rewards: this.totalAmount}]);
    });
  }

}
