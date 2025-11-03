class Brute extends Enemy {
    static SPEED = 0.8;
    static LIFE = 400;
    static REWARD = 25;
    constructor(x, y) {
        super(x, y, bruteImg, Brute.LIFE, Brute.SPEED, Brute.REWARD, path);
    }
}