module.exports = class Car {
    constructor(brand) {
        this.brand = "";
        if (brand) this.brand = brand;
    }
    go() {
        console.log(this.brand + " is going");
    }
};