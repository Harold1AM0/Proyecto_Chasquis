// src/ui/Hud.js
import Phaser from 'phaser';

export default class Hud {
  constructor(scene) {
    this.scene = scene;

    this.scoreText = scene.add
      .text(20, 16, 'Puntos: 0', {
        fontSize: '22px',
        color: '#ffcc00',
        fontStyle: 'bold',
        stroke: '#3a2200',
        strokeThickness: 4
      })
      .setDepth(10);

    this.speedText = scene.add
      .text(20, 44, 'Vel: 1', {
        fontSize: '15px',
        color: '#cc8800'
      })
      .setDepth(10);

    this.voiceText = scene.add
      .text(20, 66, 'Voz: presiona V', {
        fontSize: '15px',
        color: '#ffffff'
      })
      .setDepth(10);

    // NUEVO: texto del nivel
    this.levelText = scene.add
      .text(20, 92, 'Nivel 1/3', {
        fontSize: '15px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setDepth(10);

    // NUEVO: texto de progreso
    this.progressText = scene.add
      .text(20, 114, 'Progreso: 0%', {
        fontSize: '14px',
        color: '#ffdd88'
      })
      .setDepth(10);

    // NUEVO: barra de progreso
    this.progressBarX = 20;
    this.progressBarY = 142;
    this.progressBarWidth = 260;
    this.progressBarHeight = 14;

    this.progressBarBg = scene.add
      .rectangle(
        this.progressBarX,
        this.progressBarY,
        this.progressBarWidth,
        this.progressBarHeight,
        0x2a1600,
        0.85
      )
      .setOrigin(0, 0.5)
      .setDepth(10);

    this.progressBarFill = scene.add
      .rectangle(
        this.progressBarX,
        this.progressBarY,
        0,
        this.progressBarHeight,
        0xffcc00,
        1
      )
      .setOrigin(0, 0.5)
      .setDepth(11);

    this.progressBarBorder = scene.add
      .graphics()
      .setDepth(12);

    this.progressBarBorder.lineStyle(2, 0xffdd88, 0.9);
    this.progressBarBorder.strokeRect(
      this.progressBarX,
      this.progressBarY - this.progressBarHeight / 2,
      this.progressBarWidth,
      this.progressBarHeight
    );
  }

  update(score, speedLevel, levelData = null) {
    this.scoreText.setText('Puntos: ' + Math.floor(score));
    this.speedText.setText('Vel: ' + speedLevel);

    if (levelData) {
      this.levelText.setText(
        `${levelData.levelName} (${levelData.levelNumber}/${levelData.totalLevels})`
      );

      this.progressText.setText(
        `Progreso: ${levelData.progressPercent}%`
      );

      const safeProgress = Phaser.Math.Clamp(levelData.progress, 0, 1);
      this.progressBarFill.width = this.progressBarWidth * safeProgress;

      if (levelData.theme) {
        this.levelText.setColor(levelData.theme.hudTextColor);
        this.progressText.setColor(levelData.theme.hudTextColor);
        this.progressBarFill.fillColor = levelData.theme.hudBarColor;
      }
    }
  }

  updateVoiceStatus(status) {
    const labels = {
      unsupported: 'Voz: no soportado',
      listening: 'Voz: escuchando',
      stopped: 'Voz: apagado',
      error: 'Voz: error'
    };

    this.voiceText.setText(labels[status] || 'Voz: presiona V');
  }

  destroy() {
    this.scoreText.destroy();
    this.speedText.destroy();
    this.voiceText.destroy();

    this.levelText.destroy();
    this.progressText.destroy();
    this.progressBarBg.destroy();
    this.progressBarFill.destroy();
    this.progressBarBorder.destroy();
  }
}