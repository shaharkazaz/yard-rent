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
  DatoGridOptions
} from '@datorama/core';
import { format } from 'date-fns';

import { formatNumber, stringAsCharSum } from '../../shared/utils';
import { UserService } from '../user.service';

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
  constructor(private userService: UserService) {}

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
        type: DatoGridColumnTypes.Number,
        valueGetter: ({ data }) => stringAsCharSum(data._id),
        valueFormatter: ({ value }) => `#${value}`
      },
      {
        headerName: 'orders-table.date',
        field: 'date',
        type: DatoGridColumnTypes.Date,
        valueFormatter: ({ value }) =>
          format(new Date(value), 'MM/DD/YYYY HH:mm:ss')
      },
      {
        headerName: 'orders-table.products',
        field: 'products',
        type: DatoGridColumnTypes.String
      },
      {
        headerName: 'orders-table.rewards-paid',
        field: 'rewards',
        type: DatoGridColumnTypes.Number,
        valueFormatter: ({ value }) =>
          value ? `${formatNumber(value)} ⭐️` : ''
      }
    ];
  }
}
