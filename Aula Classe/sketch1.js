var box
var caixa

function setup() {
  createCanvas(400, 400)

  box = new Box(200, 100, 50, 40)
  console.log(box)

  caixa = new Box(300, 200, 20, 20)
}
function draw() {
  background(220)
  
  box.display()
  caixa.display()
}
