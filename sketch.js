let arrowTowerImg, cannonTowerImg, arrowTowerCard, cannonTowerCard, menuBg;
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
      fill(255, 0, 0);
      text(mouseX + "," + mouseY, mouseX, mouseY);
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
      if (canConstruct && manager.canBuy(ArrowTower.COST)) {
        if (manager.spendMoney(ArrowTower.COST)) {
          towers.push(new currentSelectedTower(mouseX - ArrowTower.W / 2, mouseY - ArrowTower.H / 2));
        }
      } else if (!canConstruct) {
        alert("Não pode construir aqui, muito perto de outro objeto.");
      } else {
        alert("Dinheiro insuficiente.");
      }
    }
  }
}

// Adiciona inimigos periodicamente
setInterval(() => {
  if (!manager.isGameOver()) { // Só adiciona se o jogo não acabou
    enemies.push(new Enemy(path[0].x, path[0].y, 100, 2, 10, path));
  }
}, 3000); // A cada 3 segundos

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
  enemies.push(new Enemy(path[0].x, path[0].y, 100, 2, 10, path));
}