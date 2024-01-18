import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IplRoutingModule } from './ipl-routing.module';
import { PlayerComponent } from './player/player.component';
import { TeamsComponent } from './teams/teams.component';
import { MatchesComponent } from './matches/matches.component';


@NgModule({
  declarations: [
    PlayerComponent,
    TeamsComponent,
    MatchesComponent
  ],
  imports: [
    CommonModule,
    IplRoutingModule
  ]
})
export class IplModule { }
