class Goblin extends Enemy {
    static SPEED = 1.5;
    static LIFE = 100;
    static REWARD = 5;
    constructor(x, y) {
        super(x, y, goblinImg, Goblin.LIFE, Goblin.SPEED, Goblin.REWARD, path);
    }
}