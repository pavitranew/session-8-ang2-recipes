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