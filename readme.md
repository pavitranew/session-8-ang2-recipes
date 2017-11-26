# MEAN Session 12

## Homework
Homework Update: The goal is to make on of the pirate names clickable and display a notificiation below the list that includes the `pirate.name`. There are notes below (in the Notes section) and a working sample in the dev branch of this repo.

## Reading
[Angular Quickstart Tutorial](https://angular.io/docs/ts/latest/)

### React Homework

Create a dropdown for the pirate selector:

on dev2 branch of session 11 - Duel.js:

was -
```
        <input
          id='piratename'
          placeholder='Pirate Name'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
          />
```

became -

```
render(){
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='piratename'>
        {this.props.label}
        </label>
          <select 
          value={this.state.piratename} 
          onChange={this.handleChange}>
              {
              Object.keys(this.state.pirates).map( (key) => 
                <option 
                  key={key} 
                  value={this.state.pirates[key].piratename}>
                  {this.state.pirates[key].piratename}
                </option>
              )
            }
          </select>

          <button
          className='button'
          type='submit'
          disabled={!this.state.piratename}>
            Submit
          </button>
      </form>
    )
  }
```

```
  handleChange(event){
    const value = event.target.value
    this.setState(function(){
      return {
        piratename: value
      }
    })
  }
```

needed to make state available -

```
  this.state = {
    piratename: '',
    pirates: {}
    }
```

## Angular 2

[Install Angular CLI](https://angular.io/docs/ts/latest/cli-quickstart.html)

`$ npm install -g angular-cli`

`$ ng new pirates`

`$ cd pirates`, `subl .` and `$ ng serve`

App is at `http://localhost:4200/`

We can use ES5, ES2016, or TypeScript to write Angular 2. 

We will write all code samples with [TypeScript](http://www.typescriptlang.org). (Like SASS is to CSS - added features.)

### Typescript

`npm install -g typescript`

greeter.ts:

```
function greeter(person) {
    return "Hello, " + person;
}

var user = "Jane User";

document.body.innerHTML = greeter(user);
```

`$ tsc greeter.ts`

String type annotations:

```
function greeter(person: string) {
    return "Hello, " + person;
}

const user = "Jane User";

document.body.innerHTML = greeter(user);
```

Type annotations in TypeScript are lightweight ways to record the intended contract of the function or variable. In this case, we intend the greeter function to be called with a single string parameter.

Try changing the call greeter to pass an array instead:

```
function greeter(person: string) {
    return "Hello, " + person;
}

var user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

`$ tsc greeter.ts`

The greeter.js file is still created. TypeScript is warning that your code will likely not run as expected. This will typically occur in your editor.

Interfaces. An interface that describes objects:

```
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

`$ tsc greeter.ts`

Classes

Create a Student class with a constructor and a few public fields. Notice that classes and interfaces play well together

```
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

`$ tsc greeter.ts`

```
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```





### app.module.ts

Angular modules

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Note: 
* ES6 modules, named imports from node_modules. 
* Custom imports from local file system `('./ ...')`. 
* ES6 destructuring syntax `import { BrowserModule }`
* ES6 Classes

@Decorators - metadata about components (where to find the template etc.)
- `@NgModule` decorates the exported class AppModule
- `imports` replaces Angular 1 dependency injection e.g.: `angular.module('app, [])`
- bootstrap defines the starting component
- export AppModule replaces `<div ng-app='app'>` and is our root module

### Components

Contains the application logic that controls a portion or region of the view

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
```

Note: `selector` is the tag. In Angular 1 this was a component declaration e.g. `appRoot`

The @Component decorates (provides metadata to) the exported component. 

### main.ts

The kickoff point for the application:

`platformBrowserDynamic().bootstrapModule(AppModule);`

Which uses the selector in the html file:

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Stories</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>

```

Note: no ng-app.

### Angular 2 Directives

ng-repeat, ng-if

Structural directives contain a *. They are replacements for [html5 native template tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) (which are a fascinating study in their own right).

*ngFor, *ngIf

#### Example

Try `ng generate component vessels`

bootstrap with the new component in app.module:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VesselsComponent } from './vessels/vessels.component';

@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [VesselsComponent]
})
export class AppModule { }

```

vessels.component:

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
    { id: 3, name: 'RNC Sinker' }
  ];

}
```

vessels.component.html:

```
<ul>
  <li *ngFor="let vessel of vessels">
    {{vessel.name}}
  </li>
</ul>
<div *ngIf="vessels.length">
  <h3>You have {{vessels.length}} vessels</h3>
</div>
```

### Data Binding

#### Interpolation  DOM < Component  
e.g. expressions `{{ vessel.name }}`

#### One Way Binding  DOM < Component  
e.g `ng-bind` in Angular 1. `[innerText]="vessel.name"` in Angular 2. The square brackets can contain *any valid property in html*. Another example:
`<div [style.color]="color">{{ vessel.name }}</div>`. This is a big improvement over Angular 1 where we had a ton of directives (see below).

#### Event Binding  DOM > Component  
e.g. `ng-click`. In Angular 2 `(click)`

#### Two Way Binding  DOM < > Component
e.g. `ng-model`. In Angular 2 we use hotdogs (or a football in a box):
`<input [(ngModel)]="vessel.name" />`
Check the use of square and rounded brackets in the two cases above. This requires importing the forms module in order to use.

`ng generate component binding`

app.module:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VesselsComponent } from './vessels/vessels.component';
import { BindingComponent } from './binding/binding.component';

@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    BindingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [BindingComponent]
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











### Notes

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
<!-- <my-pirate *ngIf="selectedPirate" [pirate]="selectedPirate"></my-pirate> -->
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
















