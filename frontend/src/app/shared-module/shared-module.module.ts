import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CallbackComponent } from './components/callback/callback.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SnackBarService } from './services/snack-bar.service';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EmailValidatorDirective } from './validators/email-validator.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
@NgModule({
  declarations: [
    CallbackComponent,
    BreadcrumbsComponent,
    DeleteDialogComponent,
    EmailValidatorDirective,
    SpinnerComponent,
  ],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    CallbackComponent,
    BreadcrumbsComponent,
    SpinnerComponent,
  ],
  providers: [
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
})
export class SharedModuleModule {}
