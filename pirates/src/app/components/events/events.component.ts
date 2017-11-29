import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  template: `
  <button (click)="fireCannons('How many?', $event)">Fire!</button>
  `
})
export class EventsComponent {

  fireCannons(passed, e){
    console.log(passed)
    console.log(e)
  }

  constructor() { }

}