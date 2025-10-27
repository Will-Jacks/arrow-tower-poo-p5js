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

    static validateConstructionPos(x, y, allTowers) {
        for (let tower of allTowers) {
            let d = this.calculateDistance(x, y, tower.x, tower.y);
            if (d < 40) { // Distância mínima
                return false;
            }
        }
        return true;
    }

    static formatMoney(value) {
        return `R$ ${value.toFixed(2)}`;
    }
}