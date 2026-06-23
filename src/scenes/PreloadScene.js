import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

const C = {
  skinDark: '#c68642', skinLight: '#e8a96a',
  chRed: '#cc2200', chGold: '#ffcc00',
  chBrown: '#7a4a1e', chFeather1: '#ff6600',
  chFeather2: '#ffee00', steel: '#b8c8d8',
  steelDark: '#7890a0', steelShine: '#e8f0f8',
  capeRed: '#aa1100', capeEdge: '#dd3300',
  goldTrim: '#ddaa00', darkLegs: '#3a2a1a',
  boot: '#2a1a0a', tunicBrown: '#8b5e3c',
  tunicLine: '#6b3e1c',
};

function r(ctx, color, x, y, w, h) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawChasqui(ctx) {
  r(ctx, C.chFeather2, 26, 0, 5, 12); r(ctx, C.chFeather1, 27, 0, 3, 10);
  r(ctx, C.chFeather2, 17, 0, 6, 16); r(ctx, C.chFeather1, 18, 0, 4, 14);
  r(ctx, C.chFeather2, 9, 2, 5, 12); r(ctx, C.chFeather1, 10, 2, 3, 10);
  r(ctx, C.chRed, 9, 12, 22, 5);
  r(ctx, C.chGold, 9, 13, 22, 2);
  r(ctx, C.skinDark, 10, 17, 20, 18);
  r(ctx, C.skinLight, 12, 18, 16, 14);
  r(ctx, '#1a0a00', 14, 21, 3, 3); r(ctx, '#1a0a00', 23, 21, 3, 3);
  r(ctx, '#ffffff', 15, 21, 1, 1); r(ctx, '#ffffff', 24, 21, 1, 1);
  r(ctx, '#1a0a00', 10, 17, 3, 18); r(ctx, '#1a0a00', 27, 17, 3, 18);
  r(ctx, C.tunicBrown, 8, 35, 24, 18);
  r(ctx, C.chGold, 8, 38, 24, 3);
  r(ctx, C.chRed, 8, 42, 24, 2);
  r(ctx, C.tunicLine, 8, 35, 2, 18); r(ctx, C.tunicLine, 30, 35, 2, 18);
  r(ctx, C.skinDark, 30, 36, 6, 14);
  r(ctx, C.skinLight, 30, 49, 6, 5);
  r(ctx, C.tunicBrown, 4, 37, 5, 12);
  r(ctx, C.darkLegs, 12, 53, 10, 7);
  r(ctx, C.darkLegs, 16, 57, 8, 5);
  r(ctx, C.darkLegs, 18, 53, 10, 9);
  r(ctx, C.chBrown, 11, 60, 12, 4); r(ctx, C.chBrown, 19, 60, 10, 4);
  r(ctx, C.chRed, 4, 42, 7, 7);
  r(ctx, C.chGold, 5, 43, 5, 5);
}

