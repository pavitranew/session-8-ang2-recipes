# VIII - Angular 2+

## Homework

Continue to work on your midterms. See session 6 or 7 for instructions.

## Typescript

Like SASS is to CSS - Typescript is a superset of JavaScript which adds features.

[TypeScript](https://www.typescriptlang.org) is supported without a global install and VSCode has excellent support for it. To play with TypeScript on the command line install it globally with:

`npm install -g typescript`

Use the stub html file in `other/_typescript`:

```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```

In greeter.ts:

```js
function greeter(person) {
    return `Hello, ${person}`;
}

const user = "Jane User";

document.body.innerHTML = greeter(user);
```

Transpile it to JavaScript on the command line with `$ tsc greeter.ts` and examine the two files.

### Type annotations

Add a datatype `:string` to the person variable:

```js
function greeter(person: string) {
    return `Hello, ${person}`;
}

const user = "Jane User";

document.body.innerHTML = greeter(user);
```

Type annotations in TypeScript are lightweight ways to record the intended data. In this case, we intend the greeter function to be called with a single string parameter.

Try changing the call greeter to pass an array instead with `var user = [0, 1, 2];`:

```js
function greeter(person: string) {
    return `Hello, ${person}`;
}

var user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

Re-compiling, you’ll now see an error.

`$ tsc greeter.ts`

The `greeter.js` file is still created. TypeScript is warning you that your code will likely not run as expected. This will typically occur in your editor.

### Interfaces

An interface describes an object:

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

This time, add a `--watch` flag when converting:

`$ tsc greeter.ts --watch`

### Classes

Create a Student using a `constructor` and a few `public` fields. Notice the `class` and `interface`:

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

function greeter(person: Person) {
    return `Yo, ${person.firstName} ${person.middleInitial}. ${person.lastName}`;
}

var user = new Student("Jane", "M", "Student");

document.body.innerHTML = greeter(user);
```

Compare the JS and TS files.

## ES6 Classes

Let's take a closer look at ES6 classes.

### Classic Prototypal inheritance

Lets use the contents of `other/_classes` for this.`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prototypal Inheritance</title>
</head>
<body>
<script>
  function Car(model, make) {
    this.model = model;
    this.make = make;
  }
  const expo = new Car('Expo', 'Ford');
  console.log(expo);
</script>
</body>
</html>
```

The *constructor* function:

```js
function Car(model, make) {
  this.model = model;
  this.make = make;
}
```

enables creating a new car object with properties:

`const expo = new Car('Expo', 'Ford');`

In the browser console:

```sh
> expo
```

### Prototypal inheritance

Methods on the original constructor will be inherited.

Example: Array Methods

Create an array in the console:

```js
> const names = ['John', 'Henry']
```

Examine the Array in the console. Note the Array prototypes, e.g.:

```js
> names.join(', ')
> names.unshift('Doug') // add to the beginning
> names.push('Daniel') // add to the end, return new length
> names.pop() // remove and return the last element
```

Add a prototype and new car to our car object:

```js
function Car(model, make) {
  this.model = model;
  this.make = make;

  Car.prototype.drive = function() {
    console.log(`Vroom vroom! I'm a ${this.model}`);
  }
}
const expo = new Car('Expo', 'Ford');
const miata = new Car('Miata', 'Mazda');
```

Test drive them in the console:

```js
> miata.drive()
> expo.drive()
```

Add an additional prototype:

```js
Car.prototype.stop = function() {
    console.log(`Screech! 🚒 🚑 🚓`);
}
```

```js
> expo.stop()
```

### Inheritance and Classes

ES6 offers an alternative syntax to create objects. Let's use it:

```js
class Car {
  constructor(model, make) {
    this.model = model;
    this.make = make;
  }
  drive() {
    console.log(`Vroom vroom 🚗 🚗 🚗! I'm a ${this.model} and I'm a ${this.make}`);
  }
  stop() {
    console.log(`Screech! 🚒 🚑 🚓`);
  }
}

const expo = new Car('Expo', 'Ford');
const miata = new Car('Miata', 'Mazda');

