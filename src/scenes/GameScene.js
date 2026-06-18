import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

import Player from '../entities/Player.js';
import ObstacleManager from '../managers/ObstacleManager.js';
import Hud from '../ui/Hud.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.gameOver = false;
    this.score = 0;

    this.createBackground();
    this.drawLanes();
    this.hud = new Hud(this);

    // Jugador
    this.player = new Player(this, 1);

    // Obstáculos
    this.obstacleManager = new ObstacleManager(this);

    // Colisión
    this.physics.add.overlap(
      this.player.sprite,
      this.obstacleManager.group,
      () => this.endGame()
    );

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    if (this.gameOver) return;

    this.handleInput();

    // Puntaje por tiempo
    this.score += delta * 0.01;

    // Actualizar jugador
    this.player.update(delta);

    // Actualizar obstáculos y sumar bonus por esquivar
    const bonusPoints = this.obstacleManager.update();
    this.score += bonusPoints;

    this.hud.update(this.score, this.obstacleManager.speedLevel);
  }

  createBackground() {
    const g = this.add.graphics();
    const laneH = GAME_CONFIG.height / 3;

    [0x3a2200, 0x2d1b00, 0x3a2200].forEach((color, index) => {
      g.fillStyle(color, 1);
      g.fillRect(0, index * laneH, GAME_CONFIG.width, laneH);
    });
  }

  drawLanes() {
    const colors = [0xffcc00, 0xcc8800, 0xffcc00];

    GAME_CONFIG.lanes.forEach((y, index) => {
      this.add
        .line(0, 0, 0, y, GAME_CONFIG.width, y, colors[index], 0.2)
        .setOrigin(0, 0)
        .setDepth(1);
    });
  }

  handleInput() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.player.moveUp();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.player.moveDown();
    }
  }

  endGame() {
    if (this.gameOver) return;

    this.gameOver = true;
    this.player.die();
    this.obstacleManager.stopAll();

    const flash = this.add
      .rectangle(
        GAME_CONFIG.width / 2,
        GAME_CONFIG.height / 2,
        GAME_CONFIG.width,
        GAME_CONFIG.height,
        0xff0000,
        0
      )
      .setDepth(20);

    this.tweens.add({
      targets: flash,
      alpha: 0.4,
      duration: 180,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.scene.start('GameOverScene', {
          score: Math.floor(this.score)
        });
      }
    });
  }
}