import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpDriverComponent } from './sign-up-driver.component';

describe('SignUpDriverComponent', () => {
  let component: SignUpDriverComponent;
  let fixture: ComponentFixture<SignUpDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
