import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'roles',
    'action',
  ];
  dataSource = new MatTableDataSource([]);

  constructor(
    private dashboard: DashboardService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  ngOnInit() {
    this.dashboard.getUsers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res as []);
      },
      error: (err) => {
        console.log('Error --- ', err);
      },
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log('announceSortChange');
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
