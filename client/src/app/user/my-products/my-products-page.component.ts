import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DatoGridColumnDef,
  DatoGridColumnTypes,
  DatoGridControllerComponent, DatoGridFilterTypes,
  DatoGridOptions,
  RowAction
} from '@datorama/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./my-products-page.component.scss']
})
export class MyProductsPageComponent implements OnInit {
  @ViewChild(DatoGridControllerComponent, { static: true })
  private gridController: DatoGridControllerComponent;
  gridOptions: DatoGridOptions = {
    gridName: 'my-products',
    columnDefs: this.getColumns(),
    rowHeight: 100
  };
  rowActions: RowAction[] = this.getRowActions();
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProductsList().subscribe(data => {
      this.gridController.gridService.setRows(data);
    });
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
        key: 'edit',
        label: 'edit',
        icon: 'edit'
      }
    ];
  }
}
