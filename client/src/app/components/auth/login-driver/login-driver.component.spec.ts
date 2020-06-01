import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDriverComponent } from './login-driver.component';

describe('LoginDriverComponent', () => {
  let component: LoginDriverComponent;
  let fixture: ComponentFixture<LoginDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
