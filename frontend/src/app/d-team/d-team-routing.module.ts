import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DTeamComponent } from './d-team/d-team.component';

const routes: Routes = [
  {
    path: 'teams',
    component: DTeamComponent,
    data: {
      breadcrumb: 'Dream Teams',
    },
  },
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  { path: '**', redirectTo: 'teams' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DTeamRoutingModule {}
