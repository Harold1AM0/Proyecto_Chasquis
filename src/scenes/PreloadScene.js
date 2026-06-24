import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

const C = {
  skinDark: '#b8743c',
  skinMid: '#c68642',
  skinLight: '#e8b27a',
  skinHighlight: '#f3c995',

  chRed: '#b31212',
  chRed2: '#d91f1f',
  chGold: '#f0c431',
  chGold2: '#ffdf66',
  chBrown: '#6f4323',
  chBrown2: '#8b5a2b',
  chLeather: '#5a3417',
  chDark: '#2a190d',

  feather1: '#ff5c1a',
  feather2: '#ffd12f',
  feather3: '#e63b2e',

  steel: '#b9c5cf',
  steelMid: '#95a6b4',
  steelDark: '#667786',
  steelShadow: '#42515e',
  steelShine: '#eef4f8',

  capeRed: '#8d1010',
  capeRed2: '#c81919',
  capeEdge: '#f03a2c',

  goldTrim: '#d6a81f',
  goldLight: '#f1cf57',

  clothBrown: '#7b5231',
  clothBrown2: '#94633c',
  clothDark: '#4d311d',

  darkLegs: '#35261a',
  boot: '#1e140c',

  beard: '#654321',
  black: '#080808',
  white: '#ffffff',
  shadow: '#000000'
};

function r(ctx, color, x, y, w, h) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawChasqui(ctx) {
  // Sombra al piso
  r(ctx, '#140b05', 12, 74, 30, 4);

  // Plumas
  r(ctx, C.feather3, 31, 0, 5, 14);
  r(ctx, C.feather1, 28, 2, 5, 16);
  r(ctx, C.feather2, 23, 0, 5, 18);
  r(ctx, C.feather1, 18, 3, 5, 14);
  r(ctx, C.feather3, 14, 7, 4, 10);

  // Cinta de cabeza
  r(ctx, C.chRed, 13, 15, 24, 5);
  r(ctx, C.chGold2, 13, 16, 24, 2);

  // Cabeza
  r(ctx, C.skinDark, 15, 20, 20, 18);
  r(ctx, C.skinMid, 17, 21, 16, 14);
  r(ctx, C.skinLight, 20, 23, 10, 7);

  // Pelo
  r(ctx, C.black, 13, 19, 4, 18);
  r(ctx, C.black, 33, 19, 4, 18);
  r(ctx, C.black, 17, 19, 16, 3);
  r(ctx, C.black, 15, 22, 2, 8);
  r(ctx, C.black, 33, 22, 2, 8);

  // Ojos
  r(ctx, C.black, 20, 27, 3, 3);
  r(ctx, C.black, 28, 27, 3, 3);
  r(ctx, C.white, 21, 27, 1, 1);
  r(ctx, C.white, 29, 27, 1, 1);

  // Nariz / boca
  r(ctx, '#8d5b36', 24, 29, 2, 4);
  r(ctx, '#6a2e18', 22, 34, 8, 2);

  // Cuello
  r(ctx, C.skinDark, 22, 38, 8, 4);

  // Túnica principal
  r(ctx, C.clothBrown, 11, 42, 28, 20);
  r(ctx, C.clothBrown2, 14, 45, 22, 12);
  r(ctx, C.chGold, 11, 45, 28, 3);
  r(ctx, C.chRed2, 11, 49, 28, 2);

  // Bordes túnica
  r(ctx, C.clothDark, 11, 42, 3, 20);
  r(ctx, C.clothDark, 36, 42, 3, 20);

  // Chuspa (bolsa cruzada)
  r(ctx, C.chLeather, 31, 41, 5, 16);
  r(ctx, C.chBrown2, 34, 48, 10, 10);
  r(ctx, C.chGold, 37, 51, 3, 3);

  // Brazos
  r(ctx, C.skinDark, 7, 45, 5, 13);
  r(ctx, C.skinLight, 8, 54, 4, 5);
  r(ctx, C.skinDark, 39, 46, 5, 13);
  r(ctx, C.skinLight, 39, 54, 4, 5);

  // Brazo extendido con mensaje
  r(ctx, C.skinDark, 43, 43, 6, 6);
  r(ctx, C.skinLight, 48, 43, 5, 5);
  r(ctx, '#e8ddb5', 51, 42, 3, 7); // mensaje

  // Cinturón
  r(ctx, C.chLeather, 14, 58, 22, 3);
  r(ctx, C.chGold2, 24, 58, 3, 3);

  // Piernas
  r(ctx, C.darkLegs, 16, 62, 8, 10);
  r(ctx, C.darkLegs, 26, 62, 8, 10);

  // Detalle zancada
  r(ctx, C.darkLegs, 14, 68, 9, 5);
  r(ctx, C.darkLegs, 28, 66, 9, 7);

  // Sandalias / botas
  r(ctx, C.chBrown, 13, 71, 11, 4);
  r(ctx, C.chBrown, 27, 71, 12, 4);

  // Brillos
  r(ctx, C.skinHighlight, 21, 24, 4, 2);
  r(ctx, C.skinHighlight, 28, 24, 3, 2);
  r(ctx, C.chGold2, 17, 46, 4, 1);
}

