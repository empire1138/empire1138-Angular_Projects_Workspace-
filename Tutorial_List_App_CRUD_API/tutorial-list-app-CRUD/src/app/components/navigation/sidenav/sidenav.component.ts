import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() sideNavClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onSideNavClose = () => {
    this.sideNavClose.emit();
  }

}
