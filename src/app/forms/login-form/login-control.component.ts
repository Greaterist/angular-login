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
  styleUrl: './login-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginControlComponent),
      multi: true,
    },
  ],
})
export class LoginControlComponent implements ControlValueAccessor {
  internalValue: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    // Increment the internal value by 1 before assigning it
    this.internalValue = value + 1;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement logic to set disabled state if needed
  }

  // When the internal value changes, emit the incremented value
  emitValue(): void {
    this.onChange(this.internalValue - 1);
  }
}
