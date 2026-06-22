// ObstacleManager.js — Gestiona los obstáculos

import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class ObstacleManager {
  /**
   * @param {Phaser.Scene} scene
   * @param {Object} levelConfig
   */
  constructor(scene, levelConfig = null) {
    this.scene = scene;
    this.levelConfig = levelConfig;

    this.difficulty = levelConfig?.difficulty || {
      speedMultiplier: 1,
      spawnMultiplier: 1
    };

    this.theme = levelConfig?.theme || {
      obstacleTint: 0xffffff
    };

    this.group = scene.physics.add.group();
    this.dodged = 0;

    this.baseSpeed =
      GAME_CONFIG.obstacle.speedBase * this.difficulty.speedMultiplier;

    this.maxSpeed =
      GAME_CONFIG.obstacle.speedMax * this.difficulty.speedMultiplier;

    this.speedIncrement =
      GAME_CONFIG.obstacle.speedIncrement * this.difficulty.speedMultiplier;

    this.currentSpeed = this.baseSpeed;

    this.spawnMultiplier = this.difficulty.spawnMultiplier;

    // Crear dos obstáculos iniciales con desfase
    this.spawn(0);
    this.spawn(Math.round(400 * this.spawnMultiplier));
  }

  /**
   * Crea un obstáculo en un carril aleatorio.
   * @param {number} extraX - Desfase extra en X.
   */
  spawn(extraX = 0) {
    const lane = Phaser.Math.Between(0, GAME_CONFIG.lanes.length - 1);

    const obs = this.group.create(
      GAME_CONFIG.width + 100 + extraX,
      GAME_CONFIG.lanes[lane],
      GAME_CONFIG.obstacle.texture
    );

    obs.setVelocityX(-this.currentSpeed);

    obs.body.setSize(
      GAME_CONFIG.obstacle.width * 0.6,
      GAME_CONFIG.obstacle.height * 0.8
    );

    obs.setDepth(4);
    obs.setTint(this.theme.obstacleTint);

    return obs;
  }

  /**
   * Llama en update() para reciclar los obstáculos fuera de pantalla.
   * @returns {number} puntos bonus ganados.
   */
  update() {
    let bonusPoints = 0;

    this.group.getChildren().forEach((obs) => {
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
        this.currentSpeed + this.speedIncrement,
        this.maxSpeed
      );
    }

    const lane = Phaser.Math.Between(0, GAME_CONFIG.lanes.length - 1);

    const minGap = Math.round(80 * this.spawnMultiplier);
    const maxGap = Math.round(220 * this.spawnMultiplier);

    obs.x = GAME_CONFIG.width + Phaser.Math.Between(minGap, maxGap);
    obs.y = GAME_CONFIG.lanes[lane];

    obs.setVelocityX(-this.currentSpeed);
    obs.setTint(this.theme.obstacleTint);

    return 50;
  }

  stopAll() {
    this.group.getChildren().forEach((obs) => obs.setVelocityX(0));
  }

  /** Nivel de velocidad actual para mostrar en UI */
  get speedLevel() {
    return (
      Math.floor(
        (this.currentSpeed - this.baseSpeed) / this.speedIncrement
      ) + 1
    );
  }
}