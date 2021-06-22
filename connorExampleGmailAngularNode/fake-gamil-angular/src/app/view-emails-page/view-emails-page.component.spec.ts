import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmailsPageComponent } from './view-emails-page.component';

describe('ViewEmailsPageComponent', () => {
  let component: ViewEmailsPageComponent;
  let fixture: ComponentFixture<ViewEmailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
