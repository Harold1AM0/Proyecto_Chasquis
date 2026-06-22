import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    const W = GAME_CONFIG.width;
    const H = GAME_CONFIG.height;

    this.add.rectangle(W / 2, H / 2, W, H, 0x050f08, 1);

    const panel = this.add.graphics();

    panel.fillStyle(0x102510, 0.95);
    panel.fillRoundedRect(W / 2 - 310, H / 2 - 185, 620, 370, 16);

    panel.lineStyle(3, 0xffcc33, 0.95);
    panel.strokeRoundedRect(W / 2 - 310, H / 2 - 185, 620, 370, 16);

    panel.lineStyle(1, 0xffffff, 0.25);
    panel.strokeRoundedRect(W / 2 - 295, H / 2 - 170, 590, 340, 12);

    this.add.text(W / 2, H / 2 - 125, '¡MISIÓN CUMPLIDA!', {
      fontSize: '56px',
      color: '#ffcc33',
      fontStyle: 'bold',
      fontFamily: 'Georgia, serif',
      stroke: '#3a2500',
      strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2 - 62, 'El mensaje llegó a destino', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Georgia, serif',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2 - 20, 'Has completado los 3 tramos del Qhapaq Ñan', {
      fontSize: '18px',
      color: '#d8c28a',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    const scoreBox = this.add.graphics();

    scoreBox.fillStyle(0x061506, 0.9);
    scoreBox.fillRoundedRect(W / 2 - 140, H / 2 + 15, 280, 78, 10);

    scoreBox.lineStyle(2, 0xffcc33, 0.75);
    scoreBox.strokeRoundedRect(W / 2 - 140, H / 2 + 15, 280, 78, 10);

    this.add.text(W / 2, H / 2 + 38, 'PUNTUACIÓN FINAL', {
      fontSize: '14px',
      color: '#ffcc33',
      fontStyle: 'bold',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    const scoreText = this.add.text(W / 2, H / 2 + 68, '0', {
      fontSize: '36px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'Georgia, serif',
      stroke: '#000000',
      strokeThickness: 5
    }).setOrigin(0.5);

    if (this.finalScore > 0) {
      const counter = { value: 0 };

      this.tweens.add({
        targets: counter,
        value: this.finalScore,
        duration: 900,
        ease: 'Cubic.easeOut',
        onUpdate: () => {
          scoreText.setText(Math.floor(counter.value).toString());
        }
      });
    }

    this.add.text(W / 2, H / 2 + 130, '▶ Jugar otra vez  [ESPACIO]', {
      fontSize: '18px',
      color: '#fff5d0',
      fontStyle: 'bold',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2 + 160, '← Volver al menú  [M]', {
      fontSize: '15px',
      color: '#c9b67c',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    const keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
      m: Phaser.Input.Keyboard.KeyCodes.M
    });

    keys.space.once('down', () => this.scene.start('GameScene'));
    keys.enter.once('down', () => this.scene.start('GameScene'));
    keys.m.once('down', () => this.scene.start('MenuScene'));

    this.input.once('pointerdown', () => this.scene.start('GameScene'));
  }
}