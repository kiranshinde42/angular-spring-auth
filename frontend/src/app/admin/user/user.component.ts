import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteDialogComponent } from 'src/app/shared-module/components/delete-dialog/delete-dialog.component';

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
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  updateUser(element) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: element,
    });
  }

  deleteUser(element) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete user',
        message: 'Would you like to delete ' + element.firstName + '?',
        data: element,
      },
    });
    const sub = dialogRef.componentInstance.onYes.subscribe((data) => {
      console.log('Delete ', data);
    });
  }
}
