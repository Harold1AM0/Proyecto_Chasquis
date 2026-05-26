// Player.js — Clase del Chasqui
// Actualmente la lógica del jugador vive en GameScene.js.
// Este archivo está preparado para refactorizar cuando el proyecto crezca.

import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class Player {
  /**
   * @param {Phaser.Scene} scene - La escena de Phaser que lo contiene
   * @param {number} laneIndex   - Carril inicial (0, 1 o 2)
   */
  constructor(scene, laneIndex = 1) {
    this.scene       = scene;
    this.currentLane = laneIndex;

    this.sprite = scene.physics.add.image(
      GAME_CONFIG.player.x,
      GAME_CONFIG.lanes[laneIndex],
      'chasqui'
    );
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setSize(
      GAME_CONFIG.player.width  * 0.6,
      GAME_CONFIG.player.height * 0.8
    );
    this.sprite.setDepth(5);

    // Animación de carrera (bobbing)
    this._runTimer = 0;
    this._runFrame = 0;
  }

  moveUp() {
    if (this.currentLane > 0) {
      this.currentLane--;
      this._tweenToLane();
    }
  }

  moveDown() {
    if (this.currentLane < GAME_CONFIG.lanes.length - 1) {
      this.currentLane++;
      this._tweenToLane();
    }
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
    this._runTimer += delta;
    if (this._runTimer > 120) {
      this._runTimer = 0;
      this._runFrame = 1 - this._runFrame;
      this.sprite.y += this._runFrame === 0 ? 2 : -2;
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}