function drawConquistador(ctx) {
  // Sombra
  r(ctx, '#120a06', 15, 76, 30, 4);

  // Casco - cresta superior
  r(ctx, C.steelDark, 26, 0, 8, 5);
  r(ctx, C.goldTrim, 27, 0, 6, 3);

  // Casco principal
  r(ctx, C.steel, 16, 5, 28, 14);
  r(ctx, C.steelMid, 14, 18, 32, 5);
  r(ctx, C.steelShine, 20, 7, 7, 6);
  r(ctx, C.goldTrim, 27, 6, 5, 13);
  r(ctx, C.goldLight, 20, 10, 16, 3);

  // Rostro
  r(ctx, '#e5c093', 18, 23, 24, 16);
  r(ctx, '#f0d0a8', 21, 24, 18, 11);

  // Ojos / cejas
  r(ctx, C.black, 22, 29, 3, 2);
  r(ctx, C.black, 35, 29, 3, 2);
  r(ctx, C.beard, 21, 27, 5, 2);
  r(ctx, C.beard, 34, 27, 5, 2);

  // Nariz / bigote / barba
  r(ctx, '#a77a52', 29, 30, 2, 4);
  r(ctx, C.beard, 23, 35, 14, 3);
  r(ctx, '#7b4f2e', 26, 37, 8, 4);

  // Cuello
  r(ctx, '#c09060', 26, 39, 8, 3);

  // Hombreras
  r(ctx, C.steelMid, 10, 40, 12, 8);
  r(ctx, C.steelMid, 38, 40, 12, 8);
  r(ctx, C.steelDark, 10, 40, 12, 2);
  r(ctx, C.steelDark, 38, 40, 12, 2);

  // Torso armadura
  r(ctx, C.steel, 16, 42, 28, 23);
  r(ctx, C.steelMid, 19, 45, 22, 15);
  r(ctx, C.steelShine, 20, 46, 7, 10);
  r(ctx, C.steelDark, 29, 42, 3, 23);

  // Bordes dorados
  r(ctx, C.goldTrim, 16, 42, 28, 2);
  r(ctx, C.goldTrim, 16, 63, 28, 2);

  // Capa
  r(ctx, C.capeRed, 8, 41, 9, 28);
  r(ctx, C.capeRed2, 10, 43, 5, 22);
  r(ctx, C.capeEdge, 8, 41, 2, 28);

  // Brazo izquierdo
  r(ctx, C.steel, 8, 46, 8, 14);
  r(ctx, C.steelDark, 8, 46, 2, 14);

  // Brazo derecho
  r(ctx, C.steel, 44, 46, 7, 14);
  r(ctx, C.steelDark, 49, 46, 2, 14);

  // Espada
  r(ctx, C.steelDark, 50, 28, 2, 22);
  r(ctx, C.steelShine, 52, 24, 3, 30);
  r(ctx, C.goldTrim, 48, 49, 8, 3);
  r(ctx, C.clothDark, 53, 54, 2, 10);

  // Falda de armadura / faldón
  r(ctx, C.steelDark, 15, 65, 30, 4);
  r(ctx, C.steel, 18, 65, 5, 4);
  r(ctx, C.steel, 28, 65, 5, 4);
  r(ctx, C.steel, 38, 65, 5, 4);

  // Piernas
  r(ctx, C.darkLegs, 18, 69, 9, 8);
  r(ctx, C.darkLegs, 33, 69, 9, 8);

  // Botas
  r(ctx, C.boot, 17, 76, 12, 4);
  r(ctx, C.boot, 32, 76, 12, 4);

  // Detalles extra de armadura
  r(ctx, C.goldLight, 22, 49, 12, 2);
  r(ctx, C.goldTrim, 25, 54, 6, 2);
  r(ctx, C.steelShadow, 41, 48, 4, 11);
}

function createPixelTexture(scene, key, width, height, drawFn) {
  const tex = scene.textures.createCanvas(key, width, height);
  const ctx = tex.getContext();

  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, width, height);

  drawFn(ctx);

  tex.refresh();
}

