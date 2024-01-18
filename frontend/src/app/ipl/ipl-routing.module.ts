import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayerComponent } from './player/player.component';
const routes: Routes = [
  {
    path: 'matches',
    component: MatchesComponent,
    data: {
      breadcrumb: 'Matches',
    },
  },
  {
    path: 'teams',
    component: TeamsComponent,
    data: {
      breadcrumb: 'Teams',
    },
  },
  {
    path: 'player',
    component: PlayerComponent,
    data: {
      breadcrumb: 'Player',
    },
  },
  { path: '', redirectTo: 'matches', pathMatch: 'full' },
  { path: '**', redirectTo: 'matches' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IplRoutingModule {}
