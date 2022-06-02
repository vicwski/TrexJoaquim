var box

function setup() {
  createCanvas(400, 400)
  box = new Box()
  console.log(box)
}
function draw() {
  background(220)
  box.display()
}
