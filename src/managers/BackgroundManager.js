
import { GAME_CONFIG } from '../config.js';

export default class BackgroundManager {
  constructor(scene) {
    this.scene = scene;
    this.elements = [];
  }

  create() {
    this.createBackground();
    this.drawLanes();
  }

  createBackground() {
    const graphics = this.scene.add.graphics();
    const laneHeight = GAME_CONFIG.height / 3;

    [0x3a2200, 0x2d1b00, 0x3a2200].forEach((color, index) => {
      graphics.fillStyle(color, 1);
      graphics.fillRect(
        0,
        index * laneHeight,
        GAME_CONFIG.width,
        laneHeight
      );
    });

    this.elements.push(graphics);
  }

  drawLanes() {
    const colors = [0xffcc00, 0xcc8800, 0xffcc00];

    GAME_CONFIG.lanes.forEach((y, index) => {
      const line = this.scene.add
        .line(0, 0, 0, y, GAME_CONFIG.width, y, colors[index], 0.2)
        .setOrigin(0, 0)
        .setDepth(1);

      this.elements.push(line);
    });
  }

  destroy() {
    this.elements.forEach((element) => element.destroy());
    this.elements = [];
  }
}