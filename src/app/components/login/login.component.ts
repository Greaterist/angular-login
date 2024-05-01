import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { interval, take } from 'rxjs';
import { ILogin } from 'src/app/interfaces/ILogin';
import { ErrorService } from 'src/app/services/error.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  userName?: ILogin;
  
  isSending: boolean = false;
  sendingTimeout: number = 60;
  

  constructor(
    private formBuilder: FormBuilder,
    private serverService: ServerService,
    private errorService: ErrorService
  ) {
    this.loginForm = formBuilder.group({
      login: ['', [Validators.required]],
    });
  }

  loginHandler() {
    this.serverService.login(this.loginForm.get('login')!.value).subscribe({
      next: (res: ILogin) => (this.userName = res),
      error: (err: any) => this.errorService.openError(err)
    }
    );
    this.startTimeout()
  }

  checkIsSubmitDisabled(): boolean {
    return !this.loginForm.valid || this.isSending;
  }

  startTimeout() {
    this.isSending = true;
    let subscription = interval(1000)
      .pipe(take(60))
      .subscribe({
        next: () => {
          this.sendingTimeout--;
        },
        complete: () => {
          this.sendingTimeout = 60;
          this.isSending = false;
          subscription.unsubscribe();
        },
      });
  }
}
