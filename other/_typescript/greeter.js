var Car = (function () {
    function Car(model, make) {
        this.model = model;
        this.make = make;
    }
    Car.prototype.drive = function () {
        console.log("Vroom vroom \uD83D\uDE97 \uD83D\uDE97 \uD83D\uDE97! I'm a " + this.model + " and I'm a " + this.make);
    };
    Car.prototype.stop = function () {
        console.log("Screech! \uD83D\uDE92 \uD83D\uDE91 \uD83D\uDE93");
    };
    Car.info = function () {
        console.log('I\'m a static method, cars only need apply');
    };
    Object.defineProperty(Car.prototype, "description", {
        get: function () {
            return this.model + " is a " + this.make + " model car";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "nicknames", {
        get: function () {
            return this.nick.toUpperCase();
        },
        set: function (value) {
            this.nick = value.trim();
        },
        enumerable: true,
        configurable: true
    });
    return Car;
}());
var expo = new Car('Expo', 'Ford');
var miata = new Car('Miata', 'Mazda');
document.body.innerHTML = "Hello " + expo.make;
