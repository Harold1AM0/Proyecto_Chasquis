import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const W = GAME_CONFIG.width;
    const H = GAME_CONFIG.height;

    // ═══════════════════════════════════════════
    //  FONDO — cielo degradado andino
    // ═══════════════════════════════════════════
    const sky = this.add.graphics();
    // Degradado manual por franjas (Phaser no tiene fillGradient en Canvas mode)
    const skyColors = [0x0a0500, 0x1a0d02, 0x2d1500, 0x3d1e00, 0x4a2500];
    const bandH = H / skyColors.length;
    skyColors.forEach((c, i) => {
      sky.fillStyle(c, 1);
      sky.fillRect(0, i * bandH, W, bandH + 1);
    });

    // ═══════════════════════════════════════════
    //  MONTAÑAS ANDINAS (siluetas en capas)
    // ═══════════════════════════════════════════
    this._drawMountains(W, H);

    // ═══════════════════════════════════════════
    //  CAMINO — el Qhapaq Ñan
    // ═══════════════════════════════════════════
    const road = this.add.graphics();
    // Camino trapezoidal con perspectiva
    road.fillStyle(0x5c3a1e, 1);
    road.fillTriangle(0, H, W, H, W / 2, H * 0.52);
    road.fillTriangle(0, H, W / 2, H * 0.52, 0, H);
    // Bordes del camino
    road.lineStyle(2, 0xffcc00, 0.4);
    road.beginPath();
    road.moveTo(W * 0.15, H); road.lineTo(W / 2, H * 0.52);
    road.moveTo(W * 0.85, H); road.lineTo(W / 2, H * 0.52);
    road.strokePath();
    // Piedras del camino inca (líneas horizontales)
    road.lineStyle(1, 0x8b6030, 0.35);
    for (let i = 0; i < 7; i++) {
      const t = i / 7;
      const y = H * 0.52 + (H - H * 0.52) * t;
      const xSpread = W * 0.15 + (W * 0.35) * t;
      road.beginPath();
      road.moveTo(W / 2 - xSpread, y);
      road.lineTo(W / 2 + xSpread, y);
      road.strokePath();
    }

    // ═══════════════════════════════════════════
    //  ESTRELLAS / partículas de fondo
    // ═══════════════════════════════════════════
    this._drawStars(W, H);

    // ═══════════════════════════════════════════
    //  SOL INCA — Inti (esquina superior)
    // ═══════════════════════════════════════════
    this._drawInti(W * 0.82, H * 0.18, 48);

    // ═══════════════════════════════════════════
    //  PERSONAJES decorativos en el menú
    // ═══════════════════════════════════════════
    // Chasqui corriendo a la izquierda (grande, semitransparente)
    const chasquiDeco = this.add.image(155, H * 0.62, 'chasqui');
    chasquiDeco.setScale(2.2).setAlpha(0.9).setFlipX(false);

    // Conquistador a la derecha (amenazante, más lejos = más pequeño)
    const conquDeco = this.add.image(W - 130, H * 0.6, 'conquistador');
    conquDeco.setScale(1.6).setAlpha(0.75).setFlipX(true);

    // Animación: chasqui bobbing
    this.tweens.add({
      targets: chasquiDeco, y: H * 0.62 - 5,
      duration: 380, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });
    // Conquistador avanza lentamente
    this.tweens.add({
      targets: conquDeco, x: W - 145,
      duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    // ═══════════════════════════════════════════
    //  PANEL CENTRAL (piedra tallada)
    // ═══════════════════════════════════════════
    const panelG = this.add.graphics();
    // Sombra del panel
    panelG.fillStyle(0x000000, 0.5);
    panelG.fillRoundedRect(W / 2 - 248, 62, 496, 220, 12);
    // Panel principal
    panelG.fillStyle(0x1a0d02, 0.82);
    panelG.fillRoundedRect(W / 2 - 245, 60, 490, 216, 10);
    // Borde dorado exterior
    panelG.lineStyle(2.5, 0xffcc00, 0.9);
    panelG.strokeRoundedRect(W / 2 - 245, 60, 490, 216, 10);
    // Borde interior ornamental
    panelG.lineStyle(1, 0xcc8800, 0.4);
    panelG.strokeRoundedRect(W / 2 - 238, 67, 476, 202, 7);

    // Esquinas decorativas (rombos andinos)
    this._drawCornerDiamond(panelG, W / 2 - 245, 60);
    this._drawCornerDiamond(panelG, W / 2 + 245, 60);
    this._drawCornerDiamond(panelG, W / 2 - 245, 276);
    this._drawCornerDiamond(panelG, W / 2 + 245, 276);

    // ═══════════════════════════════════════════
    //  TEXTO — título principal
    // ═══════════════════════════════════════════
    // Sombra del título
    this.add.text(W / 2 + 3, 103, 'QHAPAQ ÑAN', {
      fontSize: '54px', color: '#3a1a00', fontStyle: 'bold',
      fontFamily: 'Georgia, serif',
    }).setOrigin(0.5).setAlpha(0.8);

    // Título principal con doble stroke (efecto grabado)
    this.add.text(W / 2, 100, 'QHAPAQ ÑAN', {
      fontSize: '54px', color: '#ffdd44', fontStyle: 'bold',
      fontFamily: 'Georgia, serif',
      stroke: '#7a4a00', strokeThickness: 10,
    }).setOrigin(0.5);

    // Subtítulo con separadores ornamentales
    this.add.text(W / 2, 158, '✦  El Camino del Chasqui  ✦', {
      fontSize: '19px', color: '#cc8800',
      fontFamily: 'Georgia, serif', fontStyle: 'italic',
    }).setOrigin(0.5);

    // Línea separadora dorada
    const sep = this.add.graphics();
    sep.lineStyle(1, 0xffcc00, 0.5);
    sep.beginPath();
    sep.moveTo(W / 2 - 180, 183); sep.lineTo(W / 2 + 180, 183);
    sep.strokePath();

    // ═══════════════════════════════════════════
    //  INSTRUCCIONES en el panel
    // ═══════════════════════════════════════════
    const instrStyle = { fontSize: '16px', color: '#ffeecc', fontFamily: 'Georgia, serif' };
    this.add.text(W / 2, 205, '↑  ↓   Cambia de carril', instrStyle).setOrigin(0.5);
    this.add.text(W / 2, 230, 'Esquiva a los conquistadores', {
      ...instrStyle, color: '#ccaa77', fontSize: '15px', fontStyle: 'italic'
    }).setOrigin(0.5);
    this.add.text(W / 2, 255, '¡El Imperio Inca depende de ti!', {
      ...instrStyle, color: '#ff9944', fontSize: '14px', fontStyle: 'italic'
    }).setOrigin(0.5);

    // ═══════════════════════════════════════════
    //  BOTÓN DE INICIO — parpadeante
    // ═══════════════════════════════════════════
    const btnG = this.add.graphics();
    btnG.fillStyle(0xcc6600, 0.9);
    btnG.fillRoundedRect(W / 2 - 170, 380, 340, 52, 26);
    btnG.lineStyle(2, 0xffdd44, 1);
    btnG.strokeRoundedRect(W / 2 - 170, 380, 340, 52, 26);

    const startText = this.add.text(W / 2, 406,
      '▶   PRESIONA ENTER PARA CORRER', {
        fontSize: '17px', color: '#fff8e0', fontStyle: 'bold',
        fontFamily: 'Georgia, serif',
        stroke: '#7a3300', strokeThickness: 4,
      }
    ).setOrigin(0.5);

    // Pulso del botón
    this.tweens.add({
      targets: [btnG, startText], alpha: 0.3,
      duration: 650, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    // ═══════════════════════════════════════════
    //  PARTÍCULAS DE POLVO DORADO (manual)
    // ═══════════════════════════════════════════
    this._dustParticles = [];
    for (let i = 0; i < 18; i++) {
      this._spawnDust(W, H, true);
    }

    // ═══════════════════════════════════════════
    //  CONTROLES
    // ═══════════════════════════════════════════
    const keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER
    });
    const start = () => this.scene.start('GameScene');
    keys.space.once('down', start);
    keys.enter.once('down', start);
    this.input.once('pointerdown', start);
  }

  // ───────────────────────────────────────────
  //  Helpers de dibujo
  // ───────────────────────────────────────────

  _drawMountains(W, H) {
    // Capa trasera — montañas lejanas (oscuras, azuladas)
    const m1 = this.add.graphics();
    m1.fillStyle(0x1a0e04, 1);
    m1.beginPath();
    m1.moveTo(0, H * 0.7);
    [[0, 0.7],[0.08,0.42],[0.18,0.55],[0.28,0.35],[0.38,0.5],[0.5,0.3],[0.62,0.48],[0.72,0.33],[0.82,0.5],[0.92,0.38],[1,0.55],[1,0.7]]
      .forEach(([x,y]) => m1.lineTo(W*x, H*y));
    m1.closePath(); m1.fillPath();

    // Capa media — montañas principales
    const m2 = this.add.graphics();
    m2.fillStyle(0x2a1505, 1);
    m2.beginPath();
    m2.moveTo(0, H * 0.75);
    [[0,0.75],[0.05,0.58],[0.15,0.7],[0.22,0.48],[0.35,0.65],[0.45,0.44],[0.55,0.62],[0.65,0.46],[0.78,0.6],[0.88,0.5],[1,0.65],[1,0.75]]
      .forEach(([x,y]) => m2.lineTo(W*x, H*y));
    m2.closePath(); m2.fillPath();

    // Nieves perpetuas (picos blancos)
    const snow = this.add.graphics();
    snow.fillStyle(0xfff8ee, 0.7);
    [[0.28,0.35,0.04],[0.5,0.3,0.05],[0.72,0.33,0.04],[0.45,0.44,0.035],[0.65,0.46,0.03]]
      .forEach(([cx,cy,size]) => {
        snow.beginPath();
        snow.moveTo(W*cx, H*cy);
        snow.lineTo(W*(cx-size), H*(cy+size*0.9));
        snow.lineTo(W*(cx+size), H*(cy+size*0.9));
        snow.closePath(); snow.fillPath();
      });
  }

  _drawStars(W, H) {
    const stars = this.add.graphics();
    const rng = new Phaser.Math.RandomDataGenerator(['inca2025']);
    for (let i = 0; i < 60; i++) {
      const x = rng.between(0, W);
      const y = rng.between(0, H * 0.48);
      const r = rng.frac() > 0.85 ? 1.5 : 0.8;
      const a = 0.3 + rng.frac() * 0.7;
      stars.fillStyle(0xfffde0, a);
      stars.fillCircle(x, y, r);
    }
  }

  _drawInti(cx, cy, r) {
    const g = this.add.graphics();
    // Rayos del sol
    const numRays = 16;
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2;
      const inner = r * 1.25;
      const outer = r * (i % 2 === 0 ? 2.1 : 1.75);
      g.lineStyle(i % 2 === 0 ? 2.5 : 1.5, 0xffcc00, i % 2 === 0 ? 0.9 : 0.5);
      g.beginPath();
      g.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      g.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
      g.strokePath();
    }
    // Círculo del sol
    g.fillStyle(0xffaa00, 1);
    g.fillCircle(cx, cy, r);
    g.fillStyle(0xffdd44, 1);
    g.fillCircle(cx, cy, r * 0.78);
    // Cara del Inti (simplificada)
    g.fillStyle(0xcc6600, 1);
    g.fillCircle(cx - r * 0.28, cy - r * 0.1, r * 0.1); // ojo izq
    g.fillCircle(cx + r * 0.28, cy - r * 0.1, r * 0.1); // ojo der
    g.fillStyle(0xcc6600, 1);
    g.beginPath(); // boca
    g.arc(cx, cy + r * 0.05, r * 0.22, 0.2, Math.PI - 0.2);
    g.strokePath();
    // Animación de rotación suave del Inti
    this.tweens.add({
      targets: g, angle: 360, duration: 40000, repeat: -1, ease: 'Linear'
    });
  }

  _drawCornerDiamond(g, x, y) {
    g.fillStyle(0xffcc00, 0.9);
    g.fillTriangle(x - 6, y, x, y - 6, x + 6, y);
    g.fillTriangle(x - 6, y, x, y + 6, x + 6, y);
  }

  _spawnDust(W, H, instant = false) {
    const x = Phaser.Math.Between(W * 0.2, W * 0.8);
    const startY = instant ? Phaser.Math.Between(H * 0.5, H) : H + 5;
    const dot = this.add.graphics();
    const size = Phaser.Math.FloatBetween(1, 2.5);
    dot.fillStyle(0xffcc00, 1);
    dot.fillCircle(0, 0, size);
    dot.setPosition(x, startY).setAlpha(0);

    const targetY = Phaser.Math.Between(H * 0.3, H * 0.6);
    this.tweens.add({
      targets: dot,
      y: targetY,
      alpha: { from: 0, to: Phaser.Math.FloatBetween(0.15, 0.55) },
      duration: Phaser.Math.Between(2500, 5000),
      ease: 'Sine.easeOut',
      delay: instant ? Phaser.Math.Between(0, 3000) : 0,
      onComplete: () => {
        this.tweens.add({
          targets: dot, alpha: 0, duration: 800, ease: 'Sine.easeIn',
          onComplete: () => {
            dot.destroy();
            if (this.scene.isActive('MenuScene')) this._spawnDust(W, H);
          }
        });
      }
    });
  }

  update() {}
}