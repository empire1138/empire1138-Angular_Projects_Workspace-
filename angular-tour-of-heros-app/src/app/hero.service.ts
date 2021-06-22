import { Injectable } from '@angular/core';
import { HEROES } from './mock-heros';
import { HeroClass } from './model/hero-class';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeros(): Observable<HeroClass[]>{
    // ToDo send message after fetching the heros
    this.messageService.add('HeroService: fetched heros');
    return  of(HEROES);
  }

  getHero(id: number): Observable<HeroClass> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
