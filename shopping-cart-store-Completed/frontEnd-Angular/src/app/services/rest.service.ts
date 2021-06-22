import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Products } from '../models/products/products';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './messages.service';
import { log } from 'console';
import { pipe } from 'rxjs';
import { Shipping } from '../models/shipping/shipping';
import { ThrowStmt } from '@angular/compiler';
import { JwtService } from './jwt.service';



@Injectable({
  providedIn: 'root'
})
export class RestService {



  constructor(
    private readonly http: HttpClient,
    private messageService: MessageService,
    private jwt: JwtService
  ) { }

  register(body: any): Promise<any> {
    return this.http.post(`${API_URL}/registration`, body).toPromise();
  }

  login(body: { userName: string, email: string, passWord: string }): Promise<any> {
    return this.http.post(`${API_URL}/login`, body).toPromise();
  }


  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${API_URL}/`)
      .pipe(
        tap(_ => this.log('Fetched Products')),
        catchError(this.handleError<Products[]>('getProducts', []))
      );
  }


  getProductsByCode(productCode: number): Observable<Products> {
    const url = `${API_URL}/products/${productCode}`;
    return this.http.get<Products>(url).pipe(
      tap(_ => this.log(`Fetched Product By Code: ${productCode}`)),
      catchError(this.handleError<Products>(`getProducts code= ${productCode}`))
    );
  }

  // addProductToCart(product, productCode: number): Observable<any> {
  //   const url = `${API_URL}/products/${productCode}`;
  //   return this.http.post((url), product
  //    )
  //     .pipe(tap((newProduct: Products) => this.log(`added product w/ id=${newProduct.productCode}`)),
  //       catchError(this.handleError('addedProduct')));
  // }

  addProductToCart(body: any, productCode: any): Promise<any> {
    const jwt = this.jwt.getJwt();
    return this.http.post(`${API_URL}/products/${productCode}`, body,
      {
        headers: { Authorization: `Bearer ${jwt} ` }
      }
    ).toPromise();
  }

  getItemsFromCart(): Observable<Products[]> {
    const jwt = this.jwt.getJwt();
    return this.http.get<Products[]>(`${API_URL}/cart`,
      {
        headers: { Authorization: `Bearer ${jwt} ` }
      }
    )
      .pipe(
        tap(_ => this.log('Fetched CartItems')),
        catchError(this.handleError<Products[]>('getCart', []))
      );
  }

  // this will need delete an product based on the productCode in the "cart"
  // will have to base the productCode from the cart display to the delete  function
  deleteProductFromCart(productCode: any): Promise<any> {
    const jwt = this.jwt.getJwt();
    return this.http.delete(`${API_URL}/cart/${productCode}`,
      {
        headers: { Authorization: `Bearer ${jwt} ` }
      }
    ).toPromise();
  }

  getShippingInfo(): Observable<Shipping[]> {
    const jwt = this.jwt.getJwt();
    return this.http.get<Shipping[]>(`${API_URL}/shipping`,
      {
        headers: { Authorization: `Bearer ${jwt} ` }
      }
    ).pipe(
      tap(_ => this.log('Fetched shipping')),
      catchError(this.handleError<Shipping[]>('getShipping', []))
    );
  }

  pickedShipping(body: any): Promise<any> {
    const jwt = this.jwt.getJwt();
    return this.http.post(`${API_URL}/shipping`, body,
      {
        headers: { Authorization: `Bearer ${jwt} ` }
      }
    ).toPromise();
  }

  getShippingChoice(): Observable<any> {
    const jwt = this.jwt.getJwt();
    return this.http.get(`${API_URL}/cart/shippingChoice`,
      {
        headers: { Authorization: `Bearer ${jwt} ` }
      }
    ).pipe(
      tap(_ => this.log('Fetched shipping')),
      catchError(this.handleError<Shipping[]>('getShipping', []))
    );
  }

  getItemTotal(): Observable<any> {
    const jwt = this.jwt.getJwt();
    return this.http.get<Products>(`${API_URL}/cart/itemTotal`,
      {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    ).pipe(
      tap(_ => this.log('Fetched ItemTotal')),
      catchError(this.handleError('getItemTotal'))
    );
  }

  getCustomerInfo(): Observable<any> {
    const jwt = this.jwt.getJwt();
    return this.http.get(`${API_URL}/check-out-page/customerInfo`,
      {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    ).pipe(
      tap(_ => this.log('Fetched CustomerInfo')),
      catchError(this.handleError('getCustomerInfo'))
    );
  }

  private log(message: string) {
    const messageHelp = this.messageService.add(`RestService: ${message}`);
    console.log(messageHelp);
  }




  // tslint:disable-next-line: align
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }







}
