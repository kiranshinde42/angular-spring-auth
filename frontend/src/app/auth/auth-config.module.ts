import { NgModule } from '@angular/core';
import { AuthModule, OidcSecurityService } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://accounts.google.com',
        redirectUrl: window.location.origin + '/auth/callback',
        postLogoutRedirectUri: window.location.origin,
        clientId: '',
        scope: 'openid profile email', // 'openid profile offline_access ' + your scopes
        responseType: 'id_token token',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
      },
    }),
  ],
  providers: [OidcSecurityService],
  exports: [AuthModule],
})
export class AuthConfigModule {}
