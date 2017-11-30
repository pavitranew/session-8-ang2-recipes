# Classes
 
## Prototypal inheritance Review

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
</script>
</body>
</html>
```

Include a *constructor* function:

```js
function Car(model, make) {
  this.model = model;
  this.make = make;
}
```

and a car with properties.

Run in the browser's console:

```js
> expo
```

### Prototypal inheritance 

Methods on the original constructor will be inherited.

Example: Array Methods

Create an array: 

```js
> const names = ['John', 'Henry']
```

Examine the Array. Note the Array prototypes, e.g.:

```js
> names.join(', ')
> names.pop()
```

Add a prototype:

```js
Car.prototype.drive = function() {
    console.log(`Vroom vroom! I'm a ${this.model}`);
}
```

Add a second car:

```js
const miata = new Car('Miata', 'Mazda');
```

```js
> miata.drive()
> expo.drive()
```

expo inherits the prototype.

Override with (add after)

```js
Car.prototype.drive = function() {
    console.log(`Vroom vroom 🚗 🚗 🚗! I'm a ${this.model} and I'm a ${this.make}`);
}
```

```js
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

### Classes

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Classes</title>
</head>
<body>
  
  <script>
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

  </script>
</body>
</html>
```

In the console:

```js
> expo
> expo.drive()
> expo.stop()
```

### Static Methods

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

Inspect the expo prototype.

A static method is *not* inherited.

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

```js
get description() {
  return `${this.model} is a ${this.make} type of car`;
}
```

* Not a method (no braces when calling)

```js
> expo.description
```

Setters

```js
set nicknames(value) {
  this.nick = value.trim();
}
```

```js
expo.nicknames = '   grumbler   '
```

```js
get nicknames() {
  return this.nick.toUpperCase();
}
```

```js
expo.nicknames
```

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

```js
> rhino
> rhino.eat('lilies')
> rhino.eat('hunters')
> rhino.drink()
```

#### Super

We want to extend our Animal class to include a subclass: dogs which will include a breed.

This will not work:

```js
class Dog extends Animal {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}
```

```js
const yorik = new Dog('Yorik', 'Terrier');
```

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
```

Examine the heirarchy in the inspector.

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

### Extending Arrays

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
        return this.sort((a, b) => (a.stars > b.stars ? -1 : 1)).slice(0, limit);
      }
    }

    const movies = new MovieCollection('My Favorite Movies',
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

Making our own classes modelled after Array so they inheret all prototypes of an array.

Start off with an array with a property:

```js
const movies = new MovieCollection('My Favorite Movies',
  { name: 'Sausage Party', stars: 10 },
  { name: 'Star Wars Trek', stars: 1 },
  { name: 'Virgin Suicides', stars: 7 },
  { name: 'Alice in the Cities', stars: 8 }
);
```

We create a class _off_ the Array.

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

More useful will be `for... of` which returns only the array:

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



















