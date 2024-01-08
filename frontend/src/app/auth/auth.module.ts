import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { RegisterComponent } from './register/register.component';
import { CallbackComponent } from '../shared-module/components/callback/callback.component';
import { HttpInterceptorInterceptor } from '../shared-module/interceptor/http-interceptor.interceptor';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModuleModule, AuthRoutingModule],
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
