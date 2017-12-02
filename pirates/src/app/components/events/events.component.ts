import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  template: `
		<button (click)="fireCannons('How many?', $event)">Fire!</button>

		<button (click)="changeValue()">Change</button>
		<div *ngIf="value">
			<p> {{ text }}</p>
		</div>
  `,
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

	text: string = 'Ahoy matey!'
	value: boolean = true;

	changeValue(){
		this.text = "Avast!!!!"
		this.value = !this.value
	}

	fireCannons(passed, evt){
		console.log(evt.type)
		console.log(passed)
	}

  constructor() { }

  ngOnInit() {
  }

}
