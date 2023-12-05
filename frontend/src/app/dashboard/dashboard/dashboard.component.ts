import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult,
} from 'angular-auth-oidc-client';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'Roles'];
  dataSource = [];

  constructor(private dashboard: DashboardService) {}

  ngOnInit() {
    this.dashboard.getUsers().subscribe({
      next: (res) => {
        this.dataSource = res as [];
      },
      error: (err) => {
        console.log('Error ', err);
      },
    });
  }
}
