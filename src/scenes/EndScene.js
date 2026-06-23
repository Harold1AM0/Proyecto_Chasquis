import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  create() {
    const { width: W, height: H } = GAME_CONFIG;

    this.cameras.main.setBackgroundColor('#000000');

    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 1);

    this.add.text(W / 2, H / 2 - 70, 'QHAPAQ ÑAN', {
      fontFamily: 'Georgia, serif',
      fontSize: '64px',
      color: '#ffdd88',
      fontStyle: 'bold',
      stroke: '#3a2200',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2 - 10, 'La última misión del chasqui', {
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      color: '#cccccc',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2 + 80,
      'Abner Fonseca  •  Harol Azaña  •  Galileo Rengifo  •  Richard Infante',
      {
        fontFamily: 'Trebuchet MS, sans-serif',
        fontSize: '17px',
        color: '#888888',
        align: 'center'
      }
    ).setOrigin(0.5);

    this.add.text(W / 2, H - 60, 'Presiona ESPACIO / ENTER para volver al menú', {
      fontFamily: 'Trebuchet MS, sans-serif',
      fontSize: '16px',
      color: '#555555'
    }).setOrigin(0.5);

    const goMenu = () => {
      this.scene.start('MenuScene');
    };

    this.input.keyboard.once('keydown-SPACE', goMenu);
    this.input.keyboard.once('keydown-ENTER', goMenu);
    this.input.once('pointerdown', goMenu);
  }
}