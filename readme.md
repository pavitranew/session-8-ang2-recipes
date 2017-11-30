# MEAN Session 8


## Typescript (Demo)

`npm install -g typescript`

Stub html file:

```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```

Create greeter.ts:

```js
function greeter(person) {
    return `Hello, ${person}`;
}

const user = "Jane User";

document.body.innerHTML = greeter(user);
```

Compile it on the command line with `$ tsc greeter.ts` and examine the differences.

### Type annotations

`:string`

```js
function greeter(person: string) {
    return `Hello, ${person}`;
}

const user = "Jane User";

document.body.innerHTML = greeter(user);
```

Type annotations in TypeScript are lightweight ways to record the intended contract of the function or variable. In this case, we intend the greeter function to be called with a single string parameter.

Try changing the call greeter to pass an array instead:

```js
function greeter(person: string) {
    return `Hello, ${person}`;
}

var user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

Re-compiling, you’ll now see an error.

`$ tsc greeter.ts`

The greeter.js file is still created. TypeScript is warning that your code will likely not run as expected. This will typically occur in your editor.

### Interfaces

An interface that describes an object:

```js
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return `Hello,  ${person.firstName} ${person.lastName}`;
}

const user = { firstName: "John", lastName: "Superuser" };

document.body.innerHTML = greeter(user);
```

`$ tsc greeter.ts`

### Classes

Create a Student class with a constructor and a few public fields. Notice that classes and interfaces play well together

```js
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = `${firstName} ${middleInitial} ${lastName}`;
    }
}

interface Person {
    firstName: string;
    middleInitial: string;
    lastName: string;
}

function greeter(person : Person) {
    return `Yo, ${person.firstName} ${person.middleInitial}. ${person.lastName}`;
}

var user = new Student("Jane", "M", "User");

document.body.innerHTML = greeter(user);
```

`$ tsc greeter.ts`


## ES6 Classes

See the readme in other/_classes


## Angular 2 - Modules, Components and Templates

[Install Angular CLI](https://angular.io/docs/ts/latest/cli-quickstart.html)

`$ npm install -g angular-cli`

`$ ng new pirates`

`$ cd pirates`, `subl .` and `$ ng serve`

App is at `http://localhost:4200/`

We can use ES5, ES6, or TypeScript to write Angular 2. 

