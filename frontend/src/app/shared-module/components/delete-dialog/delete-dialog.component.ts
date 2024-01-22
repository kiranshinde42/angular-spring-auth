import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
interface DialogInterface {
  title: string;
  message: string;
}
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  @Output() onYes = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogInterface) {}
  yes() {
    this.onYes.emit(this.data);
  }
}
