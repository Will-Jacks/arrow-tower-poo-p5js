class CannonBall extends Projectile {

    constructor(x, y, target, damage, speed, areaOfEffectRadius) {
        super(x, y, target, damage, speed);

        this.areaOfEffectRadius = areaOfEffectRadius;
        this.size = 10;
    }

    update() {
        if (this.target && this.target.getLife() > 0) {
            let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
            this.x += this.speed * Math.cos(angle);
            this.y += this.speed * Math.sin(angle);
            let d = GameManager.calculateDistance(this.x, this.y, this.target.x, this.y);
            if (d < this.target.width / 2 + this.size / 2) {
                this.hit = true;
                this.explode();
            }
        } else {
            this.hit = true;
        }
    }

    explode() {
        for (let enemy of enemies) {
            let distToEnemy = GameManager.calculateDistance(this.x, this.y, enemy.x, enemy.y);
            if (distToEnemy <= this.areaOfEffectRadius) {
                enemy.receiveDamage(this.damage);
            }
        }
    }

    draw() {
        fill(80, 80, 80); // Cinza escuro
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }
}