function px(ctx, color, x, y, w, h) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// ─────────────────────────────────────────────
// ROCA VALLE
// ─────────────────────────────────────────────
function drawRocaValle(ctx) {
  px(ctx, '#3a2a1a', 16, 44, 36, 6);
  px(ctx, '#5d4631', 12, 34, 44, 14);
  px(ctx, '#7a5a3a', 16, 26, 36, 14);
  px(ctx, '#8c6844', 22, 18, 24, 12);
  px(ctx, '#a17a50', 28, 14, 14, 8);

  px(ctx, '#c09560', 24, 22, 10, 5);
  px(ctx, '#b08355', 18, 31, 8, 4);
  px(ctx, '#4a3420', 44, 32, 7, 8);
  px(ctx, '#3a2a1a', 14, 40, 8, 6);
  px(ctx, '#2a1a0a', 24, 47, 24, 4);
}

// ─────────────────────────────────────────────
// ARBUSTO VALLE
// ─────────────────────────────────────────────
function drawArbustoValle(ctx) {
  px(ctx, '#3a2a12', 22, 46, 20, 6);

  px(ctx, '#245c24', 12, 34, 18, 16);
  px(ctx, '#2f7a2f', 20, 26, 22, 24);
  px(ctx, '#3f9a3f', 34, 32, 18, 18);
  px(ctx, '#4fb34f', 24, 20, 12, 10);

  px(ctx, '#7bd66a', 18, 31, 5, 5);
  px(ctx, '#7bd66a', 37, 35, 5, 5);
  px(ctx, '#5fcf5f', 29, 25, 4, 4);

  px(ctx, '#1b401b', 14, 44, 38, 6);
}

// ─────────────────────────────────────────────
// OSO DE ANTEOJOS VALLE
// Estático, como obstáculo/animal en el camino.
// ─────────────────────────────────────────────
function drawOsoAnteojosValle(ctx) {
  // sombra
  px(ctx, '#1a0f08', 14, 56, 38, 5);

  // cuerpo
  px(ctx, '#2a1a10', 14, 34, 36, 22);
  px(ctx, '#3a2415', 18, 28, 28, 12);

  // cabeza
  px(ctx, '#2b1b11', 20, 14, 24, 22);
  px(ctx, '#3a2415', 18, 18, 28, 16);

  // orejas
  px(ctx, '#1d1109', 18, 11, 8, 8);
  px(ctx, '#1d1109', 38, 11, 8, 8);

  // manchas claras de anteojos
  px(ctx, '#d8b178', 22, 19, 8, 8);
  px(ctx, '#d8b178', 34, 19, 8, 8);
  px(ctx, '#e8c890', 24, 21, 4, 4);
  px(ctx, '#e8c890', 36, 21, 4, 4);

  // ojos
  px(ctx, '#080808', 25, 22, 3, 3);
  px(ctx, '#080808', 37, 22, 3, 3);

  // hocico
  px(ctx, '#c9965a', 28, 28, 8, 6);
  px(ctx, '#0a0502', 31, 29, 3, 2);

  // patas
  px(ctx, '#1d1109', 16, 50, 8, 8);
  px(ctx, '#1d1109', 40, 50, 8, 8);

  // brillo cuerpo
  px(ctx, '#4a2d1b', 21, 36, 10, 5);
}

// ─────────────────────────────────────────────
// ROCA NOCHE
// ─────────────────────────────────────────────
function drawRocaNoche(ctx) {
  px(ctx, '#05080c', 16, 45, 36, 6);
  px(ctx, '#18212a', 12, 35, 44, 14);
  px(ctx, '#253342', 16, 27, 36, 14);
  px(ctx, '#31465a', 22, 18, 24, 12);
  px(ctx, '#4a6178', 28, 14, 14, 8);

  px(ctx, '#7fa0b8', 25, 22, 8, 4);
  px(ctx, '#5d7f94', 18, 32, 7, 3);
  px(ctx, '#0b1118', 44, 33, 7, 8);
  px(ctx, '#090d12', 23, 47, 25, 4);
}

// ─────────────────────────────────────────────
// ARBUSTO NOCHE
// ─────────────────────────────────────────────
function drawArbustoNoche(ctx) {
  px(ctx, '#071006', 22, 47, 20, 6);

  px(ctx, '#0b2a18', 12, 35, 18, 16);
  px(ctx, '#123d24', 20, 27, 22, 24);
  px(ctx, '#18512f', 34, 33, 18, 18);
  px(ctx, '#2b7046', 24, 21, 12, 10);

  px(ctx, '#6ed28a', 18, 31, 4, 4);
  px(ctx, '#6ed28a', 38, 36, 4, 4);
  px(ctx, '#3fa45f', 29, 26, 4, 4);

  px(ctx, '#061409', 14, 45, 38, 6);
}

