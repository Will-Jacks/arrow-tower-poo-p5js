class CannonTower extends Tower {
    static COST = 50;
    static RANGE = 100;
    static W = 100;
    static H = 100;
    static DAMAGE = 30;

    constructor(x, y) {
        super(x, y, cannonTowerImg, CannonTower.COST, CannonTower.DAMAGE, CannonTower.RANGE, CannonTower.W, CannonTower.H);
        this.shotSpeed = 5;
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