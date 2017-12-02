import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styles: [
  `
	.special {
		color: green;
	}
	.saveable {
		text-transform: uppercase
	}
  `
  ]
})

export class BindingComponent {

	constructor(){
		this.setCurrentClasses()
	}

	setCurrentClasses(){
		this.currentClasses = {
			saveable: this.canSave,
			special: this.isSpecial
		}
	}

	givenDay = new Date(1767, 1, 25)

  isUnchanged: boolean = false

  isSpecial: boolean = true
  canSave: boolean = true

  imageUrl = 'https://source.unsplash.com/7bwQXzbF6KE/400x250'
}















