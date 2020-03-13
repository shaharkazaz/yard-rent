import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ConfirmationType,
  DatoDialog,
  DatoGridColumnDef,
  DatoGridColumnTypes,
  DatoGridControllerComponent,
  DatoGridFilterSections,
  DatoGridOptions,
  filterDialogSuccess,
  RowAction,
  RowSelectionTypeV2
} from '@datorama/core';
import { ManagementService } from '../state/management.service';
import { ManagementQuery } from '../state/management.query';
import { Router } from '@angular/router';
import { translate } from '@ngneat/transloco';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'users-management',
  templateUrl: './users-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit, OnDestroy {
  @ViewChild(DatoGridControllerComponent, { static: true })
  private gridController: DatoGridControllerComponent;
  gridOptions: DatoGridOptions = {
    gridName: 'user-management',
    columnDefs: this.getColumns()
  };
  rowActions: RowAction[] = this.getRowActions();

  constructor(
    private managementService: ManagementService,
    private managementQuery: ManagementQuery,
    private router: Router,
    private dialog: DatoDialog
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    const cached = this.managementQuery.getValue().users;
    let data = this.managementService.getAllUsers();
    if (cached.length) {
      data = this.gridController.gridQuery.waitForGrid(() =>
        this.managementQuery.select('users')
      );
    }
    data.pipe(untilDestroyed(this)).subscribe(users => {
      this.gridController.gridService.setRows(users, true);
    });
  }

  private getColumns(): DatoGridColumnDef[] {
    return [
      {
        headerName: 'user-management-table.id',
        field: '_id',
        type: DatoGridColumnTypes.Number
      },
      {
        headerName: 'user-management-table.name',
        field: 'name',
        type: DatoGridColumnTypes.String
      },
      {
        headerName: 'user-management-table.email',
        field: 'email',
        type: DatoGridColumnTypes.String
      },
      {
        headerName: 'user-management-table.address',
        field: 'address',
        type: DatoGridColumnTypes.String
      },
      {
        headerName: 'user-management-table.role',
        field: 'role',
        type: DatoGridColumnTypes.String
      },
      {
        headerName: 'user-management-table.rewards',
        field: 'rewards',
        type: DatoGridColumnTypes.Number,
        valueFormatter: ({ value }) => `${value}🌟`,
        filtersConfig: { sections: DatoGridFilterSections.Conditional }
      }
    ];
  }

  private getRowActions(): RowAction[] {
    return [
      {
        icon: 'edit',
        label: 'edit',
        key: 'edit',
        visibleWhen: RowSelectionTypeV2.SINGLE,
        onClick: ([row]) =>
          this.router.navigate(['/admin/management', row.data._id])
      },
      {
        icon: 'delete',
        label: 'delete',
        key: 'delete',
        visibleWhen: RowSelectionTypeV2.SINGLE,
        onClick: ([row]) => this.openDeleteUserDialog(row.data)
      }
    ];
  }

  private openDeleteUserDialog(data: any) {
    this.dialog
      .confirm({
        title: 'delete-users-dialog.title',
        content: translate('delete-users-dialog.content', { name: data.name }),
        confirmationType: ConfirmationType.DISRUPTIVE_WARNING
      })
      .afterClosed()
      .pipe(
        filterDialogSuccess(),
        switchMap(() => this.managementService.deleteUser(data._id))
      )
      .subscribe();
  }
}
