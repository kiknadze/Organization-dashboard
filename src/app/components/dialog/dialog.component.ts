import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialog } from 'src/app/interfaces';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  message: string | undefined = 'Are you Sure?';
  confirmLabel: string | undefined = 'Yes';
  cancelLabel: string | undefined = 'No';

  constructor(@Inject(MAT_DIALOG_DATA) private data: IDialog,
              private dialogRef: MatDialogRef<DialogComponent>) {
              if (data) {
                this.message = data.message || this.message;
                if (data.buttonText) {
                  this.confirmLabel = data.buttonText.confirmLabel || this.confirmLabel;
                  this.cancelLabel = data.buttonText.cancelLabel || this.cancelLabel;
                }
              }
  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
