import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.puntuacion = data.score || 0;
  }

  preload() {
    this.load.image('fondoMuerte', '../../assets/images/backgrounds/muerte.png');
  }

  create() {
    const { width: W, height: H } = GAME_CONFIG;

    this.add.image(W / 2, H / 2, 'fondoMuerte').setOrigin(0.5).setDisplaySize(W, H);

    this.drawUI(W, H);

    const keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
      m: Phaser.Input.Keyboard.KeyCodes.M
    });

    const restart = () => this.scene.start('GameScene');
    const goMenu = () => this.scene.start('MenuScene');

    keys.space.once('down', restart);
    keys.enter.once('down', restart);
    keys.m.once('down', goMenu);
    this.input.once('pointerdown', restart);
  }

  drawUI(W, H) {
    const g = this.add.graphics();
    const cx = W / 2;
    const cy = H / 2;

    g.fillStyle(0x0f0602, 0.85).fillRoundedRect(cx - 280, cy - 160, 560, 320, 14);
    g.lineStyle(4, 0xaa2200, 0.8).strokeRoundedRect(cx - 280, cy - 160, 560, 320, 14);

    const titleStyle = { fontFamily: 'Impact, sans-serif', color: '#dd2200', align: 'center' };
    const textStyle = { fontFamily: 'Trebuchet MS, sans-serif', color: '#ffccaa', align: 'center' };

    this.add.text(cx, cy - 90, '¡ATRAPADO!', { ...titleStyle, fontSize: '65px', stroke: '#220000', strokeThickness: 8 }).setOrigin(0.5);
    this.add.text(cx, cy - 20, 'El mensaje no llegó a su destino...', { ...textStyle, fontSize: '22px', fontStyle: 'italic', color: '#cc6633' }).setOrigin(0.5);

    this.add.text(cx, cy + 30, `PUNTUACIÓN: ${this.puntuacion}`, { ...titleStyle, fontSize: '35px', color: '#ffffff', stroke: '#3a0a00', strokeThickness: 6 }).setOrigin(0.5);

    const btnY = cy + 90;
    g.fillStyle(0x882200, 0.9).fillRoundedRect(cx - 160, btnY, 320, 50, 15);
    g.lineStyle(2, 0xff6633, 1).strokeRoundedRect(cx - 160, btnY, 320, 50, 15);
    
    const btnText = this.add.text(cx, btnY + 25, 'REINTENTAR [ESPACIO]', { ...titleStyle, fontSize: '24px', color: '#fff5e0', letterSpacing: 2 }).setOrigin(0.5);
    
    this.add.text(cx, cy + 175, '← Volver al menú [M]', { ...textStyle, fontSize: '18px', color: '#ccaa66' }).setOrigin(0.5);

    this.tweens.add({ targets: [g, btnText], alpha: 0.8, duration: 800, yoyo: true, repeat: -1 });
  }
}