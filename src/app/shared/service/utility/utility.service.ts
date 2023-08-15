import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { LoaderService } from '../busy-loader/api/loader.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private _snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) { }

  showLoader(flag: boolean) {
    this.loaderService.showLoader(flag);
  }

  showErrorAlert(message: string, options?: any) {
    this._snackBar.open(message, 'close', {duration: 5000, verticalPosition: 'top', panelClass: ['alert', 'alert-danger']});
  }
  
  showSuccessAlert(message: string, options?: any) {
    this._snackBar.open(message, 'close', {duration: 5000, verticalPosition: 'top', panelClass: ['alert', 'alert-success']});
  }

  showInfoAlert(message: string, options?: any) {
    this._snackBar.open(message, 'close', {duration: 5000, verticalPosition: 'top', panelClass: ['alert', 'alert-info']});
  }

  showWarnAlert(message: string, options?: any) {
    this._snackBar.open(message, 'close', {duration: 5000, verticalPosition: 'top', panelClass: ['alert', 'alert-warning']});
  }

  showConfirmation(options?:any) {
    if(!options) {
      options = {};
    }
    if(!options.data) {
      options.data = {
        title: 'Are you sure you want to delete',
        content: ''
      };
    }
    if(!options.width) {
      options.width = '30%';
    }
    return this.dialog.open(ConfirmationComponent, options).afterClosed();
  }
}
