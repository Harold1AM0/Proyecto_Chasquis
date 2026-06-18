// src/ui/Hud.js

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
  }

  update(score, speedLevel) {
    this.scoreText.setText('Puntos: ' + Math.floor(score));
    this.speedText.setText('Vel: ' + speedLevel);
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
  }
}