```

In the console:

```js
> expo
> expo.drive()
> expo.stop()
```

Aside: Static Methods

Static Methods apply to the class, not the objects.

```js
static info() {
  console.log('I\'m a static method, cars only need apply' );
}
```

```js
> expo.info()
> Car.info()
> expo
```

Inspect the expo prototype. The static method is *not* inherited.

<!-- ### Static methods on an Array

Array.of and the spread operator:

[Emmet](https://docs.emmet.io/abbreviations/syntax/) (ctrl-e):

`ul>li*4>a[href="#"]{link}`

```js
> Array.of(1,2,3,4)
> const links = document.querySelectorAll('li')
> Array.of(links)
> Array.of(...links)
```

But .of is not inerited

```js
> numbers = [6,7,8,9]
> numbers.of(1,2,3,4)
```

e.g. static method - Cars only:

```js
Car.info()
``` -->

### Getters and Setters

Create a getter:

```js
get description() {
  return `${this.model} is a ${this.make} model car`;
}
```

Getters are not methods (no braces when calling)

```js
> expo.description
```

View it in the console.

Create a setter:

```js
set nicknames(value) {
  this.nick = value.trim();
}
```

Now, we *could* now extend our constructor and Car object, i.e.:

```js
constructor(model, make, nick) {
  this.model = model;
  this.make = make;
  this.nick = nick;
}
```

and `const expo = new Car('Expo', 'Ford', 'grumbler');`

But that's not what setters are for.

Let's leave the constructor as is and create a getter:

```js
get nicknames() {
  return this.nick.toUpperCase();
}
```

Note the lack of parentheses when using getters and setters:

```js
> expo.nicknames = '   grumbler   '
> expo.nicknames
```

Just for fun, try converting our car script from TypeScript by popping it into our `greeter.ts` example from earlier and running `tsc greeter.ts --target ES5` (another method might involve `tsc --init`):

```js
class Car {
    constructor(model, make) {
        this.model = model;
        this.make = make;
    }
    drive() {
        console.log(`Vroom vroom 🚗 🚗 🚗! I'm a ${this.model} and I'm a ${this.make}`);
    }
    stop() {
        console.log(`Screech! 🚒 🚑 🚓`);
    }
    static info() {
        console.log('I\'m a static method, cars only need apply' );
    }
    get description() {
        return `${this.model} is a ${this.make} model car`;
    }
    set nicknames(value) {
        this.nick = value.trim();
    }
    get nicknames() {
        return this.nick.toUpperCase();
    }
}

interface Car {
    model: string;
    make: string;
    nick: string;
}

const expo = new Car('Expo', 'Ford');
const miata = new Car('Miata', 'Mazda');

document.body.innerHTML = `Hello ${expo.make}`
```

Try again using ES6: `tsc greeter.ts --target ES6`

### Extending Classes

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Extending Classes</title>
</head>

<body>
  <script>
    class Animal {
      constructor(name) {
        this.name = name;
        this.thirst = 100;
        this.belly = [];
      }
      drink() {
        this.thirst -= 10;
        return this.thirst;
      }
      eat(food) {
        this.belly.push(food);
        return this.belly;
      }
    }

    const rhino = new Animal('Rhiney');

  </script>
</body>

</html>
```

And test on the browser:

```js
> rhino
> rhino.name
> rhino.eat('lilies')
> rhino.eat('hunters')
> rhino.drink()
```

#### Super

We want to 'extend' our Animal class to include a subclass, *dogs*, which, unlike other animals, will include a unique property - breed. We extend a class using a the following syntax.

```js
class Dog extends Animal {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}
```

```js
const yorik = new Dog('Yorik', 'Mutt');
```

Note the error on the console.

Super calls the thing (Animal) that you are extending first.

We need to call `super` first and here, super needs a name:

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
```

```js
> yorik
> rhino
```

Examine the hierarchy in the inspector.

Add a bark method:

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  bark() {
    console.log(`Bark bark my name is ${this.name} and I\'m a ${this.breed}`);
  }
}
```

Needless to say, rhinos do not bark - `rhino.bark()`.

### Aside - Rest Operator

Destructuring arrays:

```js
team = ['john','jane','doug','sally','tom']
const [captain, assistant, ...players] = team;
console.log(captain, assistant, players)
```

### Aside - Spread Operator

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Array's ...Spread Operator</title>
</head>
<body>
<script>

  const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
  const specialty = ['Meatzza', 'Spicy Mama', 'Margherita'];

  const pizzas = [...featured, 'veg', ...specialty];
  const fridayPizzas = [...pizzas];

</script>
</body>
</html>
```

### Extending Arrays

Making our own classes modelled after Array so they inherit all prototypes of an array.

