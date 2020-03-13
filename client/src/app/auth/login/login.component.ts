import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { DatoDialogRef, DatoSnackbar } from '@datorama/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../state/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  view: 'login' | 'sign-up' = 'login';
  loading = false;
  form = this.fb.group({
    name: '',
    address: '',
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    retypePassword: ['', Validators.minLength(6)]
  });

  constructor(
    private ref: DatoDialogRef,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: DatoSnackbar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.view = this.ref.data.view;
    if (!this.isLogin()) {
      this.setSignupValidators('add');
    }
  }

  isLogin(): boolean {
    return this.view === 'login';
  }

  changeView() {
    this.view = this.isLogin() ? 'sign-up' : 'login';
    this.setSignupValidators(this.isLogin() ? 'remove' : 'add');
  }

  submitForm() {
    if (this.form.valid) {
      this.loading = true;
      this.isLogin() ? this.login() : this.signup();
    }
  }

  private login() {
    const { email, password } = this.form.value;
    this.authService.login({ email, password }).subscribe(
      ({ success }) => (success ? this.ref.close() : this.hideLoader()),
      () => this.hideLoader()
    );
  }

  private signup() {
    this.authService
      .signup(this.form.value)
      .pipe(filter(({ success }) => success))
      .subscribe(
        () => this.ref.close(),
        () => this.hideLoader()
      );
  }

  private setSignupValidators(action: 'add' | 'remove') {
    const [name, address, retype] = [
      'name',
      'address',
      'retypePassword'
    ].map(control => this.form.get(control));
    if (action === 'add') {
      name.setValidators([Validators.required, this.nameValidator]);
      address.setValidators(Validators.required);
      retype.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      [name, address, retype].forEach(control => control.clearValidators());
    }
    this.form.updateValueAndValidity();
  }

  private nameValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const valid = /\w+\s\w+/.test(control.value);
    return valid ? null : { fullName: { value: control.value } };
  }

  private hideLoader() {
    this.loading = false;
    this.cdr.detectChanges();
  }
}
