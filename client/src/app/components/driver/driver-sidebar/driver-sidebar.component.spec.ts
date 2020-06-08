import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSidebarComponent } from './driver-sidebar.component';

describe('DriverSidebarComponent', () => {
  let component: DriverSidebarComponent;
  let fixture: ComponentFixture<DriverSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
