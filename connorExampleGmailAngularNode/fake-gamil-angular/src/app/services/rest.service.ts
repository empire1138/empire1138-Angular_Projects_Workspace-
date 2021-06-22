import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient,
              private readonly jwt: JwtService) { }

  register(body: any): Promise<any> {
    return this.http.post(`${environment.API_URL}/register`, body).toPromise();
  }


  logIn(body: { email: string; password: string }): Promise<any> {
    return this.http.post(`${environment.API_URL}/log-in`, body).toPromise();
  }

  getUserEmails(): Promise<any> {
    const jwt = this.jwt.getJwt();

    return this.http.get(`${environment.API_URL}/emails`,
      {
        headers: { Authorization: `Bearer ${jwt} ` }
      }
    ).toPromise();
  }

}
