import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.currentLane   = 1;
    this.gameOver      = false;
    this.score         = 0;
    this.dodged        = 0;
    this._currentSpeed = GAME_CONFIG.obstacle.speedBase;
    this._runTimer     = 0;
    this._runFrame     = 0;

    // Fondo
    const g = this.add.graphics();
    const laneH = GAME_CONFIG.height / 3;
    [0x3a2200, 0x2d1b00, 0x3a2200].forEach((c, i) => {
      g.fillStyle(c, 1);
      g.fillRect(0, i * laneH, GAME_CONFIG.width, laneH);
    });

    this.drawLanes();

    // UI
    this.scoreText = this.add.text(20, 16, 'Puntos: 0', {
      fontSize: '22px', color: '#ffcc00', fontStyle: 'bold',
      stroke: '#3a2200', strokeThickness: 4
    }).setDepth(10);

    this.speedText = this.add.text(20, 44, 'Vel: 1', {
      fontSize: '15px', color: '#cc8800'
    }).setDepth(10);

    // Jugador
    this.player = this.physics.add.image(
      GAME_CONFIG.player.x,
      GAME_CONFIG.lanes[this.currentLane],
      'chasqui'
    );
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(
      GAME_CONFIG.player.width  * 0.6,
      GAME_CONFIG.player.height * 0.8
    );
    this.player.setDepth(5);

    // Obstáculos
    this.obstacles = this.physics.add.group();
    this._spawnObstacle(0);
    this._spawnObstacle(450);

    // Colisión
    this.physics.add.overlap(this.player, this.obstacles, () => this.endGame());

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    if (this.gameOver) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up))   this.moveUp();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.moveDown();

    this.score += delta * 0.01;
    this.scoreText.setText('Puntos: ' + Math.floor(this.score));

    // Bobbing
    this._runTimer += delta;
    if (this._runTimer > 120) {
      this._runTimer = 0;
      this._runFrame = 1 - this._runFrame;
      this.player.y += this._runFrame === 0 ? 2 : -2;
    }

    // Reciclar obstáculos
    this.obstacles.getChildren().forEach(obs => {
      if (obs.active && obs.x < -100) this._recycleObstacle(obs);
    });
  }

  drawLanes() {
    const colors = [0xffcc00, 0xcc8800, 0xffcc00];
    GAME_CONFIG.lanes.forEach((y, i) => {
      this.add.line(0, 0, 0, y, GAME_CONFIG.width, y, colors[i], 0.2)
        .setOrigin(0, 0).setDepth(1);
    });
  }

  moveUp() {
    if (this.currentLane > 0) { this.currentLane--; this._tweenLane(); }
  }
  moveDown() {
    if (this.currentLane < GAME_CONFIG.lanes.length - 1) { this.currentLane++; this._tweenLane(); }
  }
  _tweenLane() {
    this.tweens.add({
      targets: this.player,
      y: GAME_CONFIG.lanes[this.currentLane],
      duration: 150, ease: 'Power2'
    });
  }

  _spawnObstacle(extraX = 0) {
    const lane = Phaser.Math.Between(0, GAME_CONFIG.lanes.length - 1);
    const obs  = this.obstacles.create(
      GAME_CONFIG.width + 100 + extraX,
      GAME_CONFIG.lanes[lane],
      'conquistador'
    );
    obs.setVelocityX(-this._currentSpeed);
    obs.body.setSize(
      GAME_CONFIG.obstacle.width  * 0.6,
      GAME_CONFIG.obstacle.height * 0.8
    );
    obs.setDepth(4);
  }

  _recycleObstacle(obs) {
    this.dodged++;
    this.score += 50;
    if (this.dodged % 2 === 0) {
      this._currentSpeed = Math.min(
        this._currentSpeed + GAME_CONFIG.obstacle.speedIncrement,
        GAME_CONFIG.obstacle.speedMax
      );
      const nivel = Math.floor(
        (this._currentSpeed - GAME_CONFIG.obstacle.speedBase) /
        GAME_CONFIG.obstacle.speedIncrement
      ) + 1;
      this.speedText.setText('Vel: ' + nivel);
    }
    const lane = Phaser.Math.Between(0, GAME_CONFIG.lanes.length - 1);
    obs.x = GAME_CONFIG.width + Phaser.Math.Between(80, 200);
    obs.y = GAME_CONFIG.lanes[lane];
    obs.setVelocityX(-this._currentSpeed);
  }

  endGame() {
    if (this.gameOver) return;
    this.gameOver = true;
    this.obstacles.getChildren().forEach(obs => obs.setVelocityX(0));

    const flash = this.add.rectangle(
      GAME_CONFIG.width / 2, GAME_CONFIG.height / 2,
      GAME_CONFIG.width, GAME_CONFIG.height, 0xff0000, 0
    ).setDepth(20);

    this.tweens.add({
      targets: flash, alpha: 0.4, duration: 180,
      yoyo: true, repeat: 2,
      onComplete: () => {
        this.scene.start('GameOverScene', { score: Math.floor(this.score) });
      }
    });
  }
}