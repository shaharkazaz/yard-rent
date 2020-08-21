import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DatoGridColumnDef,
  DatoGridColumnTypes,
  DatoGridControllerComponent,
  DatoGridFilterTypes,
  DatoGridOptions,
  RowAction
} from '@datorama/core';
import { RowNode } from 'ag-grid-community';

import { UserService } from '../user.service';

import { MyRentedProductsService } from './my-rented-products.service';

@Component({
  selector: 'my-rented-products',
  templateUrl: './my-rented-products.component.html',
  styleUrls: ['./my-rented-products.component.scss'],
  providers: [MyRentedProductsService]
})
export class MyRentedProductsComponent implements OnInit {
  @ViewChild(DatoGridControllerComponent, { static: true })
  private gridController: DatoGridControllerComponent;
  gridOptions: DatoGridOptions = {
    gridName: 'my-rented-products',
    columnDefs: this.getColumns(),
    rowHeight: 100,
    rowClassRules: {
      disabled: params => params.data.isInReturnProcess
    },
    isRowSelectable: node => !node.data.isInReturnProcess
  };
  // gridActions: GeneralGridActions = {export: false};
  rowActions: RowAction[] = this.getRowActions();
  constructor(
    private userService: UserService,
    private myRentedProductsService: MyRentedProductsService
  ) {}

  ngOnInit() {
    this.userService.getRentedProductsList().subscribe(data => {
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
        headerName: 'rented-products-table.return-date',
        field: 'orderReturnDate',
        type: DatoGridColumnTypes.Date,
        filter: DatoGridFilterTypes.None
      },
      {
        headerName: 'rented-products-table.in-return-process',
        field: 'isInReturnProcess',
        type: DatoGridColumnTypes.String,
        filter: DatoGridFilterTypes.None,
        valueFormatter: ({ value }) => (value ? `Yes` : 'No')
      }
    ];
  }

  private getRowActions(): RowAction[] {
    return [
      {
        key: 'item-returned',
        label: 'item-returned',
        icon: 'checkmark',
        visibleWhen: rows =>
          rows && rows.length > 0 && rows.every(r => !r.data.isInReturnProcess),
        onClick: rows => {
          this.gridController.gridService.setLoading(true);
          this.myRentedProductsService
            .returnItems(this.getIds(rows))
            .subscribe(() => {
              const updated = rows.map(row => {
                const data = row.data;
                data.isInReturnProcess = true;
                return data;
              });
              this.gridController.gridService.updateRows(updated);
              this.gridController.gridService.setLoading(false);
            });
        }
      }
    ];
  }

  private getIds(rows: RowNode[]): string[] {
    return rows.map(({ data }) => data._id);
  }
}
