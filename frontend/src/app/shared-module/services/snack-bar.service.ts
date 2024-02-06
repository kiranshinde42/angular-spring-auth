import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

  getMessage(res) {
    return res && res.hasOwnProperty('message')
      ? res['message']
      : 'Something went wrong, please try again!';
  }

  getError(err) {
    const error = err?.error?.detail || err?.error?.errorMessage;
    return error;
  }

  openSnackBar(message, action = '') {
    this._snackBar.open(message, action, {
      duration: 10 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
