import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RestService } from '../services/rest.service';
import { JwtService } from '../services/jwt.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  public errorMsg: string = '';

  public registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly rest: RestService,
    private readonly jwtService: JwtService,
    private readonly router: Router) {
    this.registerForm = this.fb.group({
      firstName: [null, []],
      lastName: [null, []],
      email: [null, []],
      password: [null, []]
    });
  }

  ngOnInit(): void {
  }

  onRegister(): any {
    this.rest.register(this.registerForm.value).then(res => {
      if (res.error) {
        this.errorMsg =res.msg; 
        console.log('register', res);
      } else {
        console.log('register', res);
        this.jwtService.setJwt(res.data);
        this.router.navigate(['/view-emails']);
      }
    });
  }

}