// ─────────────────────────────────────────────
// TRONCO CAÍDO NOCHE
// ─────────────────────────────────────────────
function drawTroncoNoche(ctx) {
  // sombra
  px(ctx, '#050302', 8, 49, 52, 7);

  // tronco principal
  px(ctx, '#3a2112', 8, 34, 48, 14);
  px(ctx, '#5a351d', 10, 30, 44, 10);
  px(ctx, '#7a4a28', 14, 28, 34, 6);

  // corte circular
  px(ctx, '#2a160a', 50, 31, 8, 16);
  px(ctx, '#9a6a3a', 52, 34, 4, 10);
  px(ctx, '#c08a50', 53, 37, 2, 4);

  // líneas de madera
  px(ctx, '#1a0d05', 14, 35, 28, 2);
  px(ctx, '#2a160a', 20, 42, 24, 2);
  px(ctx, '#9a6a3a', 17, 31, 18, 2);

  // ramas rotas
  px(ctx, '#3a2112', 22, 22, 6, 10);
  px(ctx, '#5a351d', 24, 19, 5, 6);
  px(ctx, '#2a160a', 38, 24, 5, 8);
}

// ─────────────────────────────────────────────
// SERPIENTE NOCHE
// ─────────────────────────────────────────────
function drawSerpienteNoche(ctx) {
  // sombra
  px(ctx, '#030503', 10, 50, 46, 5);

  // cuerpo ondulado
  px(ctx, '#1f6b3a', 10, 42, 14, 8);
  px(ctx, '#2f8a4a', 18, 36, 14, 8);
  px(ctx, '#1f6b3a', 28, 42, 14, 8);
  px(ctx, '#2f8a4a', 38, 36, 12, 8);

  // cabeza
  px(ctx, '#3fa45f', 48, 33, 10, 10);
  px(ctx, '#54c878', 51, 31, 7, 6);

  // ojo
  px(ctx, '#ffdd66', 54, 34, 2, 2);
  px(ctx, '#000000', 55, 34, 1, 2);

  // lengua
  px(ctx, '#ff3355', 58, 36, 5, 1);
  px(ctx, '#ff3355', 62, 35, 2, 1);
  px(ctx, '#ff3355', 62, 37, 2, 1);

  // manchas
  px(ctx, '#0c2d18', 15, 43, 3, 2);
  px(ctx, '#0c2d18', 25, 38, 3, 2);
  px(ctx, '#0c2d18', 36, 44, 3, 2);
  px(ctx, '#0c2d18', 46, 38, 3, 2);
}

// ─────────────────────────────────────────────
// CACTUS COSTA
// ─────────────────────────────────────────────
function drawCactusCosta(ctx) {
  // sombra
  px(ctx, '#1a1208', 18, 58, 30, 5);

  // cuerpo principal
  px(ctx, '#1f7a3a', 27, 14, 14, 44);
  px(ctx, '#2fa04e', 30, 14, 6, 44);
  px(ctx, '#145c2a', 38, 18, 3, 38);

  // brazo izquierdo
  px(ctx, '#1f7a3a', 15, 30, 12, 10);
  px(ctx, '#1f7a3a', 15, 22, 8, 18);
  px(ctx, '#2fa04e', 17, 22, 4, 16);

  // brazo derecho
  px(ctx, '#1f7a3a', 41, 36, 12, 10);
  px(ctx, '#1f7a3a', 47, 26, 8, 20);
  px(ctx, '#2fa04e', 49, 26, 4, 18);

  // espinas
  px(ctx, '#e8e0aa', 31, 20, 2, 2);
  px(ctx, '#e8e0aa', 35, 28, 2, 2);
  px(ctx, '#e8e0aa', 31, 38, 2, 2);
  px(ctx, '#e8e0aa', 35, 48, 2, 2);
  px(ctx, '#e8e0aa', 18, 28, 2, 2);
  px(ctx, '#e8e0aa', 50, 34, 2, 2);

  // base arena
  px(ctx, '#8c6844', 22, 56, 24, 4);
}

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('fondoVictoria', 'assets/images/backgrounds/victoria.png');
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
    this.load.image('story_final_2', 'assets/images/story/story_final_2.png');

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

    // Obstáculos nivel 1
    createPixelTexture(this, 'obs_roca_valle', 64, 64, drawRocaValle);
    createPixelTexture(this, 'obs_arbusto_valle', 64, 64, drawArbustoValle);
    createPixelTexture(this, 'obs_oso_valle', 64, 64, drawOsoAnteojosValle);

    // Obstáculos nivel 2
    createPixelTexture(this, 'obs_roca_noche', 64, 64, drawRocaNoche);
    createPixelTexture(this, 'obs_arbusto_noche', 64, 64, drawArbustoNoche);
    createPixelTexture(this, 'obs_tronco_noche', 64, 64, drawTroncoNoche);
    createPixelTexture(this, 'obs_serpiente_noche', 64, 64, drawSerpienteNoche);

    // Obstáculos nivel 3
    createPixelTexture(this, 'obs_cactus_costa', 64, 64, drawCactusCosta);

    this.scene.start('MenuScene');
  }
}