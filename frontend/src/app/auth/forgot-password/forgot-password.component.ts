import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';
import { emailValidator } from 'src/app/shared-module/validators/email-validator.directive';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotForm = this.fb.group({
    email: ['', [emailValidator(), Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  onSubmit() {
    this.auth.forgotPassword(this.forgotForm.get('email').value).subscribe({
      next: (res) => {
        const msg =
          res && res.hasOwnProperty('message')
            ? res['message']
            : 'Something went wrong, please try again';
        this.snackBarService.openSnackBar(msg);
        this.router.navigate(['/']);
      },
      error: (err) => {
        const error = err?.error?.detail || err?.error?.errorMessage;
        this.snackBarService.openSnackBar(error);
      },
    });
  }
}
