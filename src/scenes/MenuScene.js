import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const W = GAME_CONFIG.width;
    const H = GAME_CONFIG.height;

    // Fondo con franjas de carril
    const g = this.add.graphics();
    const laneH = H / 3;
    [0x3a2200, 0x2d1b00, 0x3a2200].forEach((c, i) => {
      g.fillStyle(c, 1);
      g.fillRect(0, i * laneH, W, laneH);
    });
    // Líneas tenues
    g.lineStyle(1, 0xffcc00, 0.12);
    GAME_CONFIG.lanes.forEach(y => {
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.strokePath();
    });

    // Título
    this.add.text(W / 2, 110, 'QHAPAQ ÑAN', {
      fontSize: '58px', color: '#ffcc00', fontStyle: 'bold',
      stroke: '#7a4a1e', strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(W / 2, 175, 'El Camino del Chasqui', {
      fontSize: '22px', color: '#cc8800', fontStyle: 'italic'
    }).setOrigin(0.5);

    // Instrucciones
    this.add.text(W / 2, 270, '↑ ↓  para cambiar de carril', {
      fontSize: '20px', color: '#ffeeaa'
    }).setOrigin(0.5);

    this.add.text(W / 2, 305, 'Esquiva a los conquistadores y no te atrapen', {
      fontSize: '17px', color: '#ccaa66'
    }).setOrigin(0.5);

    // Texto parpadeante de inicio
    const startText = this.add.text(W / 2, 400,
      '— Presiona ESPACIO o ENTER para correr —', {
      fontSize: '20px', color: '#ff9900', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: startText, alpha: 0.15, duration: 700,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    // Controles
    const keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER
    });
    const start = () => this.scene.start('GameScene');
    keys.space.once('down', start);
    keys.enter.once('down', start);
    this.input.once('pointerdown', start);
  }
}