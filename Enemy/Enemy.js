class Enemy {
    #life;

    constructor(x, y, img, life, speed = 1, reward = 10, path) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = 40;
        this.height = 40;
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
        push();
        imageMode(CENTER);
        image(this.img, this.x, this.y - this.height / 2, this.width, this.height);
        pop();
        //Barra de comparação da vida
        noStroke();
        fill(50);
        rect(this.x - this.width / 2, this.y - this.height, this.width, 5, 10);
        //Para a vida não ficar negativa
        const currentLife = Math.max(0, this.#life);
        const lifePercentage = currentLife / 100;
        //Barra de vida verde
        fill(0, 255, 0);
        rect(this.x - this.width / 2, this.y - this.height, this.width * lifePercentage, 5, 10);
    }
}