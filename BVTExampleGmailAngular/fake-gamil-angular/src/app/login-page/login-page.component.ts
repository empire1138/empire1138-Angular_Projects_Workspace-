import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../services/rest.service';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public errorMsg: string = '';

  constructor(
    private readonly http: HttpClient,
    private readonly rest: RestService,
    private readonly jwt: JwtService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }


  logIn(): any {
    this.rest.logIn({email: this.email, password: this.password}).then(res => {
      if (res.error){
        this.errorMsg = res.msg;
      }else { 
        this.jwt.setJwt(res.data);
        this.router.navigate(['/view-emails'])
      }
    })
  }

}
