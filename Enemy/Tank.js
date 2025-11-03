class Tank extends Enemy {
    static SPEED = 0.6;
    static LIFE = 1000;
    static REWARD = 50;
    constructor(x, y) {
        super(x, y, tankImg, Tank.LIFE, Tank.SPEED, Tank.REWARD, path);
    }
}