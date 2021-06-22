import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPageUserEntryComponent } from './check-page-user-entry.component';

describe('CheckPageUserEntryComponent', () => {
  let component: CheckPageUserEntryComponent;
  let fixture: ComponentFixture<CheckPageUserEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckPageUserEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPageUserEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
