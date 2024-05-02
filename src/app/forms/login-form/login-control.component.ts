import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-control',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login-control.component.html',
  styleUrl: './login-control.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginControlComponent),
      multi: true,
    },
  ],
})
export class LoginControlComponent implements ControlValueAccessor {
  private onChange: any = () => {};
  private onTouch: any = () => {};

  set value(input: string) {
    this.onChange(input);
    this.onTouch(input);
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(onTouched: Function): void {
    this.onTouch = onTouched;
  }
}
