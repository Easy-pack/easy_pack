import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordConfirmationComponent } from './dialog-password-confirmation.component';

describe('DialogPasswordConfirmationComponent', () => {
  let component: DialogPasswordConfirmationComponent;
  let fixture: ComponentFixture<DialogPasswordConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPasswordConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
