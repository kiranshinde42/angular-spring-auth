import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { HttpInterceptorInterceptor } from '../shared-module/interceptor/http-interceptor.interceptor';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './service/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpVerificationComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
  ],
  imports: [SharedModuleModule, AuthRoutingModule, NgOtpInputModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
    AuthService,
  ],
})
export class AuthModule {}
