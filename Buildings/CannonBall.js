class CannonBall extends Projectile {

    constructor(x, y, target, damage, speed, areaOfEffectRadius) {
        super(x, y, target, damage, speed);

        this.areaOfEffectRadius = areaOfEffectRadius;
        this.size = 10;
    }

    update() {
        // Se o alvo ainda existe (não foi removido/morto)
        if (this.target && this.target.getLife() > 0) {
            // Move-se em direção ao alvo (lógica copiada do Projectile)
            let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
            this.x += this.speed * Math.cos(angle);
            this.y += this.speed * Math.sin(angle);

            // Verifica colisão
            let d = GameManager.calculateDistance(this.x, this.y, this.target.x, this.y);

            if (d < this.target.width / 2 + this.size / 2) {
                this.hit = true;
                this.explode();
            }
        } else {
            // Se o alvo não existe mais, marca para remoção
            this.hit = true;
        }
    }

    explode() {
        // Itera por TODOS os inimigos (array global do sketch.js)
        for (let enemy of enemies) {
            let distToEnemy = GameManager.calculateDistance(this.x, this.y, enemy.x, enemy.y);

            // Se o inimigo está dentro do raio de explosão
            if (distToEnemy <= this.areaOfEffectRadius) {
                enemy.receiveDamage(this.damage);
            }
        }
    }

    //Polimorfismo (sobrescrita do método 'draw')
    draw() {
        fill(80, 80, 80); // Cinza escuro
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }
}