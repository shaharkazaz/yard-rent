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
    columnDefs: this.getColumns()
  };
  rowActions: RowAction[] = this.getRowActions();
  constructor() {}

  ngOnInit() {}

  private getColumns(): DatoGridColumnDef[] {
    return [
      {
        headerName: 'products-table.id',
        field: '_id',
        type: DatoGridColumnTypes.Number
      }
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
