import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorComponent } from '../components/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  config: MatSnackBarConfig


  constructor(
    private _snackBar: MatSnackBar
  ) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
   }

  openError(error:Error, _config:MatSnackBarConfig = this.config) {
    this._snackBar.openFromComponent(ErrorComponent, {
      ...this.config,
      data: error.message,
    });
  }
}
