import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AdminService } from './services/admin.service';

@NgModule({
  declarations: [UserComponent, PaymentComponent, AddUserComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModuleModule],
  providers: [AdminService],
})
export class AdminModule {}
