import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  configuration$: Observable<OpenIdConfiguration>;
  userDataChanged$: Observable<OidcClientNotification<any>>;
  userData$: Observable<UserDataResult>;
  isAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
    public oidcSecurityService: OidcSecurityService
  ) {}

  ngOnInit() {
    localStorage.clear();
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['main']);
        },
        error: (err) => {
          this.snackBarService.openSnackBar(
            err?.error?.title + ': ' + err?.error?.detail
          );
        },
        complete: () => {
          this.loginForm.reset();
        },
      });
    }
  }
}
