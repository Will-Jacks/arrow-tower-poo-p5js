const xArrowT = 125, y = 425, w = 150, h = 150;
const xCannonT = 325;
function drawTowerCards() {
    image(cannonTowerCard, xCannonT, y, w, h);
    image(arrowTowerCard, xArrowT, y, w, h);

    //Estilização pra carta selecionada
    noFill();
    strokeWeight(3);
    if (currentSelectedTower === ArrowTower) {
        stroke(255, 200, 0); // Amarelo
        rect(xArrowT - 2, y - 2, w + 4, h + 4, 5); // Borda ao redor do card selecionado
    } else if (currentSelectedTower === CannonTower) {
        stroke(255, 200, 0); // Amarelo
        rect(xCannonT - 2, y - 2, w + 4, h + 4, 5); // Borda ao redor do card selecionado
    }
    strokeWeight(1); // Restaura
    noStroke();
}

function checkTowerCardHover() {
    let mouseOverArrow = mouseX >= xArrowT && mouseX <= xArrowT + w && mouseY >= y && mouseY <= y + h;
    let mouseOverCannon = mouseX >= xCannonT && mouseX <= xCannonT + w && mouseY >= y && mouseY <= y + h;
    //Card 1
    if (mouseOverArrow || mouseOverCannon) {
        cursor("pointer");
    } else {
        cursor("default");
    }
}

function checkTowerCardClick() {
    let mouseOverArrow = mouseX >= xArrowT && mouseX <= xArrowT + w && mouseY >= y && mouseY <= y + h;
    let mouseOverCannon = mouseX >= xCannonT && mouseX <= xCannonT + w && mouseY >= y && mouseY <= y + h;
    if (mouseOverArrow) {
        return { type: ArrowTower, cost: ArrowTower.COST }
    } else if (mouseOverCannon) {
        return { type: CannonTower, cost: CannonTower.COST }
    }
    return null;
}