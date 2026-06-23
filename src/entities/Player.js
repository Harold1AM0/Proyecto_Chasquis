import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class Player {
  constructor(scene, laneIndex = 1) {
    this.scene = scene;
    this.currentLane = laneIndex;
    this.isAlive = true;

    this.sprite = scene.physics.add.image(
      GAME_CONFIG.player.x,
      GAME_CONFIG.lanes[laneIndex],
      'chasqui'
    );

    this.sprite.setCollideWorldBounds(true);

    this.sprite.body.setSize(
      GAME_CONFIG.player.width * 0.6,
      GAME_CONFIG.player.height * 0.8
    );

    this.sprite.setDepth(5);

    this._runTimer = 0;
    this._runFrame = 0;
  }

  moveUp() {
    if (!this.isAlive) return false;

    if (this.currentLane > 0) {
      this.currentLane--;
      this._tweenToLane();
      return true;
    }

    return false;
  }

  moveDown() {
    if (!this.isAlive) return false;

    if (this.currentLane < GAME_CONFIG.lanes.length - 1) {
      this.currentLane++;
      this._tweenToLane();
      return true;
    }

    return false;
  }

  _tweenToLane() {
    this.scene.tweens.add({
      targets: this.sprite,
      y: GAME_CONFIG.lanes[this.currentLane],
      duration: 150,
      ease: 'Power2'
    });
  }

  update(delta) {
    if (!this.isAlive) return;

    this._runTimer += delta;

    if (this._runTimer > 120) {
      this._runTimer = 0;
      this._runFrame = 1 - this._runFrame;
      this.sprite.y += this._runFrame === 0 ? 2 : -2;
    }
  }

  die() {
    this.isAlive = false;
    this.sprite.setTint(0xff0000);
  }

  destroy() {
    this.sprite.destroy();
  }
}