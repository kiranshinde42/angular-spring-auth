import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from '../../../auth/service/auth.service';

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
    this.oidcSecurityService.checkAuth().subscribe(({ idToken }) => {
      this.auth.authLogin(idToken).subscribe({
        next: (res) => {
          console.log('oidc error ');
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['main/dashboard']);
        },
        error: (err) => {
          console.log('err ', err.error);
        },
      });
    });
  }
}
