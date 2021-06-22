import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { RestService } from 'src/app/services/rest.service';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public userName: string = '';
  public passWord: string = '';
  public errorMsg: string = '';

  constructor(
    private http: HttpClient,
    private rest: RestService,
    private jwt: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  customerLogin(): any {
    this.rest.login({ userName: this.userName, passWord: this.passWord, email: this.email }).then(res => {
      if (res.error) {
        this.errorMsg = res.msg;
      } else {
        this.jwt.setJwt(res.data);

        this.router.navigate(['/cart']);
      }
    })

  }



}
