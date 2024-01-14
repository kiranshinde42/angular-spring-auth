import { Component } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'Roles'];
  dataSource = [];

  constructor(private dashboard: DashboardService) {}
  ngOnInit() {
    this.dashboard.getUsers().subscribe({
      next: (res: any) => {
        this.dataSource = res as [];
      },
      error: (err) => {
        console.log('Error --- ', err);
      },
    });
  }
}