We will write all code samples with [TypeScript](http://www.typescriptlang.org). Like SASS is to CSS - a Typescript is a superset of JavaScript with added features.

Note `index.html`, `styles.css`


### Angular modules

app.module.ts:

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Note: 
* ES6 modules, named imports from node_modules. 
* Custom imports from local file system `('./ ...')`. 
* ES6 export modules syntax: `import { BrowserModule }`
* ES6 Classes

@Decorators - metadata about components (where to find the template etc.). `@NgModule` decorates the exported class AppModule

- `declarations` are where you will add your components
- `imports` replaces Angular 1 dependency injection e.g.: `angular.module('app, ['ngRoute'])`
- `providers` are for services
- bootstrap defines the starting component. It replaces `<div ng-app='app'>` and is our root module

### Components

`app.component` contains the application logic that controls a portion or region of the view.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
```

- `selector` is the custom tag. This is used as `<app-root></app-root>` in `index.html`
- `@Component` decorates (provides metadata to) the exported component. 
- TemplateUrl, styleUrls are the paths for the component's html and stylesheets

Components are created, updated and detroyed during the application lifecycle. We can use this lifecycle to perform actions at each moment via optional lifecycle hooks such as ngOnInit().

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Pirates</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

Note: no ng-app.

### main.ts

The kickoff point for the application:

`platformBrowserDynamic().bootstrapModule(AppModule);`

### Angular 2 Directives

`*ng-repeat, *ng-if, *ngFor`

Structural directives contain a `*`. They may be considered as replacements for [html5 native template tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) (which are a fascinating study in their own right).

#### Generating Components with the Cli

Create a components directory in `app`

`ng generate component components/vessels`

Creates a components folder with a vessels component that consists of:

* vessels.component.ts
* vessels.component.html
* vessels.component.css
* vessels.component.spec.ts

*and* adds that component to app.module.ts:

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
// NEW!
import { VesselsComponent } from './vessels/vessels.component';


@NgModule({
  declarations: [
    AppComponent,
    // NEW!
    VesselsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Note the selector in vessels.component: `app-vessels`.

Edit app.component.html to use this:

```html
<app-vessels></app-vessels>
```

vessels.component - simplify the class statement a bit and add a few variables:

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {

  name = 'John Doe'
  age = 35

}
```

Edit the vessels.component.html (string interpolation):

```html
<ul>
  <li>Name: {{ name }}</li>
</ul>
```

Add a `constructor` to the vessels.component class to initialize it and add typing to our variable declarations.

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {

  name: string
  age: number
  thirst: number
  
  constructor(){
    console.log('constructor ran')
    this.name = 'Rhiney'
    this.thirst = 100
  }

}
```

Try `this.name = 34` to see errors. 

Note that additional typings include boolean, any, void, undefined, arrays and objects.

Add a few methods to our class:

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {

  name: string
  age: number
  thirst: number
  
  constructor(){
    console.log('constructor ran')
    this.name = 'Rhiney'
    this.age = 12
    this.thirst = 100
    this.drink()
  }

  drink(){
    this.thirst -= 10
  }

  showAge(){
    return this.age
  }

}
```

We initialize our class with a call to drink() and we can run a function in our template:

```html
<ul>
  <li>Name: {{ name }}</li>
 <li>Thirst: {{ thirst }}</li>
 <li>Age: {{ showAge() }}</li>
</ul>

```

### Interfaces and Types

You can declare a complex variable using 

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {

  pirate: { id:number, name:string, weapons:string[], vessel:boolean }

  
  constructor(){
    this.pirate = {
      id: 1, 
      name: 'LaFitte',
      weapons: ['sword', 'cannon'],
      vessel: true
    }
  }

}
```

Some html:

```html
<ul>
  <li>Name: {{ pirate.name }}</li>
 <li>Vessel: {{ pirate.vessel }}</li>
 <li>Weapons: {{ pirate.weapons.join(', ') }}</li>
</ul>
```

Create an interface for the pirates:

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {

  pirate: Pirate
  
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
```

Create Pirate.ts with the interface.

Add export to the interface:  `export interface Pirate{...`

and `import { Pirate } from './Pirate'` in the component (top).

```js
import { Component, OnInit } from '@angular/core';
import { Pirate } from './Pirate'

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {

  pirate: Pirate;
  
  constructor(){
    this.pirate = {
      id: 1, 
      name: 'LaFitte',
      weapons: ['sword', 'cannon'],
      vessel: true
    }
  }
}
```

Pirates (plural)

```js
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
    { id: 1, name: 'William Kidd', weapons: ['Sword'],  vessel: true, },
    { id: 2, name: 'Samuel Bellamy', weapons: ['Sword', 'Cannon'],  vessel: false, },
    { id: 3, name: 'Mary Read', weapons: ['Dagger', 'Cannon', 'Knife'],  vessel: true, },
    { id: 4, name: 'John Rackham', weapons: ['Cannon', 'Peg Leg'],  vessel: true, },
    ]
  }
}
```

## Templates and Styles 

* ngIf, ngSwitch conditionals 
* ngFor looping
* ngStyle and ngClass
* pipes

### Styles

Demo: this is what 'inline' styles look like:

```js
@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styles: [`
    ul li { font-family: Arial, sans-serif }
  `]
})
```

### ngFor

```js
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
    this.pirates = [
    { id: 1, name: 'William Kidd', weapons: ['Sword'],  vessel: true, },
    { id: 2, name: 'Samuel Bellamy', weapons: ['Sword', 'Cannon'],  vessel: false, },
    { id: 3, name: 'Mary Read', weapons: ['Dagger', 'Cannon', 'Knife'],  vessel: true, },
    { id: 4, name: 'John Rackham', weapons: ['Cannon', 'Peg Leg'],  vessel: true, },
    ]
  }
}
```


```js
<ul>
  <li *ngFor="let pirate of pirates">
    {{ pirate.name }}
  </li>
</ul>
```

### ngIf

Add a boolean to our class:

```js
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

  constructor(){
    this.pirates = [
    { id: 1, name: 'William Kidd', weapons: ['Sword'],  vessel: true, },
    { id: 2, name: 'Samuel Bellamy', weapons: ['Sword', 'Cannon'],  vessel: false, },
    { id: 3, name: 'Mary Read', weapons: ['Dagger', 'Cannon', 'Knife'],  vessel: true, },
    { id: 4, name: 'John Rackham', weapons: ['Cannon', 'Peg Leg'],  vessel: true, },
    ]
  }
}
```

```
<ul *ngIf="showPirates">
  <li *ngFor="let pirate of pirates; let i = index">
    {{i}} = {{ pirate.name }}
  </li>
</ul>
```

The *not* `!` operator:

`<ul *ngIf="!showPirates">`

```html
<ul *ngIf="showPirates;">
  <li *ngFor="let pirate of pirates; let i = index">
    {{i}} = {{ pirate.name }}
  </li>
</ul>

<ul *ngIf="!showPirates;">
  <li>Pirates never really existed</li>
</ul>
```

ternary operator:

```html
<ul *ngIf="showPirates">
  <li *ngFor="let pirate of pirates;">
    {{ pirate.name }}
  </li>
</ul>

<p>{{ showPirates ? 'Pirates are great' : 'Pirates don\'t exist' }}</p>
```

### ngSwitch

```html
<div [ngSwitch] = "greeting">
  <div *ngSwitchCase="'1'">Ahoy there</div>
  <div *ngSwitchDefault>Aaargh!</div>
</div>
```

```js
  showPirates: boolean = true;

  greeting: number = 1
```

### Property Binding

`ng generate component components/binding`

app.component:

`<app-binding></app-binding>`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {
  imageUrl = 'https://source.unsplash.com/7bwQXzbF6KE/400x250'
}
```

```html
<div>
  <img src="{{ imageUrl }}" />
</div>

<div>
  <img [src]="imageUrl" />
</div>

<div>
  <img bind-src="imageUrl" />
</div>
```

*One Way Binding  DOM < Component*

binding.component:

```js
export class BindingComponent {

  isUnchanged: boolean = true
  imageUrl = 'https://source.unsplash.com/7bwQXzbF6KE/400x250'
}
```

binding.component.html:

```html
<p [hidden] = "isUnchanged">Pirate has been updated. Hit save.</p>
<button [disabled] = "isUnchanged">Save</button>
```

### Classes

```js
styles: [`
  .special {
    color: green
  }
`]

...

isSpecial = true
canSave = true
```

```
<p [class.special]="isSpecial">This class binding is special.</p>
```

Para is green.

```html
<p [ngClass]="currentClasses">This p is initially special and saveable</p>
```

```js
  styles: [`
  .special {
    color: green
  }
  .saveable {
    text-transform: uppercase
  }
  `]


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
}
```

ngStyle is similar.

```html
<p [style.font-size]="isSpecial ? 'x-large' : 'smaller' ">Font size depends on isSpecial</p>
```

### Pipes

```js
givenDay = new Date(1767, 1, 25)
```

```html
<p>{{ givenDay }} was a blast!</p>
<p>{{ givenDay | date }} was a blast!</p>
<p>{{ givenDay | date:"MM-dd-yyyy" }} was a blast!</p>
<p>Any given day was in {{ givenDay | date:"yyyy" }}</p>
```

[Also good](https://angular.io/api/common/CurrencyPipe) for `| currency` and `| percentage`.


## Events and Forms

`ng generate component components/events`

`<app-events></app-events>`

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  template: `
  <button (click)="fireCannons()">Fire!</button>
  `
})
export class EventsComponent {

  fireCannons(){
    console.log('boom!')
  }

  constructor() { }

}
```

