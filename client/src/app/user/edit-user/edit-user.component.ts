import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {allowedFileTypes, DatoSnackbar} from "@datorama/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {filter, finalize, switchMap} from "rxjs/operators";
import {from, of} from "rxjs";
import {toBase64, formatAddress} from "../../shared/utils";
import {untilDestroyed} from "ngx-take-until-destroy";
import {UserInfo} from "../../auth/state/auth.model";
import {AuthService} from "../../auth/state/auth.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit {
  private readonly ALLOWED_FORMATS = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'];
  userForm = this.fb.group({
    image: [null, [allowedFileTypes(this.ALLOWED_FORMATS)]],
    name: [null, [Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });
  loading = false;
  imageBase64: string;
  private userId;
  private originalUser: Partial<UserInfo>;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private router: Router, private snackbar: DatoSnackbar, private route: ActivatedRoute, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.userForm.get('image').valueChanges
      .pipe(filter(file => file && file.name !== 'fake.jpeg'), switchMap(file => file ? from(toBase64(file)) : of('')), untilDestroyed(this)).subscribe((base64) => {
      this.imageBase64 = base64;
      this.cdr.detectChanges();
    });
    this.userService.getUser(this.userId).subscribe((user) => {
      const {name, email, address, image} = user;
      this.originalUser = user;
      this.imageBase64 = image;
      this.userForm.patchValue({name, address: formatAddress(address), email});
      this.userForm.get('image').patchValue(new File([],'fake.jpeg', {type: "image/jpeg"}), {emitEvent: false});
    });
  }

  submit() {
    this.loading = true;
    if (this.userForm.valid) {
      const {image, ...user} = this.userForm.value;
      if (this.imageBase64 !== this.originalUser.image) {
        user.image = this.imageBase64;
      }
      this.userService.updateUser(this.userId, user).pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })).subscribe((updatedUser) => {
        this.authService.updateStoreFromUser(updatedUser);
        this.snackbar.success('edit-user.updated-successfully');
        this.navigateBack();
      });
    }
  }

  ngOnDestroy(): void {}

  cancel() {
    this.navigateBack();
  }

  clearImage() {
    this.userForm.get('image').patchValue(null);
    this.imageBase64 = null;
  }

  private navigateBack() {
    const {backTo} = this.route.snapshot.queryParams;
    this.router.navigate([backTo]);
  }
}