We can also add properties that are not part of the array.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Extending</title>
</head>

<body>
  <script>
    class MovieCollection extends Array {
      constructor(name, ...items) {
        super(...items);
        this.name = name;
      }
      add(movie) {
        this.push(movie);
      }
      topRated(limit = 10) {
        return this.sort( function(firstItem, secondItem) {
          if (firstItem.stars > firstItem.stars){
            return 1
          } else {
            return -1;
          }
        }).slice(0, limit);
      }
    }

    const movies = new MovieCollection(
      'My Favorite Movies',
      { name: 'Sausage Party', stars: 10 },
      { name: 'Star Wars Trek', stars: 1 },
      { name: 'Virgin Suicides', stars: 7 },
      { name: 'Alice in the Cities', stars: 8 }
    );

    movies.add({ name: 'Titanic', stars: 5 });

    console.table(movies)

  </script>
</body>

</html>
```

Start off with an array with a property:

```js
const movies = new MovieCollection(
  'My Favorite Movies',
  { name: 'Sausage Party', stars: 10 },
  { name: 'Star Wars Trek', stars: 1 },
  { name: 'Virgin Suicides', stars: 7 },
  { name: 'Alice in the Cities', stars: 8 }
);
```

We create a class that extends the Array object.

Adding name and using a spread operator to add the items:

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super(...items);
    this.name = name;
  }
}
```

Super calls the Array prototype with a spread operator.

```js
> movies[4]
> movies.name
```

We have an Array that also has properties (possible because in JS, Arrays are objects) e.g:

```js
typeof [1,2]
```

Methods using the array prototype methods can be added:

```js
add(movie) {
  this.push(movie);
}
```

`for... in`:

```js
> for (const movie in movies){ console.log(movie) }
```

returns the key _and_ the name property. The for...in statement iterates over the *enumerable* properties of an object.

More useful will be `for... of` which returns *only* the array:

```js
> for (const movie of movies) { console.log(movie) }
```

We get the object (not the key) and the property (name) is not shown. The for...of statement creates a loop iterating over *iterable* objects

N.B. for of loops skip over the properties.

topRated:

```js
topRated(limit = 10) {
  return this.sort( function(firstItem, secondItem) {
    if (firstItem.stars > firstItem.stars){
      return 1
    } else {
      return -1;
    }
  }).slice(0, limit);
}
```

```js
> movies.topRated()
```

Refactored with a ternary:

```js
topRated(limit = 10) {
  return this.sort((a, b) => (a.stars > b.stars ? -1 : 1)).slice(0, limit);
}
```

```js
> console.table(movies.topRated())
```

```js
> console.table(movies.topRated(2))
```

Aside: we will be using this in a future exercise

```js
Object.keys(movies)
```

## Angular 2 - Modules, Components and Templates

[Install Angular CLI](https://angular.io/docs/ts/latest/cli-quickstart.html)

```sh
npm install -g angular-cli
ng new routes
cd routes
npm i
npm install @angular-devkit/core@0.0.29
code .
ng serve
```

App is at `http://localhost:4200/`

### Angular modules

`src/app.module.ts`:

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

* the use of ES6 modules
* named imports from node_modules
* custom imports from local file system `('./ ...')`
* ES6 export modules syntax `export class AppModule { }`
* metadata with the `@` sign

@Decorators - provide metadata about components (where to find the template etc.). `@NgModule` decorates the exported class AppModule

* `declarations` are where you will add your components
* `imports` replaces Angular 1x dependency injection e.g.: `angular.module('app, ['ngRoute'])`
* `providers` are for services
* bootstrap defines the starting component - `app.component.ts` - our root component

### Components

`app.component.ts` contains the application logic that controls a portion or region of the view.

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

* `@Component` decorates (provides metadata to) the exported app component
* templateUrl, styleUrls are the paths for the component's html and stylesheets
* `selector` is the custom tag used as `<app-root></app-root>` in `index.html`:

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

Notice `app.component.html`:

```html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{title}}!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
<h2>Here are some links to help you start: </h2>
<ul>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://github.com/angular/angular-cli/wiki">CLI Documentation</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
  </li>
</ul>
```

This is the default html template for `app.component.ts` and is what we are seeing in the browser.

Components are created, updated and detroyed during the application's lifecycle. We can use this lifecycle to perform actions at each moment via optional lifecycle hooks such as `ngOnInit()`.

### main.ts

The kickoff point for the application:

`platformBrowserDynamic().bootstrapModule(AppModule);`

## Angular 2 Router

```sh
ng g component components/home
ng g component components/about
ng g component components/navbar
```

Note the automatic registration of the new components in `app.module`:

```js
...
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
...
declarations: [
  AppComponent,
  HomeComponent,
  AboutComponent,
  NavbarComponent
],
```

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
],
```

In `app.component.html`:

```html
<app-navbar></app-navbar>
<div class="container">
    <router-outlet></router-outlet>