Pass a parameter / event


```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  template: `
  <button (click)="fireCannons('How many?', $event)">Fire!</button>
  `
})
export class EventsComponent {

  fireCannons(passed, e){
    console.log(passed)
    console.log(e.type)
  }

  constructor() { }

}
```

with ngIf:


```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  template: `
  <button (click)="fireCannons('How many?', $event)">Fire!</button>
  <br>
  
  <button (click)="changeValue()">Change</button>
  <div *ngIf="value">
    <p>{{ text }}</p>
  </div>
  `
})
export class EventsComponent {

  fireCannons(passed, e){
    console.log(passed)
    console.log(e)
  }

  text: string = "Ahoy matey"
  value: boolean = true

  changeValue(){
    this.text = "Avast!"
    this.value = !this.value
  }

  constructor() { }

}
```

### Forms

`ng generate component components/forms`

`<app-forms></app-forms>`

This requires importing the forms module in order to use.

in app.module:

```js
import { FormsModule } from '@angular/forms';

  imports: [
    BrowserModule,
    FormsModule
  ],
```

Build the form using assets in `other/_forms`

===

Review:

1: *html Binding  DOM > Component* works for any HTML attribute:

`<p [ngClass]="currentClasses">`

`<img [src]="vehicle.imageUrl">`

