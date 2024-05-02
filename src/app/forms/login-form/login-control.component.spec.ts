import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginControlComponent } from './login-control.component';

describe('LoginFormComponent', () => {
  let component: LoginControlComponent;
  let fixture: ComponentFixture<LoginControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
