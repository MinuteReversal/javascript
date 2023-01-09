class Car {
  color;
  constructor(color = "red") {
    this.color = color;
  }
  drive() {
    console.log(`${this.color} color car are driving.`);
  }
}
