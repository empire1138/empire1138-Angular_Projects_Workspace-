import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PurchaseConfirmationComponent } from './purchase-confirmation/purchase-confirmation.component';
import { CheckPageUserEntryComponent } from './check-page-user-entry/check-page-user-entry.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './register/login/login.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:productCode', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'purchase-confirmation', component: PurchaseConfirmationComponent },
  { path: 'check-out-page', component: CheckPageUserEntryComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