2: *Event Binding  DOM > Component* e.g. `ng-click`

In Angular 2 `(click)`

3: *Two Way Binding  DOM < > Component* e.g. `ng-model`. 

In Angular 2 we use hotdogs (or a football in a box):

`<input [(ngModel)]="name" />`

===

forms.component:

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  name: string = 'testing'
  number: number = 4

  constructor() { }

  ngOnInit() {
  }

}
```

In the form:

```html
<input [(ngModel)]="name" type="text" name="name" required placeholder="Name" />

<input [(ngModel)]="number" type="number" name="number" min="0" max="10" step="2" required placeholder="Even num < 10">
```

Add text node to demo data binding

```html
<p>{{ name }} {{ number }}</p>
```

Add a submit function

```js
pirates: string[] = ['John', 'Maggie', 'Simon']

addPirate(){
  this.pirates.push(this.name)
  console.log(this.pirates)
  this.name = ''
}

<form (submit)="addPirate()">

```

## Angular 2 - Services

A class that can be used to send functionality and data across multiple components. Keeps apps DRY. 

- $http.get('api/...') vs 
- http.get('api/...')

Can return a promise but returns an rxjs observable by default.

Often used:

- for Ajax calls using the Http module to allow write-once data sharing amongst multiple components. 
- with onInit hooks to load code before rendering.

Steps:

1. services/my-service.ts
1. import @Injectable and create class
1. add as a provider to @ngModule
1. subscribe to the service's function in a component

`ng generate service services/data` 

will create the needed files but you still need to add it to ngModule (unlike using cli to create a component)

In app.module:

```js
import { DataService } from './services/data.service'

providers: [DataService],
```

data.service:

```js
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
```

Create a component:

`ng generate component components/data`

`<app-data></app-data>`

In the component:

```js
import {DataService} from '../../services/data.service'
```

and create a constructor to access the service:

```js
import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service'

@Component({
  selector: 'app-data',
  template: `

  `
})

export class DataComponent   {

  constructor(public dataService:DataService) {
    console.log(this.dataService.getPirates())
  }

}

```

display results from service:

```js
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
```

## Angular 2 Router


`ng g component components/home`
`ng g component components/about`
`ng g component components/navbar`

In app.module:

`import { RouterModule, Routes } from '@angular/router'`

```js
const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent}
]
```

```js
imports: [
  BrowserModule,
  RouterModule.forRoot(appRoutes)
]
```

Note the Base href in the main html template.

navbar.component.html:

```html
<nav class="navbar">
  <a href="#">Navbar</a>
  <ul>
    <li>
      <a href="#" routerLink="/">Home</a>
    </li>
    <li class="">
      <a href="#" routerLink="/about">About</a>
    </li>
  </ul>
</nav>

```

app.component.html:

```html
<app-navbar></app-navbar>
<div class="container">
    <router-outlet></router-outlet>
</div>
```

### Params

`ng g component components/userDetails`


app.module:

```js
const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'user/:id', component:UserDetailsComponent}
];
```

user-details.component:

add;

`import { Router, ActivatedRoute, Params } from '@angular/router';` 

variable `id:number;`

and constructor:

```js
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id:number;

  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) { 
    this.route.params.subscribe((params:Params) => {
      //console.log(params);
      //console.log(params.id);
      this.id = params.id;
    });
  }

  ngOnInit() {
  }

}

