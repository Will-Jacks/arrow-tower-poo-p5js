class Tower {
    #range;
    #cost;
    constructor(x, y, img, cost, damage, range, w, h) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.#cost = cost;
        this.damage = damage;
        this.#range = range;
        this.cooldown = 0;
        this.width = w;
        this.height = h;

        //Para cálculos de distância
        this.centerX = x + this.width / 2;
        this.centerY = y + this.height / 2;
    }

    get cost() {
        return this.#cost;
    }

    get range() {
        return this.#range;
    }

    set range(newRange) {
        if (newRange > 0) {
            this.#range = newRange;
        }
    }

    attack(target) {
        if (this.cooldown === 0) {
            target.takeDamage(this.damage);
            this.cooldown = 30;
        }
    }

    findTargets(enemies) {
        let nearestEnemy = null;
        let minDistance = this.#range + 1;
        for (let enemy of enemies) {
            let d = GameManager.calculateDistance(this.centerX, this.centerY, enemy.x, enemy.y);
            if (d <= this.#range && d < minDistance) {
                minDistance = d;
                nearestEnemy = enemy;
            }
        }
        return nearestEnemy;
    }

    update(enemies) {
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        let target = this.findTargets(enemies);
        if (target && this.cooldown === 0) {
            this.attack(target);
        }
    }
    draw() {
        image(this.img, this.x, this.y, this.width, this.height);
        noFill();
        stroke(0, 255, 0, 100);
        strokeWeight(2);
        ellipse(this.centerX, this.centerY, this.#range * 2);
    }
}