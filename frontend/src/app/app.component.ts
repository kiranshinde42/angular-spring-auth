import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoginResponse,
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { AuthService } from './auth/service/auth.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dreamteam';
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  configuration$: Observable<OpenIdConfiguration>;
  userDataChanged$: Observable<OidcClientNotification<any>>;
  userData$: Observable<UserDataResult>;
  isAuthenticated = false;

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.oidcSecurityService
    //   .checkAuth()
    //   .subscribe((loginResponse: LoginResponse) => {
    //     console.log('loginResponse : ', loginResponse);
    //     const { isAuthenticated, userData, accessToken, idToken, configId } =
    //       loginResponse;
    //     this.authService.authLogin(idToken).subscribe({
    //       next: (res) => {
    //         console.log('Response: ', res);
    //         this.router.navigate(['dashboard']);
    //       },
    //       error: (err) => {
    //         alert('Something went wrong, Please try again');
    //       },
    //     });
    //   });
  }
}
