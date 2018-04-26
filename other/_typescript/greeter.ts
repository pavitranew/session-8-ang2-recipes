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

var user = new Student("Jane", "M", "User");

document.body.innerHTML = greeter(user);