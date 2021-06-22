import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() public sideNavToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sideNavToggle.emit(); 
  }

}
