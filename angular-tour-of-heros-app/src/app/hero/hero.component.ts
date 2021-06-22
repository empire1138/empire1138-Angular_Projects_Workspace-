import { Component, OnInit } from '@angular/core';
import { HeroClass } from '../model/hero-class';
import { CommonModule } from '@angular/common';
import { HEROES } from '../mock-heros';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  heroes: HeroClass[];

  selectedHero: HeroClass;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeros();
  }

  // onSelect(hero: HeroClass): any {
    // this.selectedHero = hero;
    // this.messageService.add(`HeroesComponent: Selected hero name:${hero.name}  id:${hero.id}`);
      // }

  getHeros(): any {
    this.heroService.getHeros()
    .subscribe(heroes => this.heroes = heroes);
  }
}
