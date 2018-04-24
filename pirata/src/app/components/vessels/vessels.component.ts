import { Component, OnInit } from '@angular/core';
import { Pirate } from './Pirate'

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {

  pirate: Pirate;
  pirates: Pirate[]

  showPirates: boolean = true;
  greeting: number = 1

  constructor(){
    this.pirates = [
    { id: 1, name: 'William Kidd', weapons: ['Sword'],  vessel: true, },
    { id: 2, name: 'Samuel Bellamy', weapons: ['Sword', 'Cannon'],  vessel: false, },
    { id: 3, name: 'Mary Read', weapons: ['Dagger', 'Cannon', 'Knife'],  vessel: true, },
    { id: 4, name: 'John Rackham', weapons: ['Cannon', 'Peg Leg'],  vessel: true, },
    ]
  }
}