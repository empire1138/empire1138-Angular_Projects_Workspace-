import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { products } from '../products';
import { Router, NavigationExtras } from '@angular/router';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../services/rest.service';
import { JwtService } from '../services/jwt.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registration: FormGroup;
  public errorMsg = '';

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService,
    private router: Router,
    private jwt: JwtService) {
    this.registration = this.formBuilder.group({
      customerLastName: [null, [Validators.required]],
      customerFirstName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      addressLine1: [null, [Validators.required]],
      addressLine2: [null],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      passWord: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.rest.register(this.registration.value).then((res) => {
      if (res.error) {
        this.errorMsg = res.msg;
        console.log('register', res);
      } else {
        console.log('register', res);
        this.jwt.setJwt(res.data);
        this.router.navigate(['/']);
      }
    });

    window.alert('Registration Complete Moving Forward');
  }



}


