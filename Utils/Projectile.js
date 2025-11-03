class Projectile {
    constructor(x, y, target, damage, speed, effect = null) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.damage = damage;
        this.speed = speed;
        this.effect = effect;
        this.size = 5;
        this.hit = false;
    }

    update() {
        // Se o alvo ainda existe (não foi removido/morto)
        if (this.target && this.target.getLife() > 0) {
            //Calcular a distância
            let d = GameManager.calculateDistance(this.x, this.y, this.target.x, this.target.y);
            //Verificar se vai atingir
            if (d < this.speed || d < this.target.width / 2 + this.size / 2) {
                this.target.receiveDamage(this.damage);
                this.hit = true; //Pegou
            } else {
                let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
                this.x += this.speed * Math.cos(angle);
                this.y += this.speed * Math.sin(angle); //Continua se movendo normalmente se não pegou no inimigo
            }
        } else {
            this.hit = true; // Se o alvo não existe mais, marca para remoção
        }
    }

    hasHitTarget() {
        return this.hit;
    }

    isOffScreen() {
        return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
    }

    draw() {
        fill(255, 255, 0);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }
}