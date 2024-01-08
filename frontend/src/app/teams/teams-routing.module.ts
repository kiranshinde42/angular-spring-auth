import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DreamTeamsComponent } from './dream-teams/dream-teams.component';

const routes: Routes = [
  {
    path: '',
    component: DreamTeamsComponent,
    data: {
      breadcrumb: 'Teams',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
