import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DatoDialogRef, DatoSnackbar } from '@datorama/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { AuthService } from '../../state/auth.service';

@Component({
  selector: 'mail-verification',
  templateUrl: './mail-verification.component.html',
  styleUrls: ['./mail-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailVerificationComponent implements OnInit, OnDestroy {
  code: FormArray;
  email: string;
  codeSent = false;
  showResend = false;
  error;
  private timer;
  private verificationId;
  private readonly DISPLAY_RESEND_DELAY = 15000; // 15 secs

  constructor(
    private fb: FormBuilder,
    private ref: DatoDialogRef,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private snackbar: DatoSnackbar
  ) {}

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  ngOnInit() {
    const controls = [];
    for (let i = 0; i < 6; i++) {
      controls.push(['', [Validators.required]]);
    }
    this.code = this.fb.array(controls);
    this.email = this.ref.data.email;
    this.sendEmail();
    this.setResendTimer();
  }

  moveToNext(event) {
    setTimeout(() => {
      let next = event.target.nextElementSibling;
      if (next) {
        next.focus();
      } else {
        event.target.blur();
        this.codeSent = true;
        this.cdr.detectChanges();
        this.authService
          .verifyEmailCode({
            code: this.code.value.join(''),
            id: this.verificationId
          })
          .pipe(untilDestroyed(this))
          .subscribe(
            () => {
              this.ref.close();
            },
            () => {
              this.error = true;
              this.showResend = true;
              this.cdr.detectChanges();
            }
          );
      }
    });
  }

  resend() {
    this.sendEmail();
    this.codeSent = false;
    this.error = false;
    this.showResend = false;
    this.setResendTimer();
    this.code.reset();
    this.snackbar.success('mail-verification.email-resent');
  }

  sendEmail() {
    this.authService
      .sendVerificationEmail(this.email)
      .pipe(untilDestroyed(this))
      .subscribe(id => {
        this.verificationId = id;
      });
  }

  private setResendTimer() {
    this.timer = setTimeout(() => {
      this.showResend = true;
      this.cdr.detectChanges();
    }, this.DISPLAY_RESEND_DELAY);
  }
}
