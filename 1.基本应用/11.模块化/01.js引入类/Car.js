function Car(brand) {
    this.brand = "";
    if (brand) this.brand = brand;
}

Car.prototype.go = function () {
    console.log(this.brand + " is going");
};
