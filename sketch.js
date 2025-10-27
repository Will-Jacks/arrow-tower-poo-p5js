let arrowTowerImg, menuBg;
let enemies = [];
let towers = [];
let projectiles = [];
let manager;
let arrowTower;

let screens = 'menu';

// Defina o caminho aqui
let path = [
  { x: -30, y: 300 },
  { x: 200, y: 300 },
  { x: 200, y: 150 },
  { x: 300, y: 150 },
  { x: 300, y: 300 },
  { x: 500, y: 300 },
  { x: 500, y: 0 }
];

function preload() {
  arrowTowerImg = loadImage("./public/arrowTower.png");
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
      }
      drawGame();
      break;
    case 'gameOver':
      drawGameOver();
      break;
  }

}

function mousePressed() {
  if (screens === 'game') {
    let canConstruct = GameManager.validateConstructionPos(mouseX, mouseY, towers);

    if (canConstruct && manager.canBuy(ArrowTower.COST)) {
      if (manager.spendMoney(ArrowTower.COST)) {
        towers.push(new ArrowTower(mouseX - arrowTowerImg.width / 2, mouseY - arrowTowerImg.height / 2));
      }
    } else if (!canConstruct) {
      console.log("Não pode construir aqui, muito perto de outra torre."); // Melhor usar console.log que alert
    } else {
      console.log("Dinheiro insuficiente.");
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
  //Criando torre inicial
  towers.push(arrowTower);
  // Criando inimigo e o caminho a percorrer
  enemies.push(new Enemy(path[0].x, path[0].y, 100, 2, 10, path));
}