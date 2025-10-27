function drawMenu() {
    let btnX = width / 2;
    let btnY = height / 2 + 50;
    let btnWidth = 200;
    let btnHeight = 80;
    let btnRadius = 20;

    background(100, 150, 200); // Azul
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Meu tower defense", width / 2, height / 3);

    textSize(32);
    fill(0, 200, 0); // Verde
    rectMode(CENTER);
    rect(btnX, btnY, btnWidth, btnHeight, btnRadius);
    fill(255);
    text("Iniciar jogo", btnX, btnY);
    rectMode(CORNER);
    if (mouseX >= btnX - 100 && mouseX <= btnX + 100 && mouseY >= btnY - 40 && mouseY <= btnY + 40) {
        cursor("pointer");
        if (mouseIsPressed) {
            screens = 'game';
            startGame();
        }
    } else {
        cursor("default")
    }
}

function drawGameOver() {
    let btnX = width / 2;
    let btnY = height / 2 + 100;
    let btnWidth = 250;
    let btnHeight = 80;
    let btnRadius = 20;

    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);

    // Botão de "Tentar Novamente"
    textSize(24);
    fill(200);
    rectMode(CENTER);
    rect(btnX, btnY, btnWidth, btnHeight, btnRadius);
    fill(0);
    text("Tentar Novamente", btnX, btnY);
    if (mouseX >= btnX - 125 && mouseX <= btnX + 125 && mouseY >= btnY - 40 && mouseY <= btnY + 40) {
        cursor("pointer");
        if (mouseIsPressed) {
            screens = 'game';
            startGame();
        }
    }
    fill(200);
    rect(btnX, btnY + 100, btnWidth, btnHeight, btnRadius);
    fill(0);
    text("Menu inicial", btnX, btnY + 100);
    rectMode(CORNER);
    if (mouseX >= btnX - 125 && mouseX <= btnX + 125 && mouseY >= btnY + 60 && mouseY <= btnY + 140) {
        cursor("pointer");
        if (mouseIsPressed) {
            screens = 'menu';
        }
    } else {
        cursor("default")
    }
}

function drawGame() {
    // Desenha o caminho (opcional, para depuração)
    stroke(200, 200, 0, 100);
    strokeWeight(15);
    noFill();
    beginShape();
    for (let p of path) {
        vertex(p.x, p.y);
    }
    endShape();
    strokeWeight(1); // Restaura o peso da linha

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
    text(`Vidas: ${manager.playerLives}`, 10, 35);
}