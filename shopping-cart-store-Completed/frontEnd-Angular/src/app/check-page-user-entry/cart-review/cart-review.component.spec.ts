import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartReviewComponent } from './cart-review.component';

describe('CartReviewComponent', () => {
  let component: CartReviewComponent;
  let fixture: ComponentFixture<CartReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
