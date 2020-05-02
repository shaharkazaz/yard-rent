import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {
  ConfirmationType, DatoActionType,
  DatoDialog,
  DatoGridColumnDef,
  DatoGridColumnTypes,
  DatoGridControllerComponent,
  DatoGridFilterSections,
  DatoGridFilterTypes,
  DatoGridOptions, DialogResultStatus, GeneralGridActions,
  RowAction,
  RowSelectionTypeV2
} from '@datorama/core';
import {UserService} from "../user.service";
import {translate} from "@ngneat/transloco";
import {filter, switchMap} from "rxjs/operators";
import {RowNode} from "ag-grid-community";
import {MyProductsService} from "./my-products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products-page.component.html',
  styleUrls: ['./my-products-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MyProductsService]
})
export class MyProductsPageComponent implements OnInit {
  @ViewChild(DatoGridControllerComponent, { static: true })
  private gridController: DatoGridControllerComponent;
  gridOptions: DatoGridOptions = {
    gridName: 'my-products',
    columnDefs: this.getColumns(),
    rowHeight: 100
  };
  // gridActions: GeneralGridActions = {export: false};
  rowActions: RowAction[] = this.getRowActions();
  constructor(private userService: UserService, private myProductsService: MyProductsService, private dialog: DatoDialog, private router: Router) {}

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
        headerName: 'products-table.is-rented',
        field: 'isRented',
        type: DatoGridColumnTypes.String,
        filtersConfig: {sections: DatoGridFilterSections.By_Value},
        valueGetter: ({data}) => translate(data.isRented ? 'yes' : 'no'),
        sortable: false,
      },
      {
        headerName: 'cart-table.rewards',
        field: 'rewards',
        type: DatoGridColumnTypes.Number,
        valueFormatter: ({value}) => value ? `${value} ⭐️` : ''
      },
    ];
  }

  private getRowActions(): RowAction[] {
    return [
      {
        key: 'edit',
        label: 'edit',
        icon: 'edit',
        visibleWhen: RowSelectionTypeV2.SINGLE,
        onClick: ([row]) => this.router.navigate([`marketplace/edit-item/${row.data._id}`])
      },
      {
        key: 'delete',
        label: 'delete',
        icon: 'delete',
        visibleWhen: rows => rows && rows.length && rows.every(({data}) => !data.isRented),
        onClick: rows => {
          this.dialog.confirm({
            confirmationType: ConfirmationType.DISRUPTIVE_WARNING,
            title: 'products-table.delete-items.title',
            actions: [
              {
                type: DatoActionType.DISMISSED,
                caption: 'Delete',
                data: true
              },
              {
                type: DatoActionType.SUCCESS,
                caption: 'Cancel',
              }
            ],
            content: translate(`products-table.delete-items.content${rows.length ? '-plural' : ''}`),
          }).afterClosed().pipe(filter((result) => {
            return result.status === DialogResultStatus.DISMISSED && result.data;
          }),
            switchMap(() => {
              this.gridController.gridService.setLoading(true);
              return this.myProductsService.deleteItems(this.getIds(rows))
              }
            )).subscribe( () => {
              this.gridController.gridService.removeRows(rows);
              this.gridController.gridService.setLoading(false);
          });
        }
      },
      {
        key: 'item-returned',
        label: 'item-returned',
        icon: 'checkmark',
        visibleWhen: rows => rows && rows.length && rows.every(({data}) => data.isRented),
        onClick: rows => {
          this.gridController.gridService.setLoading(true);
          this.myProductsService.returnItems(this.getIds(rows)).subscribe(() => {
            const updated = rows.map((row) => {
              const data = row.data;
              data.isRented = false;
              return data;
            })
            this.gridController.gridService.updateRows(updated);
            this.gridController.gridService.setLoading(false);
          });
        }
      },
    ];
  }

  private getIds(rows: RowNode[]): string[] {
    return rows.map(({data}) => data._id)
  }
}
