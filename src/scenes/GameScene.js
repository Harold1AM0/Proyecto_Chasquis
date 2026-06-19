import Phaser from 'phaser';

import Player from '../entities/Player.js';

import ObstacleManager from '../managers/ObstacleManager.js';
import BackgroundManager from '../managers/BackgroundManager.js';
import ScoreManager from '../managers/ScoreManager.js';
import InputManager from '../managers/InputManager.js';
import VoiceCommandManager from '../managers/VoiceCommandManager.js';

import Hud from '../ui/Hud.js';
import VoiceDebugPanel from '../ui/VoiceDebugPanel.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.gameOver = false;

    this.backgroundManager = new BackgroundManager(this);
    this.backgroundManager.create();

    this.scoreManager = new ScoreManager();

    this.hud = new Hud(this);

    this.player = new Player(this, 1);

    this.obstacleManager = new ObstacleManager(this);

    this.inputManager = new InputManager(this, {
      onMoveUp: () => this.player.moveUp(),
      onMoveDown: () => this.player.moveDown(),
      onToggleVoice: () => this.voiceCommandManager.toggle()
    });

    const VOICE_DEBUG = true;  //Mostrar panel de debug de voz (comandos, transcripciones, etc)

    this.voiceDebugPanel = VOICE_DEBUG
      ? new VoiceDebugPanel(this)
      : null;

    const updateVoiceDebug = (data) => {
      if (!VOICE_DEBUG) return;
      this.voiceDebugPanel?.update(data);
    };

    this.voiceCommandManager = new VoiceCommandManager({
      debug: VOICE_DEBUG,

      processInterimCommands: true,

      onCommand: (command, meta = {}) => {
        this.inputManager.handleVoiceCommand(command);

        updateVoiceDebug({
          lastCommand: command === 'up' ? 'arriba' : 'abajo',
          latency:
            typeof meta.latencyMs === 'number'
              ? `${meta.latencyMs} ms`
              : '-'
        });
      },

      onStatusChange: (status) => {
        this.hud.updateVoiceStatus(status);

        updateVoiceDebug({
          status
        });
      },

      onError: (error) => {
        console.warn('Error de voz:', error);

        updateVoiceDebug({
          status: 'error'
        });
      },

      onDebug: VOICE_DEBUG
        ? (data) => updateVoiceDebug(data)
        : null
    });

    this.physics.add.overlap(
      this.player.sprite,
      this.obstacleManager.group,
      () => this.endGame()
    );

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.voiceCommandManager?.stop();
      this.voiceDebugPanel?.destroy();

      this.voiceCommandManager = null;
      this.voiceDebugPanel = null;
    });
  }

  update(time, delta) {
    if (this.gameOver) return;

    this.inputManager.update();

    this.scoreManager.addTime(delta);

    this.player.update(delta);

    const bonusPoints = this.obstacleManager.update();
    this.scoreManager.addBonus(bonusPoints);

    this.hud.update(
      this.scoreManager.score,
      this.obstacleManager.speedLevel
    );
  }

  endGame() {
    if (this.gameOver) return;

    this.gameOver = true;

    this.inputManager.disable();
    this.voiceCommandManager.stop();

    this.player.die();
    this.obstacleManager.stopAll();

    const flash = this.add
      .rectangle(
        this.scale.width / 2,
        this.scale.height / 2,
        this.scale.width,
        this.scale.height,
        0xff0000,
        0
      )
      .setDepth(20);

    this.tweens.add({
      targets: flash,
      alpha: 0.4,
      duration: 180,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.scene.start('GameOverScene', {
          score: this.scoreManager.getFinalScore()
        });
      }
    });
  }
}