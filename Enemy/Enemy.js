class Enemy {
    #life;

    constructor(x, y, life, speed = 1, reward = 10, path) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.#life = life;
        this.baseSpeed = speed;
        this.currentSpeed = speed;
        this.reward = reward;

        this.path = path;
        this.currentPointIndex = 0;
        this.reachedEnd = false;

        this.isSlow = false;
        this.slownessDuration = 0;
    }

    getLife() {
        return this.#life;
    }

    receiveDamage(damage) {
        if (damage > 0) {
            this.#life -= damage;
        }
    }

    update() {
        if (this.currentPointIndex < this.path.length) {
            let target = this.path[this.currentPointIndex];
            let d = dist(this.x, this.y, target.x, target.y);

            //Chegou perto (5 pixels)
            if (d < 5) {
                this.currentPointIndex++;
            } else {
                let angle = Math.atan2(target.y - this.y, target.x - this.x);
                this.x += this.currentSpeed * Math.cos(angle);
                this.y += this.currentSpeed * Math.sin(angle);
            }
        } else {
            this.reachedEnd = true;
        }


        if (this.isSlow) {
            this.currentSpeed = this.baseSpeed * 0.5;
            this.slownessDuration--;
            if (this.slownessDuration <= 0) {
                this.isSlow = false;
                this.currentSpeed = this.baseSpeed;
            }
        }
    }

    draw() {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.x, this.y, this.width, this.height);

        fill(50);
        rect(this.x - this.width / 2, this.y - this.height, this.width, 5);
        fill(0, 255, 0);
        //Para a vida não ficar negativa
        const currentLife = Math.max(0, this.#life);
        const lifePercentage = currentLife / 100;
        rect(this.x - this.width / 2, this.y - this.height, this.width * lifePercentage, 5);
    }
}