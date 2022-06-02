class Box {
  constructor() {
    this.x = 200
    this.y = 200
    this.width = 40
    this.height = 40
  }

  display() {
    rect(this.x, this.y, this.width, this.height)
  }
}
