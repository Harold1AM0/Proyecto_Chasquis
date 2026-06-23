import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('fondoMenu', '../../assets/images/backgrounds/menu.png');
  }

  create() {
    const { width: W, height: H } = GAME_CONFIG;

    this.add.image(W / 2, H / 2, 'fondoMenu').setOrigin(0.5).setDisplaySize(W, H);

    this.drawUI(W, H);
    this.initParticles(W, H);

    const startPath = () => this.scene.start('GameScene');
    this.input.keyboard.on('keydown-SPACE', startPath);
    this.input.keyboard.on('keydown-ENTER', startPath);
    this.input.once('pointerdown', startPath);
  }

  drawUI(W, H) {
    const g = this.add.graphics();
    const cx = W / 2;
    
    g.fillStyle(0x0a2210, 0.9).fillRoundedRect(cx - 280, 50, 560, 240, 12);
    g.lineStyle(2, 0xffdd44, 0.8).strokeRoundedRect(cx - 280, 50, 560, 240, 12);

    const titleStyle = { fontFamily: 'Impact, sans-serif', color: '#ffdd44', align: 'center' };
    const textStyle = { fontFamily: 'Trebuchet MS, sans-serif', color: '#e0ffcc', align: 'center' };
    
    this.add.text(cx, 100, 'QHAPAQ ÑAN', { ...titleStyle, fontSize: '65px', stroke: '#113311', strokeThickness: 8 }).setOrigin(0.5);
    this.add.text(cx, 165, 'El Camino del Chasqui', { ...textStyle, fontSize: '26px', color: '#aaff88', fontStyle: 'italic' }).setOrigin(0.5);
    
    this.add.text(cx, 230, '▲ ▼ Cambiar carril\n🏃 Esquivar conquistadores\n📜 Llevar el mensaje', { ...textStyle, fontSize: '20px', lineSpacing: 8 }).setOrigin(0.5);

    const btnY = 380;
    g.fillStyle(0x115522, 1).fillRoundedRect(cx - 160, btnY, 320, 55, 15);
    g.lineStyle(2, 0xffdd44, 1).strokeRoundedRect(cx - 160, btnY, 320, 55, 15);
    
    const btnText = this.add.text(cx, btnY + 27, 'CORRER [ENTER]', { ...titleStyle, fontSize: '24px', letterSpacing: 2 }).setOrigin(0.5);

    this.tweens.add({ targets: [g, btnText], alpha: 0.8, duration: 800, yoyo: true, repeat: -1 });
  }

  initParticles(W, H) {
    this.time.addEvent({
      delay: 200,
      loop: true,
      callback: () => {
        const p = this.add.circle(Phaser.Math.Between(W * 0.2, W * 0.8), H + 10, Phaser.Math.Between(2, 4), 0xaaff88, 0.8);
        this.tweens.add({
          targets: p, 
          y: H * 0.4, 
          alpha: 0, 
          x: p.x + Phaser.Math.Between(-40, 40), 
          duration: Phaser.Math.Between(3000, 5000), 
          onComplete: () => p.destroy() 
        });
      }
    });
  }
}