var PLAY = 1
var END = 0
var gameState = PLAY

var trex, trex_running, trex_collided
var ground, invisibleGround, groundImage

var cloudsGroup, cloudImage
var obstaclesGroup,
  obstacle1,
  obstacle2,
  obstacle3,
  obstacle4,
  obstacle5,
  obstacle6

var score

var message = false

var gameOverImg, restartImg
var jumpSound, checkPointSound, dieSound

function preload() {
  trex_running = loadAnimation(
    'images/trex1.png',
    'images/trex3.png',
    'images/trex4.png'
  )
  trex_collided = loadAnimation('images/trex_collided.png')

  groundImage = loadImage('images/ground2.png')

  cloudImage = loadImage('images/cloud.png')

  obstacle1 = loadImage('images/obstacle1.png')
  obstacle2 = loadImage('images/obstacle2.png')
  obstacle3 = loadImage('images/obstacle3.png')
  obstacle4 = loadImage('images/obstacle4.png')
  obstacle5 = loadImage('images/obstacle5.png')
  obstacle6 = loadImage('images/obstacle6.png')

  restartImg = loadImage('images/restart.png')
  gameOverImg = loadImage('images/gameOver.png')

  jumpSound = loadSound('sounds/jump.mp3')
  dieSound = loadSound('sounds/die.mp3')
  checkPointSound = loadSound('sounds/checkPoint.mp3')
}

function setup() {
  createCanvas(600, 200)

  trex = createSprite(50, 180, 20, 50)
  trex.addAnimation('running', trex_running)
  trex.addAnimation('collided', trex_collided)
  trex.scale = 0.5

  ground = createSprite(200, 180, 400, 20)
  ground.addImage('ground', groundImage)
  ground.x = ground.width / 2

  gameOver = createSprite(300, 100)
  gameOver.addImage(gameOverImg)

  restart = createSprite(300, 140)
  restart.addImage(restartImg)

  gameOver.scale = 0.5
  restart.scale = 0.5

  invisibleGround = createSprite(200, 190, 400, 10)
  invisibleGround.visible = false

  //criar grupos de obstáculos e nuvens
  obstaclesGroup = createGroup()
  cloudsGroup = createGroup()

  trex.setCollider('circle', 0, 0, 40)
  // trex.debug = true

  score = 0

  console.log('Function setup: ' + message)
}

function draw() {
  background(180)
  //exibir pontuação
  text('Pontuação: ' + score, 500, 50)

  console.log('Function draw: ' + message)

  if (gameState === PLAY) {
    gameOver.visible = false
    restart.visible = false
    //mover o solo
    ground.velocityX = -4
    //pontuação
    score = score + Math.round(frameCount / 60)

    if (score % 600 === 0 && score > 0) {
      checkPointSound.play()
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2
    }

    //pular quando a tecla de espaço for pressionada
    if (keyDown('space') && trex.y >= 100) {
      trex.velocityY = -12
      jumpSound.play()
    }

    //adicione gravidade
    trex.velocityY = trex.velocityY + 0.8

    //gerar as nuvens
    spawnClouds()

    //gerar obstáculos no solo
    spawnObstacles()

    if (obstaclesGroup.isTouching(trex)) {
      gameState = END
    }
  } else if (gameState === END) {
    gameOver.visible = true
    restart.visible = true

    ground.velocityX = 0
    trex.velocityY = 0

    //mudar a animação do trex
    trex.changeAnimation('collided', trex_collided)

    //definir a vida útil dos objetos do jogo para que nunca sejam destruídos
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)

    if (mousePressedOver(restart)) {
      reset()
    }
  }

  //impedir que o trex caia
  trex.collide(invisibleGround)

  drawSprites()
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, 165, 10, 40)
    obstacle.velocityX = -6

    //gerar obstáculos aleatórios
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1)
        break
      case 2:
        obstacle.addImage(obstacle2)
        break
      case 3:
        obstacle.addImage(obstacle3)
        break
      case 4:
        obstacle.addImage(obstacle4)
        break
      case 5:
        obstacle.addImage(obstacle5)
        break
      case 6:
        obstacle.addImage(obstacle6)
        break
      default:
        break
    }

    //atribuir escala e vida útil ao obstáculo
    obstacle.scale = 0.5
    obstacle.lifetime = 300

    //adicione cada obstáculo ao grupo
    obstaclesGroup.add(obstacle)
  }
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10)
    cloud.y = Math.round(random(10, 60))
    cloud.addImage(cloudImage)
    cloud.scale = 0.5
    cloud.velocityX = -3

    //atribuir tempo de vida à variável
    cloud.lifetime = 134

    //ajustar a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1

    //adicionando nuvem ao grupo
    cloudsGroup.add(cloud)
  }
}

function reset() {
  gameState = PLAY
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()

  trex.changeAnimation('running')

  score = 0
}
