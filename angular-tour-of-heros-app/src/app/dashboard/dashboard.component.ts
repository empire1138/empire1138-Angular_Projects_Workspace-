import { Component, OnInit } from '@angular/core';
import { HeroClass } from '../model/hero-class';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: HeroClass[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();

  }

  getHeroes(): any{
    this.heroService.getHeros()
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
