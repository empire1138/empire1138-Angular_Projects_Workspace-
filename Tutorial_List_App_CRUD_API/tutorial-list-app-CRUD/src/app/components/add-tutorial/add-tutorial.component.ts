import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial;


  constructor() { }

  ngOnInit(): void {
  }

  
}
