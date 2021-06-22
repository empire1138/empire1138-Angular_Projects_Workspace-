import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    public jwtService: JwtService
  ) { }

  ngOnInit(): void {
  }

  logOut(){
    this.jwtService.removeJwt();
  }
}
