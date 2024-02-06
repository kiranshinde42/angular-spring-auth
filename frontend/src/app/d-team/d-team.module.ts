import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DTeamRoutingModule } from './d-team-routing.module';
import { DTeamComponent } from './d-team/d-team.component';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';
@NgModule({
  declarations: [DTeamComponent],
  imports: [CommonModule, DTeamRoutingModule, AgGridAngular],
})
export class DTeamModule {}
