import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent {
  email;
  otp;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private snackBarService: SnackBarService
  ) {}
  onOtpChange(event) {
    this.otp = event;
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter((params) => params['email']))
      .subscribe((params) => {
        this.email = params['email'];
      });
  }

  otpValidate() {
    this.auth.otpValidate({ email: this.email, otp: this.otp }).subscribe({
      next: (res) => {
        this.snackBarService.openSnackBar(res['message']);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.snackBarService.openSnackBar(err.error?.errorMessage);
      },
    });
  }

  resendOTP() {
    this.auth.resendOTP(this.email).subscribe({
      next: (res) => {
        this.snackBarService.openSnackBar(res['message']);
      },
      error: (err) => {
        this.snackBarService.openSnackBar(err.error?.errorMessage);
      },
    });
  }
}
