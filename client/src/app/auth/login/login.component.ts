import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { DatoDialogRef, DatoSnackbar } from '@datorama/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';

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
  }

  isLogin(): boolean {
    return this.view === 'login';
  }

  changeView() {
    this.view = this.isLogin() ? 'sign-up' : 'login';
  }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.loading = true;
      this.authService
        .login({ email, password })
        .pipe(
          finalize(() => {
            this.loading = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe(({ success, message }) => {
          if (success) {
          } else {
            this.snackbar.error(message);
          }
        });
    }
  }
}
