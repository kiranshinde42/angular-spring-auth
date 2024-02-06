import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteDialogComponent } from 'src/app/shared-module/components/delete-dialog/delete-dialog.component';
import { AdminService } from '../services/admin.service';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';

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
    public dialog: MatDialog,
    public adminService: AdminService,
    private snackBarService: SnackBarService
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
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {
        dataSource: this.dataSource.data,
        isUpdate: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  updateUser(element) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {
        user: element,
        isUpdate: true,
      },
    });

    const sub = dialogRef.componentInstance.onYes.subscribe((value) => {
      this.adminService.updateUser(value).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res['result'] as []);
          this.snackBarService.openSnackBar(
            this.snackBarService.getMessage(res)
          );
        },
        error: (error) => {
          this.snackBarService.openSnackBar(
            this.snackBarService.getError(error)
          );
        },
      });
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
    const sub = dialogRef.componentInstance.onYes.subscribe((value) => {
      this.adminService.deleteUser(value['data']['id']).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res['result'] as []);
          this.snackBarService.openSnackBar(
            this.snackBarService.getMessage(res)
          );
        },
        error: (error) => {
          this.snackBarService.openSnackBar(
            this.snackBarService.getError(error)
          );
        },
      });
    });
  }
}
