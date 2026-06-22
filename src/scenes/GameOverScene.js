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

    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.82);

    const vignette = this.add.graphics();
    for (let i = 0; i < 6; i++) {
      const alpha = 0.06 - i * 0.008;
      const inset = i * 18;
      vignette.lineStyle(28, 0xcc0000, alpha);
      vignette.strokeRect(inset, inset, W - inset * 2, H - inset * 2);
    }

    // ═══════════════════════════════════════════
    //  PANEL CENTRAL — grietas y piedra rota
    // ═══════════════════════════════════════════
    const panelG = this.add.graphics();

    // Sombra exterior
    panelG.fillStyle(0x000000, 0.6);
    panelG.fillRoundedRect(W / 2 - 303, H / 2 - 183, 606, 366, 14);

    // Panel de piedra oscura
    panelG.fillStyle(0x110800, 0.92);
    panelG.fillRoundedRect(W / 2 - 300, H / 2 - 180, 600, 360, 12);

    // Borde rojo exterior (derrota)
    panelG.lineStyle(2.5, 0xcc2200, 0.95);
    panelG.strokeRoundedRect(W / 2 - 300, H / 2 - 180, 600, 360, 12);

    // Borde interior tenue
    panelG.lineStyle(1, 0x661100, 0.5);
    panelG.strokeRoundedRect(W / 2 - 292, H / 2 - 172, 584, 344, 9);

    // Grietas decorativas (efecto de derrota)
    panelG.lineStyle(1, 0xff3300, 0.25);
    // grieta superior izquierda
    panelG.beginPath();
    panelG.moveTo(W / 2 - 200, H / 2 - 180);
    panelG.lineTo(W / 2 - 160, H / 2 - 120);
    panelG.lineTo(W / 2 - 130, H / 2 - 140);
    panelG.strokePath();
    // grieta superior derecha
    panelG.beginPath();
    panelG.moveTo(W / 2 + 220, H / 2 - 180);
    panelG.lineTo(W / 2 + 170, H / 2 - 100);
    panelG.lineTo(W / 2 + 200, H / 2 - 80);
    panelG.strokePath();
    // grieta inferior
    panelG.beginPath();
    panelG.moveTo(W / 2 - 50, H / 2 + 180);
    panelG.lineTo(W / 2 + 20, H / 2 + 120);
    panelG.lineTo(W / 2 + 80, H / 2 + 145);
    panelG.strokePath();

    // Rombos en esquinas (andinos, en rojo esta vez)
    this._drawCornerDiamond(panelG, W / 2 - 300, H / 2 - 180, 0xcc2200);
    this._drawCornerDiamond(panelG, W / 2 + 300, H / 2 - 180, 0xcc2200);
    this._drawCornerDiamond(panelG, W / 2 - 300, H / 2 + 180, 0xcc2200);
    this._drawCornerDiamond(panelG, W / 2 + 300, H / 2 + 180, 0xcc2200);

    // ═══════════════════════════════════════════
    //  TEXTO — ¡ATRAPADO!
    // ═══════════════════════════════════════════
    // Sombra del título
    this.add.text(W / 2 + 4, H / 2 - 126, '¡ATRAPADO!', {
      fontSize: '62px', color: '#440000', fontStyle: 'bold',
      fontFamily: 'Georgia, serif',
    }).setOrigin(0.5).setAlpha(0.9);

    // Título principal con efecto metálico rojo
    const title = this.add.text(W / 2, H / 2 - 130, '¡ATRAPADO!', {
      fontSize: '62px', color: '#ff2200', fontStyle: 'bold',
      fontFamily: 'Georgia, serif',
      stroke: '#220000', strokeThickness: 10,
    }).setOrigin(0.5);

    // Animación de entrada — cae desde arriba
    title.setY(H / 2 - 280).setAlpha(0);
    this.tweens.add({
      targets: title,
      y: H / 2 - 130,
      alpha: 1,
      duration: 500,
      ease: 'Back.easeOut',
      delay: 80
    });

    // Subtítulo
    const sub = this.add.text(W / 2, H / 2 - 68,
      '✦  El conquistador te alcanzó  ✦', {
      fontSize: '20px', color: '#cc6600', fontStyle: 'italic',
      fontFamily: 'Georgia, serif',
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: sub, alpha: 1, duration: 400, delay: 380, ease: 'Sine.easeOut'
    });

    // Línea separadora
    const sepG = this.add.graphics().setAlpha(0);
    sepG.lineStyle(1, 0xcc2200, 0.55);
    sepG.beginPath();
    sepG.moveTo(W / 2 - 220, H / 2 - 42);
    sepG.lineTo(W / 2 + 220, H / 2 - 42);
    sepG.strokePath();
    this.tweens.add({ targets: sepG, alpha: 1, duration: 300, delay: 450 });

    // ═══════════════════════════════════════════
    //  PUNTUACIÓN
    // ═══════════════════════════════════════════
    const scoreContainer = this.add.graphics().setAlpha(0);
    scoreContainer.fillStyle(0x1a0500, 0.8);
    scoreContainer.fillRoundedRect(W / 2 - 140, H / 2 - 30, 280, 72, 8);
    scoreContainer.lineStyle(1.5, 0xcc4400, 0.7);
    scoreContainer.strokeRoundedRect(W / 2 - 140, H / 2 - 30, 280, 72, 8);

    this.add.text(W / 2, H / 2 - 8, 'PUNTUACIÓN', {
      fontSize: '13px', color: '#cc6600', fontStyle: 'bold',
      fontFamily: 'Georgia, serif', letterSpacing: 4,
    }).setOrigin(0.5).setAlpha(0);

    const scoreText = this.add.text(W / 2, H / 2 + 22, this.finalScore.toString(), {
      fontSize: '38px', color: '#ffffff', fontStyle: 'bold',
      fontFamily: 'Georgia, serif',
      stroke: '#3a0a00', strokeThickness: 6,
    }).setOrigin(0.5).setAlpha(0);

    // Todos los elementos de score entran juntos
    const scoreEls = [scoreContainer, scoreText];
    this.children.list
      .filter(c => c.type === 'Text' && c.text === 'PUNTUACIÓN')
      .forEach(c => scoreEls.push(c));

    this.tweens.add({
      targets: scoreEls, alpha: 1, duration: 450, delay: 550, ease: 'Sine.easeOut'
    });

    // Contador animado del score (0 → finalScore)
    if (this.finalScore > 0) {
      const counter = { val: 0 };
      this.tweens.add({
        targets: counter,
        val: this.finalScore,
        duration: 800,
        delay: 650,
        ease: 'Cubic.easeOut',
        onUpdate: () => {
          scoreText.setText(Math.floor(counter.val).toString());
        }
      });
    }

    // ═══════════════════════════════════════════
    //  BOTONES DE ACCIÓN
    // ═══════════════════════════════════════════
    // Botón principal — reintentar
    const retryBtnG = this.add.graphics().setAlpha(0);
    retryBtnG.fillStyle(0xaa3300, 0.9);
    retryBtnG.fillRoundedRect(W / 2 - 160, H / 2 + 72, 320, 48, 24);
    retryBtnG.lineStyle(2, 0xff6600, 0.9);
    retryBtnG.strokeRoundedRect(W / 2 - 160, H / 2 + 72, 320, 48, 24);

    const retryText = this.add.text(W / 2, H / 2 + 96,
      '▶  CORRER DE NUEVO  [ESPACIO]', {
      fontSize: '16px', color: '#fff5e0', fontStyle: 'bold',
      fontFamily: 'Georgia, serif',
      stroke: '#550000', strokeThickness: 4,
    }).setOrigin(0.5).setAlpha(0);

    // Botón secundario — menú
    const menuBtnG = this.add.graphics().setAlpha(0);
    menuBtnG.fillStyle(0x2a1500, 0.85);
    menuBtnG.fillRoundedRect(W / 2 - 110, H / 2 + 132, 220, 36, 18);
    menuBtnG.lineStyle(1.5, 0x886633, 0.7);
    menuBtnG.strokeRoundedRect(W / 2 - 110, H / 2 + 132, 220, 36, 18);

    const menuText = this.add.text(W / 2, H / 2 + 150, '← Volver al menú  [M]', {
      fontSize: '14px', color: '#ccaa66',
      fontFamily: 'Georgia, serif',
    }).setOrigin(0.5).setAlpha(0);

    // Entrada de botones
    const btnEls = [retryBtnG, retryText, menuBtnG, menuText];
    this.tweens.add({
      targets: btnEls, alpha: 1, duration: 400, delay: 700, ease: 'Sine.easeOut',
      onComplete: () => {
        // Pulso en el botón principal
        this.tweens.add({
          targets: [retryBtnG, retryText],
          alpha: 0.35,
          duration: 680,
          yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });
      }
    });

    // ═══════════════════════════════════════════
    //  PARTÍCULAS DE SANGRE / POLVO ROJO
    // ═══════════════════════════════════════════
    this.time.delayedCall(200, () => {
      for (let i = 0; i < 12; i++) {
        this._spawnEmber(W, H);
      }
    });

    // ═══════════════════════════════════════════
    //  CONTROLES
    // ═══════════════════════════════════════════
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

  // ─────────────────────────────────────────────
  //  Helpers
  // ─────────────────────────────────────────────

  _drawCornerDiamond(g, x, y, color) {
    g.fillStyle(color, 0.9);
    g.fillTriangle(x - 7, y, x, y - 7, x + 7, y);
    g.fillTriangle(x - 7, y, x, y + 7, x + 7, y);
  }

  _spawnEmber(W, H) {
    const x = Phaser.Math.Between(W / 2 - 260, W / 2 + 260);
    const y = Phaser.Math.Between(H / 2 - 150, H / 2 + 150);
    const dot = this.add.graphics();
    const size = Phaser.Math.FloatBetween(1, 2.8);
    const isGold = Phaser.Math.Between(0, 3) === 0;
    dot.fillStyle(isGold ? 0xffaa00 : 0xff2200, 1);
    dot.fillCircle(0, 0, size);
    dot.setPosition(x, y).setAlpha(0);

    const driftX = Phaser.Math.Between(-40, 40);
    const driftY = Phaser.Math.Between(-60, -20);

    this.tweens.add({
      targets: dot,
      x: x + driftX,
      y: y + driftY,
      alpha: { from: 0, to: Phaser.Math.FloatBetween(0.3, 0.7) },
      duration: Phaser.Math.Between(800, 1800),
      ease: 'Sine.easeOut',
      delay: Phaser.Math.Between(0, 600),
      onComplete: () => {
        this.tweens.add({
          targets: dot, alpha: 0, duration: 500, ease: 'Sine.easeIn',
          onComplete: () => dot.destroy()
        });
      }
    });
  }
}