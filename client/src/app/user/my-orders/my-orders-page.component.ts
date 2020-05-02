import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DatoGridColumnDef,
  DatoGridColumnTypes,
  DatoGridControllerComponent,
  DatoGridOptions,
  RowAction
} from '@datorama/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-my-orders-page',
  templateUrl: './my-orders-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./my-orders-page.component.scss']
})
export class MyOrdersPageComponent implements OnInit {
  @ViewChild(DatoGridControllerComponent, { static: true })
  private gridController: DatoGridControllerComponent;
  gridOptions: DatoGridOptions = {
    gridName: 'my-orders',
    columnDefs: this.getColumns()
  };
  rowActions: RowAction[] = this.getRowActions();
  constructor(private userService: UserService,) {}

  ngOnInit() {
    this.userService.getOrdersList().subscribe(data => {
      this.gridController.gridService.setRows(data);
    });
  }

  private getColumns(): DatoGridColumnDef[] {
    return [
      {
        headerName: 'orders-table.id',
        field: '_id',
        type: DatoGridColumnTypes.Number
      },
      {
        headerName: 'orders-table.date',
        field: 'date',
        type: DatoGridColumnTypes.Date
      },
      {
        headerName: 'orders-table.products',
        field: 'products',
        type: DatoGridColumnTypes.String
      }
    ];
  }

  private getRowActions(): RowAction[] {
    return [
      {
        key: 'info',
        label: 'orders-table.information',
        icon: 'question'
      }
    ];
  }
}
