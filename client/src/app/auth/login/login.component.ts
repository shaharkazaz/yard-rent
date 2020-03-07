import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DatoDialogRef } from '@datorama/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  view: 'login' | 'sign-up' = 'login';
  form = this.fb.group([]);
  constructor(private ref: DatoDialogRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.view = this.ref.data.view;
  }

  isLogin(): boolean {
    return this.view === 'login';
  }

  changeView() {
    this.view = this.isLogin() ? 'sign-up' : 'login';
  }
}
