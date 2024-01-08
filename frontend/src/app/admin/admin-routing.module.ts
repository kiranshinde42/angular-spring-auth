import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    data: {
      breadcrumb: 'User',
    },
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: {
      breadcrumb: 'Payment',
    },
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
