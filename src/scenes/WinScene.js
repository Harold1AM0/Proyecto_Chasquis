import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  init(data) {
    this.finalScore = data.score || 0;

    this.title = data.title || '¡TRAMO COMPLETADO!';
    this.subtitle = data.subtitle || 'El mensaje sigue su camino por el Qhapaq Ñan.';
    this.bodyText = data.bodyText || 'Prepárate para continuar la misión.';
    this.scoreLabel = data.scoreLabel || 'PUNTUACIÓN ACUMULADA';
    this.buttonText = data.buttonText || 'CONTINUAR MISIÓN [ENTER]';

    this.nextScene = data.nextScene || 'GameScene';
    this.nextData = data.nextData || {};
  }

  preload() {
    this.load.image('fondoVictoria', '../../assets/images/backgrounds/victoria.png');
  }

  create() {
    const { width: W, height: H } = GAME_CONFIG;

    this.add
      .image(W / 2, H / 2, 'fondoVictoria')
      .setOrigin(0.5)
      .setDisplaySize(W, H);

    const cx = W / 2;
    const cy = H / 2;

    const panel = this.add.graphics();
    panel.fillStyle(0x0a2210, 0.45);
    panel.fillRoundedRect(cx - 300, cy - 180, 600, 370, 20);
    panel.lineStyle(3, 0xffdd44, 0.7);
    panel.strokeRoundedRect(cx - 300, cy - 180, 600, 370, 20);

    const titleStyle = {
      fontFamily: 'Impact, sans-serif',
      color: '#ffcc33',
      align: 'center'
    };

    const textStyle = {
      fontFamily: 'Trebuchet MS, sans-serif',
      color: '#ffffff',
      align: 'center'
    };

    this.add.text(cx, cy - 110, this.title, {
      ...titleStyle,
      fontSize: '58px',
      stroke: '#113311',
      strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(cx, cy - 38, this.subtitle, {
      ...textStyle,
      fontSize: '24px',
      fontStyle: 'italic',
      stroke: '#000000',
      strokeThickness: 5,
      wordWrap: {
        width: 520
      }
    }).setOrigin(0.5);

    this.add.text(cx, cy + 8, this.bodyText, {
      ...textStyle,
      fontSize: '18px',
      color: '#ddffcc',
      stroke: '#000000',
      strokeThickness: 4,
      wordWrap: {
        width: 520
      }
    }).setOrigin(0.5);

    const scoreBox = this.add.graphics();
    scoreBox.fillStyle(0x000000, 0.55);
    scoreBox.fillRoundedRect(cx - 150, cy + 45, 300, 85, 15);
    scoreBox.lineStyle(2, 0xffcc33, 0.8);
    scoreBox.strokeRoundedRect(cx - 150, cy + 45, 300, 85, 15);

    this.add.text(cx, cy + 65, this.scoreLabel, {
      ...textStyle,
      fontSize: '16px',
      color: '#ffcc33',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    const scoreText = this.add.text(cx, cy + 100, '0', {
      ...titleStyle,
      fontSize: '42px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);

    if (this.finalScore > 0) {
      const counter = { value: 0 };

      this.tweens.add({
        targets: counter,
        value: this.finalScore,
        duration: 1200,
        ease: 'Cubic.easeOut',
        onUpdate: () => {
          scoreText.setText(Math.floor(counter.value).toString());
        }
      });
    }

    const btnText = this.add.text(cx, cy + 160, `▶ ${this.buttonText}`, {
      ...titleStyle,
      fontSize: '22px',
      color: '#fff5d0',
      stroke: '#000000',
      strokeThickness: 5,
      letterSpacing: 2
    }).setOrigin(0.5);

    this.add.text(cx, cy + 200, '← Volver al menú [M]', {
      ...textStyle,
      fontSize: '16px',
      color: '#c9b67c',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.tweens.add({
      targets: btnText,
      alpha: 0.5,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    const keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
      m: Phaser.Input.Keyboard.KeyCodes.M
    });

    const continueGame = () => {
      this.scene.start(this.nextScene, this.nextData);
    };

    keys.space.once('down', continueGame);
    keys.enter.once('down', continueGame);

    keys.m.once('down', () => {
      this.scene.start('MenuScene');
    });

    this.input.once('pointerdown', continueGame);
  }
}