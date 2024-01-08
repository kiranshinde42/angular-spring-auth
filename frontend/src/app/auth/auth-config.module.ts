import { NgModule } from '@angular/core';
import { AuthModule, OidcSecurityService } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://accounts.google.com',
        redirectUrl: window.location.origin + '/callback',
        postLogoutRedirectUri: window.location.origin,
        clientId:
          '844781089585-ps70l23b4rkdidng2f29lv912oa0o613.apps.googleusercontent.com',
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