```

user-details.component.html:

```html
<p>
  This is user {{ id }}
</p>

```








## Notes



<!-- 


`ng generate component binding`

app.module:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { VesselsComponent } from './components/vessels/vessels.component';
import { BindingComponent } from './components/binding/binding.component';


@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    BindingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

binding.component:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {
   title = 'Angular Two-Way Binding';
  story = {
  name: 'The Sack of the Edmund Fitzgerald'
  };

}
```

app.component.html:

`<app-binding></app-binding>`

binding.component.html:

```
<div>
  <h3>{{title}}</h3>
  <div>
    2 Way Binding
    <input [(ngModel)]="story.name">
  </div>
  <p>{{story.name}}</p>
  <div>
    1 Way Binding
    <input [value]="story.name">
  </div>
</div>
```

Note the one way binding.

Add a button:

```
<div>
  <h3>{{title}}</h3>
  <div>
    2 Way Binding
    <input [(ngModel)]="story.name">
  </div>
  <p>{{story.name}}</p>
  <div>
    1 Way Binding
    <input [value]="story.name">
  </div>
  <button (click)="changeName()">OK</button> 
</div>
```

Add function to component:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {
   title = 'Angular Two-Way Binding';
  story = {
  name: 'The Sack of the Edmund Fitzgerald'
  };

  changeName(){
    this.story.name = 'Skull and Cross Bones'
  }

}
```

#### Old style directives

ng-style, ng-src, ng-href, ng-click

Now: `<img [src]="path' />`, `(click)="save()`, etc.


### Routing 

`ng generate component pirates`

app.component.html:

```
<div>
  <header>
    <h1>{{title}}</h1>
    <nav>
      <ul>
        <li><a [routerLink]="['/pirates']" href="">Pirates</a></li>
        <li><a [routerLink]="['/vessels']" href="">Vessels</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section>
      <router-outlet></router-outlet>
    </section>
  </main>
</div>
```

NEW app-routing.module

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiratesComponent } from './pirates/pirates.component';
import { VesselsComponent } from './vessels/vessels.component';

const routes: Routes = [
  { path: 'pirates', component: PiratesComponent },
  { path: 'vessels', component: VesselsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routableComponents = [
  PiratesComponent,
  VesselsComponent
];
```

app.module:

```
import { AppRoutingModule, routableComponents } from './app-routing.module';
```

```
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
```

Add styles to app.component:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    nav ul {list-style-type: none;}
    nav ul li {padding: 4px;cursor: pointer;display:inline-block}
  `],
})
export class AppComponent {
  title = 'Pirates!';
}
```

app.module:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    nav ul {list-style-type: none;}
    nav ul li {padding: 4px;cursor: pointer;display:inline-block}
  `],
})
export class AppComponent {
  title = 'app works!';
}
```

set AppComponent as the bootstrap in app.module:

```
@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    BindingComponent,
    PiratesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
```

set to app-root in index.html:

```
<body>
  <app-root>Loading...</app-root>
</body>
```

Touch ups

default path

`{ path: '', pathMatch: 'full', redirectTo: 'pirates', },`

`{ path: '**', pathMatch: 'full', component: PageNotFoundComponent }`



```
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  template: `
    <article class="template">
      <h4>Inconceivable!</h4>
      <div>I do not think this page is where you think it is.</div>
    </article>
  `
})
export class PageNotFoundComponent { }
```

#### Routing Touch ups

default path

`{ path: '', pathMatch: 'full', redirectTo: 'pirates', },`

`{ path: '**', pathMatch: 'full', component: PageNotFoundComponent }`

pagenotfound.component:

```
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  template: `
    <article class="template">
      <h4>Inconceivable!</h4>
      <div>I do not think this page is where you think it is.</div>
    </article>
  `
})
export class PageNotFoundComponent { }
```

import it into app-routing.module:

```
import { PageNotFoundComponent } from './pagenotfound.component';
```

