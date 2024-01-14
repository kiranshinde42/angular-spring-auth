import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [UserComponent, PaymentComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModuleModule],
})
export class AdminModule {}
