import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');

    this.player = null;
    this.obstacle = null;
    this.currentLane = 1;
    this.cursors = null;
    this.gameOver = false;
    this.gameOverText = null;
  }

  create() {
    this.add.text(20, 20, 'Qhapaq Ñan: Prototipo', {
      fontSize: '24px',
      color: '#ffffff'
    });

    this.add.text(20, 55, 'Usa ↑ y ↓ para cambiar de carril', {
      fontSize: '16px',
      color: '#cccccc'
    });

    this.drawLanes();

    this.player = this.add.rectangle(
      GAME_CONFIG.player.x,
      GAME_CONFIG.lanes[this.currentLane],
      GAME_CONFIG.player.width,
      GAME_CONFIG.player.height,
      GAME_CONFIG.player.color
    );

    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.obstacle = this.add.rectangle(
      GAME_CONFIG.width + 100,
      GAME_CONFIG.lanes[Phaser.Math.Between(0, 2)],
      GAME_CONFIG.obstacle.width,
      GAME_CONFIG.obstacle.height,
      GAME_CONFIG.obstacle.color
    );

    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setVelocityX(-GAME_CONFIG.obstacle.speed);

    this.physics.add.overlap(this.player, this.obstacle, () => {
      this.endGame();
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.gameOver) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.moveUp();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.moveDown();
    }

    if (this.obstacle.x < -50) {
      this.resetObstacle();
    }
  }

  drawLanes() {
    GAME_CONFIG.lanes.forEach((laneY) => {
      this.add.line(
        0,
        0,
        0,
        laneY,
        GAME_CONFIG.width,
        laneY,
        0xffffff,
        0.25
      ).setOrigin(0, 0);
    });
  }

  moveUp() {
    if (this.currentLane > 0) {
      this.currentLane--;
      this.movePlayerToLane();
    }
  }

  moveDown() {
    if (this.currentLane < GAME_CONFIG.lanes.length - 1) {
      this.currentLane++;
      this.movePlayerToLane();
    }
  }

  movePlayerToLane() {
    this.tweens.add({
      targets: this.player,
      y: GAME_CONFIG.lanes[this.currentLane],
      duration: 150,
      ease: 'Power2'
    });
  }

  resetObstacle() {
    const randomLane = Phaser.Math.Between(0, 2);

    this.obstacle.x = GAME_CONFIG.width + 100;
    this.obstacle.y = GAME_CONFIG.lanes[randomLane];
    this.obstacle.body.setVelocityX(-GAME_CONFIG.obstacle.speed);
  }

  endGame() {
    this.gameOver = true;
    this.obstacle.body.setVelocityX(0);

    this.gameOverText = this.add.text(
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2,
      'GAME OVER',
      {
        fontSize: '48px',
        color: '#ff3333'
      }
    ).setOrigin(0.5);
  }
}