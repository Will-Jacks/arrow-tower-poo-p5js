class Boss extends Enemy {
    static SPEED = 0.5;
    static LIFE = 4000;
    static REWARD = 200;
    constructor(x, y) {
        super(x, y, bossImg, Boss.LIFE, Boss.SPEED, Boss.REWARD, path);
    }
}