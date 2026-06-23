import Phaser from 'phaser';
import { GAME_CONFIG } from './config.js';
import PreloadScene  from './scenes/PreloadScene.js';
import MenuScene     from './scenes/MenuScene.js';
import GameScene     from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import WinScene from './scenes/WinScene.js';
import StoryScene from './scenes/StoryScene.js';
import EndScene from './scenes/EndScene.js';

const config = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  backgroundColor: GAME_CONFIG.backgroundColor,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [PreloadScene, MenuScene, GameScene, GameOverScene, WinScene, StoryScene, EndScene]
};

new Phaser.Game(config);