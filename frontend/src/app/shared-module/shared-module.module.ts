import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CallbackComponent } from './components/callback/callback.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SnackBarService } from './services/snack-bar.service';
@NgModule({
  declarations: [CallbackComponent, BreadcrumbsComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    CallbackComponent,
    BreadcrumbsComponent,
  ],
  providers: [SnackBarService],
})
export class SharedModuleModule {}
