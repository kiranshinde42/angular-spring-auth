import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DTeamRoutingModule } from './d-team-routing.module';
import { DTeamComponent } from './d-team/d-team.component';


@NgModule({
  declarations: [
    DTeamComponent
  ],
  imports: [
    CommonModule,
    DTeamRoutingModule
  ]
})
export class DTeamModule { }
