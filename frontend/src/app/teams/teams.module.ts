import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { DreamTeamsComponent } from './dream-teams/dream-teams.component';


@NgModule({
  declarations: [
    DreamTeamsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule
  ]
})
export class TeamsModule { }
