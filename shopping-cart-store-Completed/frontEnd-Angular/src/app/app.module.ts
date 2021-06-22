import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PurchaseConfirmationComponent } from './purchase-confirmation/purchase-confirmation.component';
import { CheckPageUserEntryComponent } from './check-page-user-entry/check-page-user-entry.component';
import { FooterComponent } from './footer/footer.component';
import { CartReviewComponent } from './check-page-user-entry/cart-review/cart-review.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './register/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    PageNotFoundComponent,
    CartComponent,
    ShippingComponent,
    PurchaseConfirmationComponent,
    CheckPageUserEntryComponent,
    FooterComponent,
    CartReviewComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
