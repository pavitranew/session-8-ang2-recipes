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

  givenDay = new Date(1767, 1, 25)

  currentClasses = {}

  constructor(){
    this.setCurrentClasses()
  }

  setCurrentClasses(){
    this.currentClasses = {
      saveable: this.canSave,
      special: this.isSpecial
    }
  }
  
  isUnchanged: boolean = true
  
  isSpecial = false
  canSave = true
  
  imageUrl = 'https://source.unsplash.com/7bwQXzbF6KE/400x250'
}