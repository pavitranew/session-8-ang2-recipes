import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  pirates: string[]

  constructor() { 
    this.pirates = ['Jack', 'Sam', 'Parrot']
  }

  getPirates(){
    return this.pirates
  }
}