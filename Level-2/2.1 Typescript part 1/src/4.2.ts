// 4.2

// @ts-ignore
function hey(abstractPet: { name: () => string }): string {
    return "hey! i'm " + abstractPet.name();
}

class Animal {
    initialName: string;
    value: any;

    constructor(initialName: string, value: any) {
        this.initialName = initialName;
        this.value = value;
    }

    name = () => this.initialName;

}

class Cat extends Animal {
}

class Dog extends Animal {
}

let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey(a)
hey(b)