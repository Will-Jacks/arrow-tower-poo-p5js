class Scout extends Enemy {
    static SPEED = 2.5;
    static LIFE = 80;
    static REWARD = 10;
    constructor(x, y) {
        super(x, y, goblinImg, Scout.LIFE, Scout.SPEED, Scout.REWARD, path);
    }
}