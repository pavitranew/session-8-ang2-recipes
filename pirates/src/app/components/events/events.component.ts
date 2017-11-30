import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  template: `
  <button (click)="fireCannons('How many?', $event)">Fire!</button>
  <br>
  
  <button (click)="changeValue()">Change</button>
  <div *ngIf="value">
  	<p>{{ text }}</p>
  </div>
  `
})
export class EventsComponent {

  fireCannons(passed, e){
    console.log(passed)
    console.log(e)
  }

  text: string = "Ahoy matey"
  value: boolean = true

  changeValue(){
  	this.text = "Avast!"
  	this.value = !this.value
  }

  constructor() { }

}