</div>
```

Note the Base href in the main `index.html` template.

In `navbar.component.html`:

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

## Angular 2 Directives

`*ng-repeat, *ng-if, *ngFor`

Structural directives contain a `*`. They may be considered as replacements for [html5 native template tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) (a fascinating study in their own right).

### Generating Components with the Cli

`ng generate component components/vessels`

Creates a `components` folder with a vessels component that consists of:

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

Note the selector in `vessels.component.ts`: `app-vessels`.

Edit `app.component.html` to include this:

```html
<app-vessels></app-vessels>
```

Simplify the class statement a bit and add a few variables.

In `vessels.component.ts`:

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent {
  name = 'Rhiney'
}
```

Edit `vessels.component.html` to use string interpolation:

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

Additional typings include boolean, any, void, undefined, arrays and objects.

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

You can declare a complex variable using an object:

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

interface Pirate {
  id:number,
  name:string,
  weapons:string[],
  vessel:boolean
}
```

Create `Pirate.ts` and cut / paste the interface into it.

`export` the interface:

`export interface Pirate{...`

and add `import { Pirate } from './Pirate'` in the component:

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

```html
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

```html
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

Stop `ng serve` and run:

`ng generate component components/binding`

In `app.component.html`:

`<app-binding></app-binding>`

In `binding.component.ts`:

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

In `binding.component.html`:

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

* One Way Binding  DOM < Component

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

### HTML Classes

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

```html
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

export class BindingComponent {
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
  ...
}
```

ngStyle is similar.

```html
<p [style.font-size]="isSpecial ? 'x-large' : 'smaller' ">Font size depends on the value of isSpecial</p>
```

### Pipes

```js
givenDay = new Date(1767, 1, 25)
```

```html
<p>{{ givenDay }} was a blast!</p>
<p>{{ givenDay | date }} was a blast!</p>
<p>{{ givenDay | date:"MM-dd-yyyy" }} was a blast!</p>
<p>{{ givenDay | date:"yyyy" }} was a blast!</p>
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

Run in the terminal:

`ng generate component components/forms`

Change the `app.component.html` file:

`<app-forms></app-forms>`

This requires importing the forms module in order to use.

in `app.module.ts`:

```js
import { FormsModule } from '@angular/forms';

...

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

In Angular 2+ use hotdogs (or a football in a box):

`<input [(ngModel)]="name" />`

===

`forms.component.ts`:

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

In forms.component.html:

```html
<input [(ngModel)]="name" type="text" name="name" required placeholder="Name" />

<input [(ngModel)]="number" type="number" name="number" min="0" max="10" step="2" required placeholder="Even num < 10">
```

Add text node to the form.html to see data binding

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
```

```html
<form (submit)="addPirate()">
```

Add rudimentary feedback:

```html
<label for="name">Name:</label>

<input
  [(ngModel)]="name"
  #userName="ngModel"
  minlength="2"
  type="text"
  name="name"
  required
  placeholder="Name" />
</li>

<div *ngIf="userName.errors?.required && userName.touched" class="alert">Name is required</div>
<div *ngIf="userName.errors?.minlength && userName.touched" class="alert">Name should be longer</div>
```

## Angular 2 - Services

A class that can be used to send functionality and data across multiple components. Keeps apps DRY.

* $http.get('api/...') vs
* http.get('api/...')

Can return a promise but returns an rxjs observable by default.

Often used:

* for Ajax calls using the Http module to allow write-once data sharing amongst multiple components.
* with onInit hooks to load code before rendering.

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

display the results from the service:

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

## Notes

### Parameters

Recall that parameters are used in routes to pass additional information for use in a SPA.

`ng g component components/userDetails`

app.module:

```js
const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'user/:id', component:UserDetailsComponent}
];
```

In `user-details.component` add:

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

## More Notes

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
