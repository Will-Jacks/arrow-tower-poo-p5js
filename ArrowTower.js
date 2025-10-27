class ArrowTower extends Tower {
    static COST = 100;
    static RANGE = 150;
    static IMAGE = image(arrowTowerImg, _, _, 50, 50);
    constructor(x, y) {
        super(x, y, ArrowTower.IMAGE, ArrowTower.COST, 20, ArrowTower.RANGE);
        this.shotSpeed = 10;
        this.cooldownBase = 60;
        this.cooldown = 0;
    }

    attack(enemy) {
        if (this.cooldown <= 0 && enemy) {
            let arrow = new Projectile(
                this.centerX,
                this.centerY,
                enemy,
                this.damage,
                this.shotSpeed
            );
            projectiles.push(arrow);
            this.cooldown = this.cooldownBase;
        }

    }

    update(enemies) {
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        let target = this.findTargets(enemies);
        if (target) {
            this.attack(target);
        }
    }
}