and export it in the same module:

```
export const routableComponents = [
  PiratesComponent,
  VesselsComponent,
  PageNotFoundComponent
];
```

routableComponents in app.module:

```
import { AppRoutingModule, routableComponents } from './app-routing.module';
```

Be sure to add it to the declarations:

```
@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    BindingComponent,
    PiratesComponent,
    routableComponents
  ],
```


#### pirates

pirates:

```
  pirates = [
  {
    name: 'John Rackham',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }, {
    name: 'Donald Trump',
    image: 'avatar.svg',
    weapon: 'Twitter',
    vessel: 'Stout'
  }, {
    name: 'Sea Dog',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }, {
    name: 'Jean Lafitte',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }
  ]
```

Add to pirates.component:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.css']
})
export class PiratesComponent {

  pirates = [
  {
    name: 'John Rackham',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }, {
    name: 'Donald Trump',
    image: 'avatar.svg',
    weapon: 'Twitter',
    vessel: 'Stout'
  }, {
    name: 'Sea Dog',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }, {
    name: 'Jean Lafitte',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }
  ]
}
```

Edit the pirates.component.html to show a pirates list.











### Notes 2

Nested components

Differentiates between pirate-list.component and pirate.component.

Includes pirate.ts

Pirate.ts

```
export class Pirate {
  constructor(public weapon: string, public name: string) { }
}
```

pirates.component.html

```
<ul>
  <li *ngFor="let pirate of pirates" (click)="select(pirate)">
    {{pirate.name}}
  </li>
</ul>
 <my-pirate *ngIf="selectedPirate" [pirate]="selectedPirate"></my-pirate> 
<div *ngIf="pirates.length">
  <h3>You have {{pirates.length}} pirates</h3>
</div>

```

Pirates.component

```
import { Component, Input } from '@angular/core';
import { Pirate } from './pirate';

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.css']
})
export class PiratesComponent {

    pirates = [
  {
    name: 'John Rackham',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }, {
    name: 'Donald Trump',
    image: 'avatar.svg',
    weapon: 'Twitter',
    vessel: 'Stout'
  }, {
    name: 'Sea Dog',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }, {
    name: 'Jean Lafitte',
    image: 'avatar.svg',
    weapon: 'Sword',
    vessel: 'Bounty'
  }
  ]

  @Input() pirate: Pirate;

  selectedPirate: Pirate;

  select(pirate: Pirate) {
    this.selectedPirate = pirate;
    console.log(this)
  }
}
```

NEW pirates.ts

```
import { Component, Input } from '@angular/core';

import { Pirate } from './pirate';

@Component({
  selector: 'my-pirate',
   templateUrl: './pirates.html'
})
export class CharacterComponent {
  @Input() pirate: Pirate;
}

```

NEW pirates.html

```
<h3>You selected {{pirate.name}}</h3>
```

app.module:

```
import { CharacterComponent } from './pirates/pirates';
```

and

```
@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    BindingComponent,
    PiratesComponent,
    routableComponents,
    CharacterComponent
  ],
```




### HTTP 
- $http.get('api/...') vs 
- http.get('api/...')

Can return a promise but returns an rxjs observable by default.

1. Import the http module into the app root
2. Call http.get in a service and return a mapped result
3. Subscribe to the service's function in a component

In a new api folder in app.


=======


### Vessels Service

Isolate data management in reusable services and use dependency injection to make them available. 

Using onInit hooks to load code before rendering.

Angular 1 used a confusing array of factories, providers, serivces etc. In Angular 2 we simply use a class.

Current vessels.component:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {

  vessels = [
    { id: 1, name: 'Adventure Galley' },
    { id: 2, name: 'HMS Rackham' },
    { id: 3, name: 'Y-Wing Fighter' }
  ];

}
```

vessel.service - a reusable service:

```
import { Injectable } from '@angular/core';

@Injectable()
export class VesselService {
  getVessels() {
    return [
    { id: 1, name: 'Adventure Galley' },
    { id: 2, name: 'HMS Rackham' },
    { id: 3, name: 'Y-Wing Fighter' }
    ]
  }
}
```

It simply exports a class.



 -->












