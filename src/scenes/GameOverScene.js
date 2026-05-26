import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    const W = GAME_CONFIG.width;
    const H = GAME_CONFIG.height;

    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.75);

    this.add.text(W / 2, H / 2 - 120, '¡ATRAPADO!', {
      fontSize: '58px', color: '#ff3333', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2 - 58, 'El conquistador te alcanzó', {
      fontSize: '22px', color: '#ffcc00',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2, 'Puntos: ' + this.finalScore, {
      fontSize: '36px', color: '#ffffff', fontStyle: 'bold',
      stroke: '#3a2200', strokeThickness: 5
    }).setOrigin(0.5);

    const retry = this.add.text(W / 2, H / 2 + 90,
      '— ESPACIO para correr de nuevo —', {
      fontSize: '21px', color: '#ff9900', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: retry, alpha: 0.15, duration: 650,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    this.add.text(W / 2, H / 2 + 130, 'M — volver al menú', {
      fontSize: '17px', color: '#ccaa66'
    }).setOrigin(0.5);

    const keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
      m:     Phaser.Input.Keyboard.KeyCodes.M
    });
    keys.space.once('down', () => this.scene.start('GameScene'));
    keys.enter.once('down', () => this.scene.start('GameScene'));
    keys.m.once('down',     () => this.scene.start('MenuScene'));
    this.input.once('pointerdown', () => this.scene.start('GameScene'));
  }
}