import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-forms',
	templateUrl: './forms.component.html',
	styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

	name: string = 'testing'
	number: number = 4

	pirates: string[] = ['John', 'Maggie', 'Simon']

	addPirate(){
		this.pirates.push(this.name)
		console.log(this.pirates)
		this.name = ''
	}

	constructor() { }

	ngOnInit() {
	}

}