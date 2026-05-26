// ObstacleManager.js — Gestiona los conquistadores
// Actualmente la lógica vive en GameScene.js.
// Este archivo está preparado para refactorizar cuando el proyecto crezca.

import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class ObstacleManager {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    this.scene        = scene;
    this.group        = scene.physics.add.group();
    this.dodged       = 0;
    this.currentSpeed = GAME_CONFIG.obstacle.speedBase;

    // Crear dos obstáculos iniciales con desfase
    this.spawn(0);
    this.spawn(400);
  }

  /**
   * Crea un obstáculo en un carril aleatorio.
   * @param {number} extraX - Desfase extra en X (para que no salgan a la vez)
   */
  spawn(extraX = 0) {
    const lane = Phaser.Math.Between(0, GAME_CONFIG.lanes.length - 1);
    const obs  = this.group.create(
      GAME_CONFIG.width + 100 + extraX,
      GAME_CONFIG.lanes[lane],
      'conquistador'
    );
    obs.setVelocityX(-this.currentSpeed);
    obs.body.setSize(
      GAME_CONFIG.obstacle.width  * 0.6,
      GAME_CONFIG.obstacle.height * 0.8
    );
    obs.setDepth(4);
    return obs;
  }

  /**
   * Llama en update() para reciclar los obstáculos fuera de pantalla.
   * @returns {number} puntos bonus ganados (50 por obstáculo esquivado)
   */
  update() {
    let bonusPoints = 0;

    this.group.getChildren().forEach(obs => {
      if (obs.active && obs.x < -100) {
        bonusPoints += this._recycle(obs);
      }
    });

    return bonusPoints;
  }

  _recycle(obs) {
    this.dodged++;

    // Aumentar velocidad cada 2 esquivados
    if (this.dodged % 2 === 0) {
      this.currentSpeed = Math.min(
        this.currentSpeed + GAME_CONFIG.obstacle.speedIncrement,
        GAME_CONFIG.obstacle.speedMax
      );
    }

    const lane = Phaser.Math.Between(0, GAME_CONFIG.lanes.length - 1);
    obs.x = GAME_CONFIG.width + Phaser.Math.Between(80, 200);
    obs.y = GAME_CONFIG.lanes[lane];
    obs.setVelocityX(-this.currentSpeed);

    return 50; // bonus
  }

  stopAll() {
    this.group.getChildren().forEach(obs => obs.setVelocityX(0));
  }

  /** Nivel de velocidad actual (para mostrar en UI) */
  get speedLevel() {
    return Math.floor(
      (this.currentSpeed - GAME_CONFIG.obstacle.speedBase) /
      GAME_CONFIG.obstacle.speedIncrement
    ) + 1;
  }
}