//Variáveis gerais de configurações
let arrowTowerImg, cannonTowerImg, arrowTowerCard, cannonTowerCard, goblinImg, scoutImg, bruteImg, tankImg, bossImg, menuBg, gameBg;
let enemies = [];
let towers = [];
let projectiles = [];
let manager;
let arrowTower, cannonTower;

//Variáveis que controlam as ondas (hordas)
let currentWaveIndex = -1;
let enemiesToSpawn = [];
let timeToNextWave = 5;
let spawnTimer = 0;
let currentWave;

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

//Ondas (waves)
const ENEMY_PRESETS = {
  'goblin': { class: Goblin, img: goblinImg, life: Goblin.LIFE, speed: Goblin.SPEED, reward: Goblin.REWARD },
  'scout': { class: Scout, img: scoutImg, life: Scout.LIFE, speed: Scout.SPEED, reward: Scout.REWARD },
  'brute': { class: Brute, img: bruteImg, life: Brute.LIFE, speed: Brute.SPEED, reward: Brute.REWARD },
  'tank': { class: Tank, img: tankImg, life: Tank.LIFE, speed: Tank.SPEED, reward: Tank.REWARD },
  'boss': { class: Boss, img: bossImg, life: Boss.LIFE, speed: Boss.SPEED, reward: Boss.REWARD }
};

const WAVES = [
  // Onda 1:Goblin
  {
    timeToNextWave: 5,
    enemies: [
      { type: 'goblin', count: 10, spawnRate: 2 }
    ]
  },
  // Onda 2:Goblins mais rápidos
  {
    timeToNextWave: 5,
    enemies: [
      { type: 'goblin', count: 15, spawnRate: 1.5 }
    ]
  },
  // Onda 3:Scout (rápido)
  {
    timeToNextWave: 5,
    enemies: [
      { type: 'goblin', count: 10, spawnRate: 1 },
      { type: 'scout', count: 5, spawnRate: 1 }
    ]
  },
  // Onda 4:Brute
  {
    timeToNextWave: 5,
    enemies: [
      { type: 'scout', count: 10, spawnRate: 1.5 },
      { type: 'brute', count: 1, spawnRate: 1 }
    ]
  },
  // Onda 5:Goblins
  {
    timeToNextWave: 5,
    enemies: [
      { type: 'goblin', count: 40, spawnRate: 0.3 }
    ]
  },
  // Onda 6:Scout e brute
  {
    timeToNextWave: 5,
    enemies: [
      { type: 'scout', count: 15, spawnRate: 1 },
      { type: 'brute', count: 3, spawnRate: 2 }
    ]
  },
  // Onda 7:Tanks
  {
    timeToNextWave: 5,
    enemies: [
      { type: 'tank', count: 2, spawnRate: 3 }
    ]
  },
  // Onda 8: Scouts e brute
  {
    timeToNextWave: 5,
    enemies: [
      { type: 'scout', count: 20, spawnRate: 0.5 },
      { type: 'brute', count: 5, spawnRate: 1.5 }
    ]
  },
  // Onda 9: O Chefão (Boss)
  {
    timeToNextWave: 10,
    enemies: [
      { type: 'brute', count: 5, spawnRate: 2 },
      { type: 'boss', count: 1, spawnRate: 1 }, // O Boss
      { type: 'goblin', count: 20, spawnRate: 0.5 } // Goblins para distrair
    ]
  },
  // Onda 10: A Horda Final
  {
    timeToNextWave: 0, // Fim do jogo
    enemies: [
      { type: 'tank', count: 3, spawnRate: 3 },
      { type: 'brute', count: 10, spawnRate: 1 },
      { type: 'scout', count: 30, spawnRate: 0.3 }
    ]
  }
];

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

function startNextWave() {
  currentWaveIndex++;
  if (currentWaveIndex >= WAVES.length) {
    screens = 'gameOver'; //Lembrar de criar tela de win
    return;
  }

  currentWave = WAVES[currentWaveIndex];
  enemiesToSpawn = [];
  currentWave.enemies.forEach(group => {
    for (let i = 0; i < group.count; i++) {
      enemiesToSpawn.push({ type: group.type, spawnRate: group.spawnRate });
    }
  });

  spawnTimer = enemiesToSpawn[0].spawnRate; // Define o timer para o primeiro inimigo
  timeToNextWave = currentWave.timeToNextWave;
}

// Cria um inimigo da fila
function spawnEnemy() {
  if (enemiesToSpawn.length === 0) return;

  const enemyData = enemiesToSpawn.shift(); // Pega o próximo inimigo da fila
  const preset = ENEMY_PRESETS[enemyData.type];

  if (preset) {
    // Cria o inimigo usando a Classe e os atributos do preset
    enemies.push(new preset.class(path[0].x, path[0].y));
  }

  // Define o timer para o próximo inimigo, se houver
  if (enemiesToSpawn.length > 0) {
    spawnTimer = enemiesToSpawn[0].spawnRate;
  }
}

function startGame() {
  enemies = [];
  towers = [];
  projectiles = [];
  currentWaveIndex = -1; // Começa em -1 para que a primeira chamada inicie a onda 0
  enemiesToSpawn = [];
  timeToNextWave = 5;
  spawnTimer = 0;
  manager = new GameManager(250, 20); //250 de dinheiro, 20 vidas
  arrowTower = new ArrowTower(100 - arrowTowerImg.width / 2, 300 - arrowTowerImg.height / 2);
  cannonTower = new CannonTower(100 - (arrowTowerImg.width / 2) + 100, 300 - arrowTowerImg.height / 2);
}