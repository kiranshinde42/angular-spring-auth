import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    public oidcSecurityService: OidcSecurityService
  ) {}
  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(
        ({ isAuthenticated, userData, accessToken, idToken, configId }) => {
          this.auth.authLogin(idToken).subscribe({
            next: (res) => {
              localStorage.setItem('user', JSON.stringify(res));
              this.router.navigate(['dashboard']);
            },
            error: (err) => {
              console.log('err ', err.error);
            },
          });
        }
      );
  }
}
