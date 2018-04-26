import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  pirates: string[]

  // interface Pirate {
  //   id:number,
  //   name:string,
  //   weapons:string[],
  //   vessel:boolean
  // }

  constructor() {
    this.pirates = ['Jack', 'Sam', 'Parrot']
      //   this.pirates = [
      // { id: 1, name: 'William Kiddee', weapons: ['Sword'],  vessel: true, },
      // { id: 2, name: 'Samuel Bellamy', weapons: ['Sword', 'Cannon'],  vessel: false, },
      // { id: 3, name: 'Mary Read', weapons: ['Dagger', 'Cannon', 'Knife'],  vessel: true, },
      // { id: 4, name: 'John Rackham', weapons: ['Cannon', 'Peg Leg'],  vessel: true, },
      // ]
  }

  getPirates(){
    return this.pirates
  }
}