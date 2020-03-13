import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementQuery } from '../../state/management.query';
import { ManagementService } from '../../state/management.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './management-user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./management-user-details.component.scss']
})
export class ManagementUserDetailsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading = false;
  usersLoaded$;
  private userId: string;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private managementQuery: ManagementQuery,
    private managementService: ManagementService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    const cached = this.managementQuery.getValue().users;
    let data = this.managementService.getAllUsers();
    if (cached.length) {
      data = of(cached);
    }
    this.usersLoaded$ = data.pipe(tap(users => this.initForm(users)));
  }

  backToUserTable() {
    this.router.navigate(['/admin/management']);
  }

  saveUser() {
    this.loading = true;
    this.managementService
      .updateUser(this.userId, this.getDirtyValues())
      .subscribe(
        () => {
          this.backToUserTable();
        },
        () => {
          this.loading = false;
        }
      );
  }

  private getDirtyValues() {
    return Object.keys(this.form.controls).reduce((dirtyValues, key) => {
      const control = this.form.get(key);
      if (control.dirty) {
        dirtyValues[key] = control.value;
      }
      return dirtyValues;
    }, {});
  }

  private initForm(users: any[]) {
    const { name, email, address } = users.find(
      user => user._id === this.userId
    );
    this.form = this.fb.group({
      name,
      email,
      address,
      password: ['******', Validators.minLength(6)]
    });
  }
}
