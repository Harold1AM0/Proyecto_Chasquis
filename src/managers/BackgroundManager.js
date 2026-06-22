import { GAME_CONFIG } from '../config.js';

const DEFAULT_THEME = {
  skyColor: 0x79cfff,
  horizonColor: 0x8fcf72,
  roadColor: 0x8b5a2b,
  roadDarkColor: 0x6b3f1d,
  laneColor: 0xffdd88
};

export default class BackgroundManager {
  constructor(scene, levelConfig = null) {
    this.scene = scene;
    this.levelConfig = levelConfig;
    this.theme = levelConfig?.theme || DEFAULT_THEME;
    this.elements = [];
  }

  create() {
    this.createBackground();
    this.createRoad();
    this.drawLanes();
  }

  createBackground() {
    const W = GAME_CONFIG.width;
    const roadTop = GAME_CONFIG.layout.roadTop;

    // Cielo / fondo superior
    const sky = this.scene.add
      .rectangle(
        W / 2,
        roadTop / 2,
        W,
        roadTop,
        this.theme.skyColor,
        1
      )
      .setDepth(-20);

    this.elements.push(sky);

    // Franja de horizonte provisional
    const horizon = this.scene.add
      .rectangle(
        W / 2,
        roadTop - 22,
        W,
        44,
        this.theme.horizonColor,
        1
      )
      .setDepth(-18);

    this.elements.push(horizon);

    // Montañas / silueta temporal
    const mountains = this.scene.add.graphics();
    mountains.fillStyle(this.theme.roadDarkColor, 0.35);

    mountains.beginPath();
    mountains.moveTo(0, roadTop - 20);
    mountains.lineTo(120, roadTop - 95);
    mountains.lineTo(250, roadTop - 35);
    mountains.lineTo(390, roadTop - 110);
    mountains.lineTo(560, roadTop - 40);
    mountains.lineTo(720, roadTop - 100);
    mountains.lineTo(W, roadTop - 25);
    mountains.lineTo(W, roadTop);
    mountains.lineTo(0, roadTop);
    mountains.closePath();
    mountains.fillPath();

    mountains.setDepth(-17);
    this.elements.push(mountains);
  }

  createRoad() {
    const W = GAME_CONFIG.width;
    const H = GAME_CONFIG.height;
    const roadTop = GAME_CONFIG.layout.roadTop;
    const roadHeight = H - roadTop;

    // Camino principal
    const road = this.scene.add
      .rectangle(
        W / 2,
        roadTop + roadHeight / 2,
        W,
        roadHeight,
        this.theme.roadColor,
        1
      )
      .setDepth(-15);

    this.elements.push(road);

    // Sombra inferior del camino
    const roadShadow = this.scene.add
      .rectangle(
        W / 2,
        H - 38,
        W,
        76,
        this.theme.roadDarkColor,
        0.45
      )
      .setDepth(-14);

    this.elements.push(roadShadow);
  }

  drawLanes() {
    const W = GAME_CONFIG.width;

    GAME_CONFIG.lanes.forEach((y) => {
      const line = this.scene.add
        .line(
          0,
          0,
          0,
          y,
          W,
          y,
          this.theme.laneColor,
          0.25
        )
        .setOrigin(0, 0)
        .setDepth(-5);

      this.elements.push(line);
    });
  }

  destroy() {
    this.elements.forEach((element) => element.destroy());
    this.elements = [];
  }
}