import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddTransactionComponent } from './user-add-transaction.component';

describe('UserAddTransactionComponent', () => {
  let component: UserAddTransactionComponent;
  let fixture: ComponentFixture<UserAddTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
