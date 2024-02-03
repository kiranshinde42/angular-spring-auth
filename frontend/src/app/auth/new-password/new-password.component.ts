import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent {
  hide = true;
  chide = true;
  token: any;
  newPasswordForm = this.fb.group(
    {
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: this.ConfirmedValidator('password', 'confirmPassword'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {
    this.route.queryParams
      .pipe(filter((params) => params['token']))
      .subscribe((params) => {
        this.token = params['token'];
      });
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.auth
      .resetPassword(this.token, this.newPasswordForm.get('password').value)
      .subscribe({
        next: (res) => {
          this.snackBarService.openSnackBar(res['message']);
          this.router.navigate(['/']);
        },
        error: (err) => {
          const error = err?.error?.detail || err?.error?.errorMessage;
          this.snackBarService.openSnackBar(error);
        },
      });
  }
}
