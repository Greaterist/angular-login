import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorComponent } from '../components/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private config: MatSnackBarConfig

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
   }

  public openError(error:Error, _config:MatSnackBarConfig = this.config) {
    this.snackBar.openFromComponent(ErrorComponent, {
      ...this.config,
      data: error.message,
    });
  }
}
