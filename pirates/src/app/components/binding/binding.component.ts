import { Component } from '@angular/core';

@Component({
	selector: 'app-binding',
	templateUrl: './binding.component.html',
	styles: [`
	.special {
		color: green
	}
	.saveable {
		text-transform: uppercase
	}
	`]
})
export class BindingComponent {
	imageUrl = 'https://source.unsplash.com/7bwQXzbF6KE/400x250'
	isUnchanged: boolean = false
	isSpecial = false
	canSave = true
	currentClasses = {}

	givenDay = new Date(1767, 1, 25)

	constructor(){
		this.setCurrentClasses()
	}
	setCurrentClasses(){
		this.currentClasses = {
			saveable: this.canSave,
			special: this.isSpecial
		}
	}
}