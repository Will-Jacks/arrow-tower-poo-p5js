class GameManager {
    #money;
    #lives;

    constructor(initialMoney, initialLives = 20) {
        this.#money = initialMoney;
        this.#lives = initialLives;
        this.score = 0;
        this.wavesCompleted = 0;
    }

    get playerMoney() {
        return this.#money;
    }
    set playerMoney(value) {
        this.#money = value;
    }

    get playerLives() {
        return this.#lives;
    }

    loseLife(amount = 1) {
        this.#lives -= amount;
        if (this.#lives < 0) {
            this.#lives = 0;
        }
    }

    isGameOver() {
        return this.#lives <= 0;
    }
    canBuy(cost) {
        return this.#money >= cost;
    }

    spendMoney(cost) {
        if (this.canBuy(cost)) {
            this.#money -= cost;
            return true;
        }
        return false;
    }

    addMoney(value) {
        this.#money += value;
    }


    static calculateDistance(x1, y1, x2, y2) {
        return dist(x1, y1, x2, y2);
    }

    static validateConstructionPos(x, y, allTowers, pathPoints, pathWidth) {
        // 1. Verificar se não está em cima de outra torre
        for (let tower of allTowers) {
            let d = this.calculateDistance(x, y, tower.centerX, tower.centerY);
            if (d < 50) { // Ou o raio da torre, se preferir
                return false; // Não pode construir aqui, muito perto de outra torre
            }
        }
        // 2. Verificar se não está em cima do caminho
        // x, y é o centro da nova torre.
        // O pathWidth é a largura total do caminho (strokeWeight).
        // Precisamos de uma margem que inclua a metade da largura da torre + a metade da largura do caminho.
        const SAFE_DISTANCE_FROM_PATH = (pathWidth / 2 + ArrowTower.W / 2) - 20; // Exemplo: 25/2 + 50/2 = 12.5 + 25 = 37.5

        for (let i = 0; i < pathPoints.length - 1; i++) {
            let p1 = pathPoints[i];
            let p2 = pathPoints[i + 1];

            //Precisei criar a função dist do p5 na mão, já que não funciona pra métodos estáticos
            let distToSegment = GameManager.distancePointToSegment(x, y, p1.x, p1.y, p2.x, p2.y);
            if (distToSegment < SAFE_DISTANCE_FROM_PATH) {
                return false; // Não pode construir em cima do caminho
            }
        }
        return true; // Posição válida
    }

    // Função auxiliar para calcular a distância de um ponto (px, py) a um segmento (x1, y1) - (x2, y2)
    // Isso é mais preciso do que apenas verificar a distância para os pontos de referência
    static distancePointToSegment(px, py, x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let lengthSq = dx * dx + dy * dy;
        let t = 0;
        if (lengthSq !== 0) {
            t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
            t = constrain(t, 0, 1); // Garante que 't' esteja entre 0 e 1 (dentro do segmento)
        }

        let nearestX = x1 + t * dx;
        let nearestY = y1 + t * dy;

        return dist(px, py, nearestX, nearestY);
    }

    static formatMoney(value) {
        return `🪙 ${value.toFixed(2)}`;
    }
}