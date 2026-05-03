class Pizza {
    constructor() { this.name = 'Pizza 🍕'; }
    prepare() { return Preparing ${this.name}; }
}

class Burger {
    constructor() { this.name = 'Burger 🍔'; }
    prepare() { return Preparing ${this.name}; }
}

class Drink {
    constructor() { this.name = 'Drink 🥤'; }
    prepare() { return Preparing ${this.name}; }ذذ
}

class FoodFactory {
    static foods = { pizza: Pizza, burger: Burger, drink: Drink };
    static create(type) { return new this.foods[type](); }
}

document.getElementById('orderBtn').onclick = () => {
    const type = document.getElementById('foodType').value;
    document.getElementById('result').textContent = FoodFactory.create(type).prepare();
};