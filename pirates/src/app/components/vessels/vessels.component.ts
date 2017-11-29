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
  
  constructor(){
    this.pirate = {
      id: 1, 
      name: 'LaFitte',
      weapons: ['sword', 'cannon'],
      vessel: true
    }

    this.pirates = [
    {
      id: 1, 
      name: 'LaFitte',
      weapons: ['sword', 'cannon'],
      vessel: true
    },
    {
      id: 2, 
      name: 'LaFitte',
      weapons: ['sword', 'cannon'],
      vessel: true
    },
    {
      id: 3, 
      name: 'LaFitte',
      weapons: ['sword', 'cannon'],
      vessel: true
    },
    ]
  }
}