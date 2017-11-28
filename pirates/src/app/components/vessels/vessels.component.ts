import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {
  
  constructor(){
    this.pirate = {
    	id: 1, 
    	name: 'LaFitte',
    	weapons: ['sword', 'cannon'],
    	vessel: true
    }
  }
}

interface Pirate{
	id:number, 
	name:string, 
	weapons:string[], 
	vessel:boolean
}