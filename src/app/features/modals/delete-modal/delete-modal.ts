import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-modal.html'  
})
export class DeleteModal {

  constructor(
    private dialogRef: MatDialogRef<DeleteModal>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}