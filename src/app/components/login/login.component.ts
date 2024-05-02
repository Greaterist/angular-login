import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  filter,
  finalize,
  interval,
  takeUntil,
  timer,
} from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { ilogin } from 'src/app/interfaces/ilogin.interface';
import { LoginControlComponent } from 'src/app/forms/login-form/login-control.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    LoginControlComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly TIMER: number = 60

  public isSending: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public sendingTimeout: BehaviorSubject<number> = new BehaviorSubject(this.TIMER)

  public loginForm!: FormGroup;
  public userName?: ilogin;

  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  private ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
    });
  }

  protected checkIsSubmitDisabled(): boolean {
    return !this.loginForm.valid || this.isSending.value;
  }

  protected loginHandler(): void {
    this.authService.login(this.loginForm.get('login')!.value).subscribe({
      next: (response: ilogin) => (this.userName = response),
      error: (error: any) => this.errorService.openError(error),
    });
    this.startTimeout();
  }

  private startTimeout(): void {
    this.isSending.next(true);
    let timer$ = timer(this.TIMER * 1000);
    interval(1000)
      .pipe(
        takeUntil(
          this.sendingTimeout.pipe(filter((timeLeft) => timeLeft === 0))
        ),
        finalize(() => {
          this.resetTimer()
        })
      )
      .subscribe({
        next: () => {
          this.sendingTimeout.next(this.sendingTimeout.value - 1);
        },
      });
  }

  private resetTimer(): void {
    this.sendingTimeout.next(this.TIMER);
    this.isSending.next(false);
  }

}
