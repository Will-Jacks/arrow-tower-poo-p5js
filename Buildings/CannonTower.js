class CannonTower extends Tower {
    static COST = 125;
    static RANGE = 100;
    static W = 100;
    static H = 100;
    static DAMAGE = 30;
    static EXPLOSION_RADIUS = 50;

    constructor(x, y) {
        super(x, y, cannonTowerImg, CannonTower.COST, CannonTower.DAMAGE, CannonTower.RANGE, CannonTower.W, CannonTower.H);
        this.shotSpeed = 5;
        this.cooldownBase = 120;
        this.cooldown = 0;
    }


    attack(enemy) {
        if (this.cooldown <= 0 && enemy) {
            let cannonBall = new CannonBall(
                this.centerX,
                this.centerY,
                enemy,
                this.damage,
                this.shotSpeed,
                CannonTower.EXPLOSION_RADIUS
            );
            projectiles.push(cannonBall);
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