function drawConquistador(ctx) {
  r(ctx, C.steelDark, 18, 0, 8, 4);
  r(ctx, C.steel, 10, 4, 24, 14);
  r(ctx, C.steelDark, 6, 16, 32, 4);
  r(ctx, C.steelShine, 13, 6, 8, 6);
  r(ctx, C.goldTrim, 20, 5, 4, 12); r(ctx, C.goldTrim, 13, 9, 18, 4);
  r(ctx, '#f4d0a0', 12, 20, 20, 14);
  r(ctx, C.steelDark, 10, 19, 24, 4);
  r(ctx, '#1a0a00', 14, 24, 4, 3); r(ctx, '#1a0a00', 26, 24, 4, 3);
  r(ctx, '#5a3010', 13, 23, 6, 2); r(ctx, '#5a3010', 25, 23, 6, 2);
  r(ctx, '#8b4513', 17, 30, 10, 3);
  r(ctx, '#8b6040', 12, 32, 20, 4); r(ctx, '#8b6040', 14, 35, 16, 3);
  r(ctx, C.steel, 13, 34, 18, 5);
  r(ctx, C.steel, 8, 39, 28, 16);
  r(ctx, C.steelShine, 12, 41, 8, 10);
  r(ctx, C.steelDark, 20, 39, 2, 16);
  r(ctx, C.goldTrim, 8, 39, 28, 2); r(ctx, C.goldTrim, 8, 53, 28, 2);
  r(ctx, C.capeRed, 2, 36, 8, 26);
  r(ctx, C.capeEdge, 2, 36, 2, 26);
  r(ctx, C.steel, 36, 40, 6, 14);
  r(ctx, C.goldTrim, 34, 53, 10, 3);
  r(ctx, C.steelShine, 36, 56, 4, 8);
  r(ctx, C.steel, 2, 40, 6, 12);
  r(ctx, C.steelDark, 10, 55, 24, 5);
  r(ctx, C.steel, 10, 55, 4, 5); r(ctx, C.steel, 18, 55, 4, 5); r(ctx, C.steel, 26, 55, 4, 5);
  r(ctx, C.darkLegs, 10, 60, 10, 4); r(ctx, C.darkLegs, 24, 60, 10, 4);
  r(ctx, C.boot, 9, 61, 12, 3); r(ctx, C.boot, 23, 61, 12, 3);
}

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('fondoMenu', 'assets/images/backgrounds/menu.png');

    // Backgrounds
    this.load.image('bg_valle', 'assets/images/backgrounds/bg_valle.png');
    this.load.image('bg_jungla', 'assets/images/backgrounds/bg_jungla.png');
    this.load.image('bg_costa', 'assets/images/backgrounds/bg_costa.png');

    // Roads
    this.load.image('road_valle', 'assets/images/roads/road_valle.png');
    this.load.image('road_jungla', 'assets/images/roads/road_jungla.png');
    this.load.image('road_costa', 'assets/images/roads/road_costa.png');

    // Historia images
    this.load.image('story_valle_1', 'assets/images/story/story_valle_1.png');
    this.load.image('story_valle_2', 'assets/images/story/story_valle_2.png');
    this.load.image('story_valle_4', 'assets/images/story/story_valle_4.png');

    this.load.image('story_jungla_1', 'assets/images/story/story_jungla_1.png');
    this.load.image('story_jungla_2', 'assets/images/story/story_jungla_2.png');

    this.load.image('story_costa_1', 'assets/images/story/story_costa_1.png');
    this.load.image('story_final_1', 'assets/images/story/story_final_1.png');

    // Música
    this.load.audio('music_menu', 'assets/audio/music/menu_theme.ogg');
    this.load.audio('music_valle', 'assets/audio/music/level_valle.ogg');
    this.load.audio('music_jungla', 'assets/audio/music/level_jungla.ogg');
    this.load.audio('music_costa', 'assets/audio/music/level_costa.ogg');

    // Efectos
    this.load.audio('sfx_lane_change', 'assets/audio/sfx/lane_change.wav');
    this.load.audio('sfx_death', 'assets/audio/sfx/death.wav');
    this.load.audio('sfx_level_complete', 'assets/audio/sfx/level_complete.wav');
    this.load.audio('sfx_button', 'assets/audio/sfx/button.wav');
  }

  create() {
    // textures.createCanvas: canvas 2D nativo, 100% fiable en Phaser 3
    const chasquiTex = this.textures.createCanvas(
      'chasqui',
      GAME_CONFIG.player.width,
      GAME_CONFIG.player.height
    );
    drawChasqui(chasquiTex.getContext());
    chasquiTex.refresh();

    const conquTex = this.textures.createCanvas(
      'conquistador',
      GAME_CONFIG.obstacle.width,
      GAME_CONFIG.obstacle.height
    );
    drawConquistador(conquTex.getContext());
    conquTex.refresh();

    this.scene.start('MenuScene');
  }
}