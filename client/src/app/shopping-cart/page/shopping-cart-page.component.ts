import { Router } from '@angular/router';
import {
  DatoDialog,
  DatoGridColumnDef,
  DatoGridColumnTypes,
  DatoGridControllerComponent,
  DatoGridFilterTypes,
  DatoGridOptions,
  GeneralGridActions,
  RowAction,
  RowSelectionTypeV2
} from '@datorama/core';
import { take } from 'rxjs/operators';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { UserInfo } from '@yr/auth/state/auth.model';
import { AuthQuery } from '@yr/auth/state/auth.query';
import { Product } from '@yr/marketplace/marketplace.types';
import { formatNumber, stringAsCharSum } from '@yr/shared/utils';

import { OrdersService } from '../orders.service';
import { ShoppingCartQuery } from '../state/shopping-cart.query';
import { ShoppingCartService } from '../state/shopping-cart.service';

type ErroredItem = { _id: string; name: string };

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartPageComponent implements OnInit, AfterViewInit {
  @ViewChild(DatoGridControllerComponent, { static: false })
  private gridController: DatoGridControllerComponent;

  @ViewChild('orderFailed', { static: true }) private orderFailure: TemplateRef<
    any
  >;

  gridOptions: DatoGridOptions = {
    gridName: 'shopping-cart',
    columnDefs: this.getColumns(),
    getRowHeight: ({ node: { rowPinned } }) =>
      rowPinned && rowPinned === 'bottom' ? 35 : 100
  };
  gridActions: GeneralGridActions = { export: false };
  rowActions: RowAction[] = this.getRowActions();
  totalAmount: number;
  user: UserInfo;
  loading: boolean;
  private cartItems: Product[];

  constructor(
    private shoppingCartQuery: ShoppingCartQuery,
    private shoppingCartService: ShoppingCartService,
    private authQuery: AuthQuery,
    private ordersService: OrdersService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: DatoDialog
  ) {}

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

  placeOrder() {
    this.loading = true;
    const orderDetails = {
      rewards: this.totalAmount,
      products: this.cartItems.map(({ _id }) => _id)
    };
    this.ordersService.placeOrder(orderDetails).subscribe(
      ({ orderId, returnDate }) => {
        this.shoppingCartService.clearCart();
        const route = this.router.config.find(r => r.path === 'order-complete');
        const idAsNumber = stringAsCharSum(orderId);
        route.data = { orderId: idAsNumber, orderDetails, returnDate };
        this.router.navigateByUrl('/order-complete');
      },
      ({ error, status }) => {
        this.loading = false;
        this.cdr.detectChanges();
        if (status === 409) {
          const productIds = Object.values(error)
            .flat()
            .map(({ _id }: ErroredItem) => _id);
          this.shoppingCartService.delete(productIds);
          this.dialog.open(this.orderFailure, {
            data: error,
            width: '600px'
          });
        }
      }
    );
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
        cellRenderer: ({ data }) =>
          data.image
            ? `<img class="m-10" height="80" src="${data.image}" />`
            : ''
      },
      {
        headerName: 'cart-table.description',
        field: 'description',
        type: DatoGridColumnTypes.String,
        filter: DatoGridFilterTypes.None,
        sortable: false
      },
      {
        headerName: 'cart-table.rewards',
        field: 'rewards',
        type: DatoGridColumnTypes.Number,
        valueFormatter: ({ value }) =>
          value ? `${formatNumber(value)} ⭐️` : ''
      }
    ];
  }

  private getRowActions(): RowAction[] {
    return [
      {
        key: 'delete',
        label: 'remove-from-cart',
        icon: 'delete',
        visibleWhen: RowSelectionTypeV2.ANY,
        onClick: rows => {
          this.shoppingCartService.delete(rows.map(row => row.data._id));
          this.initGrid();
        }
      }
    ];
  }

  private initGrid() {
    this.cartItems = this.shoppingCartQuery.getAll();
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.rewards,
      0
    );
    this.gridController.gridService.setRows(this.cartItems);
    this.gridController.gridQuery
      .waitForGrid()
      .pipe(take(1))
      .subscribe(() => {
        this.gridController.gridService.api.grid.setPinnedBottomRowData([
          { name: 'Total', rewards: this.totalAmount }
        ]);
      });
  }
}
