import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { IDialogData } from '../../helpers/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(data: IDialogData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      // width: '250px',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  loading(): MatDialogRef<any> {
    return this.dialog.open(LoadingComponent, {
      // width: '250px',  
      data: {},
    });
  }
}
