import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service'

@Component({
  selector: 'app-data',
  template: `
    <ul>
      <li *ngFor="let pirate of pirates">
      {{pirate}}
      </li>
    </ul>
  `
})

export class DataComponent   {

  pirates: string[]

  constructor(public dataService:DataService) {
    this.pirates = this.dataService.getPirates())
  }

}