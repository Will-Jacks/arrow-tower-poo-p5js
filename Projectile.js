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
            // Calcula o ângulo em direção ao alvo *a cada quadro* (projétil teleguiado)
            let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
            this.x += this.speed * Math.cos(angle);
            this.y += this.speed * Math.sin(angle);

            // Verifica colisão
            let d = GameManager.calculateDistance(this.x, this.y, this.target.x, this.target.y);
            // Considera o tamanho do inimigo e do projétil para colisão
            if (d < this.target.width / 2 + this.size / 2) {
                this.target.receiveDamage(this.damage); // Causa dano
                this.hit = true; // Marca como atingido
                // Aplicar efeito se houver (ex: lentidão)
                if (this.effect) {
                    // Lógica para aplicar o efeito (ex: this.target.applyEffect(this.effect))
                }
            }
        } else {
            // Se o alvo não existe mais, marca para remoção (ou continua reto)
            // Para simplificar, vamos marcar para remoção imediata se o alvo sumir
            this.hit = true; // Ou poderia continuar o movimento reto
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