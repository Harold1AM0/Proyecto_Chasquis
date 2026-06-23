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
    this.assets = levelConfig?.assets || {};

    this.elements = [];

    this.backgroundImage = null;
    this.backgroundScrollSpeed = this.assets.backgroundScrollSpeed ?? 0.2;

    this.roadImage = null;
    this.roadScrollSpeed = this.assets.roadScrollSpeed ?? 2.5;

    // Para pruebas. Cuando tu PNG de camino ya tenga carriles dibujados,
    // pon showDebugLanes: false en levels.js.
    this.showDebugLanes = this.assets.showDebugLanes ?? true;
  }

  create() {
    this.createBackground();
    this.createRoad();

    if (this.showDebugLanes) {
      this.drawLanes();
    }
  }

  createBackground() {
    const W = GAME_CONFIG.width;
    const roadTop = GAME_CONFIG.layout.roadTop;

    const backgroundKey = this.assets.background;

    if (backgroundKey && this.scene.textures.exists(backgroundKey)) {
      const texture = this.scene.textures.get(backgroundKey);
      const source = texture.getSourceImage();

      const imageWidth = source.width;
      const imageHeight = source.height;

      // La imagen ocupa todo el ancho del canvas.
      const scale = W / imageWidth;

      // Altura proporcional. No se deforma.
      const displayHeight = imageHeight * scale;

      this.backgroundImage = this.scene.add
        .tileSprite(
          0,
          0,
          W,
          displayHeight,
          backgroundKey
        )
        .setOrigin(0, 0)
        .setDepth(-25);

      this.backgroundImage.tileScaleX = scale;
      this.backgroundImage.tileScaleY = scale;

      this.elements.push(this.backgroundImage);

      return;
    }

    // Respaldo si no hay imagen de fondo.
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
  }

  createRoad() {
    const W = GAME_CONFIG.width;
    const H = GAME_CONFIG.height;

    const roadKey = this.assets.road;

    if (roadKey && this.scene.textures.exists(roadKey)) {
      const texture = this.scene.textures.get(roadKey);
      const source = texture.getSourceImage();

      const imageWidth = source.width;
      const imageHeight = source.height;

      // El camino ocupa todo el ancho del canvas.
      const scale = W / imageWidth;

      // Mantiene proporción.
      const displayHeight = imageHeight * scale;

      // Pegado abajo.
      const roadY = H - displayHeight;

      this.roadImage = this.scene.add
        .tileSprite(
          0,
          roadY,
          W,
          displayHeight,
          roadKey
        )
        .setOrigin(0, 0)
        .setDepth(-15);

      this.roadImage.tileScaleX = scale;
      this.roadImage.tileScaleY = scale;

      this.elements.push(this.roadImage);

      return;
    }

    console.warn('No se encontró imagen de camino:', roadKey);
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

  update(delta) {
    const factor = delta / 16.67;

    if (this.backgroundImage) {
      this.backgroundImage.tilePositionX +=
        this.backgroundScrollSpeed * factor;
    }

    if (this.roadImage) {
      this.roadImage.tilePositionX +=
        this.roadScrollSpeed * factor;
    }
  }

  destroy() {
    this.elements.forEach((element) => element.destroy());
    this.elements = [];

    this.backgroundImage = null;
    this.roadImage = null;
  }
}