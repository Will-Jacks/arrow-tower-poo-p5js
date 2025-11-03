let arrowTowerImg, cannonTowerImg, arrowTowerCard, cannonTowerCard, goblinImg, scoutImg, bruteImg, tankImg, bossImg, menuBg, gameBg;
let enemies = [];
let towers = [];
let projectiles = [];
let manager;
let arrowTower, cannonTower;

// Valores default pra o card selecionado
let currentSelectedTower = ArrowTower;
let towerCost = ArrowTower.COST;

let screens = 'menu';

//Caminho
let path = [
  { x: -30, y: 150 },
  { x: 200, y: 150 },
  { x: 200, y: 300 },
  { x: 300, y: 300 },
  { x: 300, y: 150 },
  { x: 500, y: 150 },
  { x: 500, y: 0 }
];

const pathStrokeWeight = 25;

function preload() {
  arrowTowerImg = loadImage("./public/arrowTower.png");
  cannonTowerImg = loadImage("./public/cannonTower.png");
  arrowTowerCard = loadImage("./public/arrowTowerCard.png");
  cannonTowerCard = loadImage("./public/cannonTowerCard.png");
  menuBg = loadImage("./public/menu-bg.jpg");
  gameBg = loadImage("./public/game-bg.png");
  goblinImg = loadImage("./public/goblin.png");
  tankImg = loadImage("./public/tank.png");
  scoutImg = loadImage("./public/scout.png");
  bruteImg = loadImage("./public/brute.png");
  bossImg = loadImage("./public/boss.png");
}

function setup() {
  createCanvas(600, 600);
  manager = new GameManager(500, 20);
}

function draw() {
  switch (screens) {
    case 'menu':
      drawMenu();
      break;
    case 'game':
      if (manager.isGameOver()) {
        screens = 'gameOver';
        break;
      }
      drawGame();
      drawTowerCards();
      checkTowerCardHover();
      break;
    case 'gameOver':
      drawGameOver();
      break;
  }

}

function mousePressed() {
  if (screens === 'game') {
    let clickedTower = checkTowerCardClick();
    if (clickedTower) {
      currentSelectedTower = clickedTower.type;
      towerCost = clickedTower.cost;
      return; // Impede a construção de uma torre ao clicar
    }

    if (currentSelectedTower) {
      let canConstruct = GameManager.validateConstructionPos(mouseX, mouseY, towers, path, pathStrokeWeight);
      if (canConstruct && manager.canBuy(towerCost)) {
        if (manager.spendMoney(towerCost)) {
          towers.push(new currentSelectedTower(mouseX - ArrowTower.W / 2, mouseY - ArrowTower.H / 2));
        }
      } else if (!canConstruct) {
        console.log("Não pode construir aqui, muito perto de outro objeto.");
      } else {
        console.log("Dinheiro insuficiente.");
      }
    }
  }
}

// Adiciona inimigos periodicamente
setInterval(() => {
  if (!manager.isGameOver()) { // Só adiciona se o jogo não acabou
    enemies.push(new Scout(path[0].x, path[0].y));
  }
}, 1000); // A cada 3 segundos

function startGame() {
  enemies = [];
  towers = [];
  projectiles = [];
  manager = new GameManager(500, 20); //500 de dinheiro, 20 vidas
  arrowTower = new ArrowTower(100 - arrowTowerImg.width / 2, 300 - arrowTowerImg.height / 2);
  cannonTower = new CannonTower(100 - (arrowTowerImg.width / 2) + 100, 300 - arrowTowerImg.height / 2);
  //Criando torre inicial
  //towers.push(arrowTower);
  //towers.push(cannonTower);
  // Criando inimigo e o caminho a percorrer
  //enemies.push(new Enemy(path[0].x, path[0].y, 100, 2, 10, path));
}