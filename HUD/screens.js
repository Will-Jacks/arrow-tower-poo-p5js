function drawMenu() {
    let btnX = 300;
    let btnY = 550;
    let btnHalfW = 90;
    let btnHalfH = 25
    let isOverBtn1 = mouseX >= btnX - btnHalfW && mouseX <= btnX + btnHalfW && mouseY >= btnY - btnHalfH && mouseY <= btnY + btnHalfH;

    if (isOverBtn1) {
        cursor("pointer");
        if (mouseIsPressed) {
            screens = 'game';
            cursor("default");
            startGame();
        }
    } else {
        cursor("default")
    }

    image(menuBg, 0, 0, 600, 600);
}

function drawGameOver() {
    let btnX = width / 2;
    let btnY = height / 3 + 100;
    let btnWidth = 250;
    let btnHeight = 80;
    let btnRadius = 20;
    // Hitbox do Botão 1 (Tentar Novamente)
    let isOverBtn1 = mouseX >= btnX - 125 && mouseX <= btnX + 125 &&
        mouseY >= btnY - 40 && mouseY <= btnY + 40;
    // Hitbox do Botão 2 (Menu Inicial)
    let isOverBtn2 = mouseX >= btnX - 125 && mouseX <= btnX + 125 &&
        mouseY >= btnY + 60 && mouseY <= btnY + 140;

    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 3);

    // Botão de "Tentar Novamente"
    textSize(24);
    fill(200);
    rectMode(CENTER);
    rect(btnX, btnY, btnWidth, btnHeight, btnRadius);
    fill(0);
    text("Tentar Novamente", btnX, btnY);
    //Botão menu inicial
    fill(200);
    rect(btnX, btnY + 100, btnWidth, btnHeight, btnRadius);
    fill(0);
    text("Menu inicial", btnX, btnY + 100);
    rectMode(CORNER);
    if (isOverBtn1) {
        cursor("pointer");
        if (mouseIsPressed) {
            screens = 'game';
            startGame();
        }
    } else if (isOverBtn2) {
        cursor("pointer");
        if (mouseIsPressed) {
            screens = 'menu';
        }
    } else {
        cursor("default");
    }

}

function drawGame() {
    image(gameBg, 0, 0, 600, 600);
    //background(100, 150, 200);
    // Desenha o caminho
    stroke(200, 200, 0, 100);
    strokeWeight(pathStrokeWeight);
    noFill();
    strokeJoin(ROUND);
    beginShape();
    for (let p of path) {
        vertex(p.x, p.y);
    }
    endShape();
    strokeWeight(1); // Restaura o peso da linha
    strokeJoin(MITER);//Restaura o padrão do stroke

    // Atualiza e desenha torres
    for (let tower of towers) {
        tower.update(enemies); // Passa inimigos para a torre
        tower.draw();
    }

    // Atualiza e desenha inimigos (iterando de trás para frente)
    for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];
        enemy.update();
        enemy.draw();

        // Verifica se o inimigo chegou ao fim OU morreu OU saiu da tela
        if (enemy.reachedEnd || enemy.getLife() <= 0) {
            if (enemy.reachedEnd) {
                manager.loseLife(); // Jogador perde vida
            } else if (enemy.getLife() <= 0) { // Quando inimigo morre = dinheiro
                manager.addMoney(enemy.reward);
            }
            enemies.splice(i, 1); // Remove o inimigo do array
        }
    }

    // Atualiza e desenha projéteis
    for (let i = projectiles.length - 1; i >= 0; i--) {
        let p = projectiles[i];
        p.update();
        p.draw();

        if (p.hasHitTarget() || p.isOffScreen()) {
            projectiles.splice(i, 1);
        }
    }

    // Exibe dinheiro e vidas
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP); // Garante o alinhamento padrão
    text(GameManager.formatMoney(manager.playerMoney), 10, 10);
    // Exibe vidas - ajuste a posição Y se necessário
    text(`❤️: ${manager.playerLives}`, 10, 35);
}