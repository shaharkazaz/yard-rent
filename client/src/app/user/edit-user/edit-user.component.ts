import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DatoSnackbar} from "@datorama/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit {
  userForm = this.fb.group({
    name: [null, [Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });
  loading = false;
  private userId;
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private router: Router, private snackbar: DatoSnackbar, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.userService.getUser(this.userId).subscribe(({name, email, address}) => {
      this.userForm.patchValue({name, address, email})
    });
  }

  submit() {
    this.loading = true;
    if (this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value).pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })).subscribe(() => {
        this.snackbar.success('edit-user.updated-successfully');
        this.navigateBack();
      });
    }
  }

  ngOnDestroy(): void {}

  cancel() {
    this.navigateBack();
  }

  private navigateBack() {
    const {backTo} = this.route.snapshot.queryParams;
    this.router.navigate([backTo]);
  }
}
