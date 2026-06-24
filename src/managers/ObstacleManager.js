// ObstacleManager.js — Gestiona los obstáculos por nivel

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

    this.obstacles = levelConfig?.obstacles || [
      {
        id: 'default_conquistador',
        texture: GAME_CONFIG.obstacle.texture,
        points: 50,
        bodyWidth: 0.6,
        bodyHeight: 0.8,
        yOffset: 0
      }
    ];

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

    this.spawn(0);
    this.spawn(Math.round(420 * this.spawnMultiplier));
  }

  getRandomObstacleConfig() {
    return Phaser.Utils.Array.GetRandom(this.obstacles);
  }

  spawn(extraX = 0) {
    const lane = Phaser.Math.Between(0, GAME_CONFIG.lanes.length - 1);
    const obstacleConfig = this.getRandomObstacleConfig();

    const obs = this.group.create(
      GAME_CONFIG.width + 100 + extraX,
      GAME_CONFIG.lanes[lane] + (obstacleConfig.yOffset ?? 0),
      obstacleConfig.texture
    );

    this.applyObstacleConfig(obs, obstacleConfig);

    return obs;
  }

  applyObstacleConfig(obs, obstacleConfig) {
    obs.setTexture(obstacleConfig.texture);
    obs.setData('obstacleConfig', obstacleConfig);

    obs.setVelocityX(-this.currentSpeed);
    obs.setDepth(obstacleConfig.depth ?? 4);

    // Si quieres que los obstáculos del nivel tengan tint,
    // puedes agregar tint en levels.js. Si no, se usa normal.
    if (obstacleConfig.tint) {
      obs.setTint(obstacleConfig.tint);
    } else {
      obs.clearTint();
    }

    const texture = this.scene.textures.get(obstacleConfig.texture);
    const source = texture.getSourceImage();

    const textureWidth = source.width;
    const textureHeight = source.height;

    const bodyWidth = textureWidth * (obstacleConfig.bodyWidth ?? 0.65);
    const bodyHeight = textureHeight * (obstacleConfig.bodyHeight ?? 0.75);

    obs.body.setSize(bodyWidth, bodyHeight);

    obs.body.setOffset(
      (textureWidth - bodyWidth) / 2,
      (textureHeight - bodyHeight) / 2
    );
  }

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

    if (this.dodged % 2 === 0) {
      this.currentSpeed = Math.min(
        this.currentSpeed + this.speedIncrement,
        this.maxSpeed
      );
    }

    const lane = Phaser.Math.Between(0, GAME_CONFIG.lanes.length - 1);
    const obstacleConfig = this.getRandomObstacleConfig();

    const minGap = Math.round(90 * this.spawnMultiplier);
    const maxGap = Math.round(240 * this.spawnMultiplier);

    obs.x = GAME_CONFIG.width + Phaser.Math.Between(minGap, maxGap);
    obs.y = GAME_CONFIG.lanes[lane] + (obstacleConfig.yOffset ?? 0);

    this.applyObstacleConfig(obs, obstacleConfig);

    return obstacleConfig.points ?? 50;
  }

  stopAll() {
    this.group.getChildren().forEach((obs) => {
      obs.setVelocityX(0);
    });
  }

  get speedLevel() {
    return (
      Math.floor(
        (this.currentSpeed - this.baseSpeed) / this.speedIncrement
      ) + 1
    );
  }
}