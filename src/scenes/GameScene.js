import Phaser from 'phaser';

import Player from '../entities/Player.js';

import ObstacleManager from '../managers/ObstacleManager.js';
import BackgroundManager from '../managers/BackgroundManager.js';
import ScoreManager from '../managers/ScoreManager.js';
import InputManager from '../managers/InputManager.js';
import VoiceCommandManager from '../managers/VoiceCommandManager.js';
import LevelManager from '../managers/LevelManager.js';
import AudioManager from '../managers/AudioManager.js';

import LEVELS from '../data/levels.js';

import Hud from '../ui/Hud.js';
import VoiceDebugPanel from '../ui/VoiceDebugPanel.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.levelIndex = data.levelIndex ?? 0;
    this.previousScore = data.previousScore ?? 0;
  }

  create() {
    this.gameOver = false;
    this.levelCompleted = false;

    this.levelManager = new LevelManager(this.levelIndex);
    this.currentLevel = this.levelManager.getCurrentLevel();

    this.audioManager = new AudioManager(this);
    this.audioManager.playMusic(this.currentLevel.assets?.music);

    console.log('Nivel iniciado:', this.currentLevel);

    this.backgroundManager = new BackgroundManager(this, this.currentLevel);
    this.backgroundManager.create();

    this.scoreManager = new ScoreManager();

    this.hud = new Hud(this);

    this.player = new Player(this, 1);

    this.obstacleManager = new ObstacleManager(this, this.currentLevel);

    this.inputManager = new InputManager(this, {
      onMoveUp: () => {
        const moved = this.player.moveUp();

        if (moved) {
          this.audioManager.playSfx('sfx_lane_change');
        }
      },

      onMoveDown: () => {
        const moved = this.player.moveDown();

        if (moved) {
          this.audioManager.playSfx('sfx_lane_change');
        }
      },

      onToggleVoice: () => this.voiceCommandManager.toggle()
    });

    const VOICE_DEBUG = true;

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

      this.audioManager?.destroy();

      this.voiceCommandManager = null;
      this.voiceDebugPanel = null;
      this.audioManager = null;
    });
  }

  update(time, delta) {
    if (this.gameOver || this.levelCompleted) return;

    this.inputManager.update();

    this.levelManager.update(delta);

    this.backgroundManager.update(delta);

    this.scoreManager.addTime(delta);

    this.player.update(delta);

    const bonusPoints = this.obstacleManager.update();
    this.scoreManager.addBonus(bonusPoints);

    this.hud.update(
      this.scoreManager.score,
      this.obstacleManager.speedLevel,
      {
        levelName: this.levelManager.getLevelName(),
        levelNumber: this.levelManager.getLevelNumber(),
        totalLevels: this.levelManager.getTotalLevels(),
        progress: this.levelManager.getProgress(),
        progressPercent: this.levelManager.getProgressPercent(),
        theme: this.currentLevel.theme
      }
    );

    if (this.levelManager.isCompleted()) {
      this.completeLevel();
    }
  }

  completeLevel() {
    if (this.levelCompleted || this.gameOver) return;

    this.levelCompleted = true;

    this.audioManager.playSfx('sfx_level_complete');
    this.audioManager.fadeOutMusic(700);

    this.inputManager.disable();
    this.voiceCommandManager.stop();
    this.obstacleManager.stopAll();

    const currentTotalScore =
      this.previousScore + this.scoreManager.getFinalScore();

    const levelCompleteText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2,
        '¡Nivel completado!',
        {
          fontSize: '40px',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: {
            x: 16,
            y: 10
          }
        }
      )
      .setOrigin(0.5)
      .setDepth(40);

    this.tweens.add({
      targets: levelCompleteText,
      alpha: 0,
      duration: 700,
      delay: 700,
      onComplete: () => {
        const isLastLevel = !this.levelManager.hasNextLevel();

        // CASO 1: NIVEL 1 O NIVEL 2
        if (!isLastLevel) {
          const nextLevelIndex = this.levelManager.getNextLevelIndex();
          const nextLevel = LEVELS[nextLevelIndex];

          const currentAfterSlides = this.currentLevel.story?.after ?? [];
          const nextBeforeSlides = nextLevel.story?.before ?? [];

          const goToWinScene = () => {
            this.scene.start('WinScene', {
              score: currentTotalScore,
              title: '¡TRAMO COMPLETADO!',
              subtitle: 'El mensaje sigue su camino por el Qhapaq Ñan.',
              bodyText: 'El chasqui debe continuar hacia el siguiente territorio.',
              scoreLabel: 'PUNTUACIÓN ACUMULADA',
              buttonText: 'CONTINUAR MISIÓN [ENTER]',

              // Después del WinScene recién se muestran las imágenes iniciales del siguiente nivel.
              nextScene: nextBeforeSlides.length > 0 ? 'StoryScene' : 'GameScene',

              nextData: nextBeforeSlides.length > 0
                ? {
                  slides: nextBeforeSlides,
                  nextScene: 'GameScene',
                  nextData: {
                    levelIndex: nextLevelIndex,
                    previousScore: currentTotalScore
                  }
                }
                : {
                  levelIndex: nextLevelIndex,
                  previousScore: currentTotalScore
                }
            });
          };

          // Primero se muestran SOLO las imágenes finales del nivel actual.
          if (currentAfterSlides.length > 0) {
            this.scene.start('StoryScene', {
              slides: currentAfterSlides,
              nextScene: 'WinScene',
              nextData: {
                score: currentTotalScore,
                title: '¡TRAMO COMPLETADO!',
                subtitle: 'El mensaje sigue su camino por el Qhapaq Ñan.',
                bodyText: 'El chasqui debe continuar hacia el siguiente territorio.',
                scoreLabel: 'PUNTUACIÓN ACUMULADA',
                buttonText: 'CONTINUAR MISIÓN [ENTER]',

                nextScene: nextBeforeSlides.length > 0 ? 'StoryScene' : 'GameScene',

                nextData: nextBeforeSlides.length > 0
                  ? {
                    slides: nextBeforeSlides,
                    nextScene: 'GameScene',
                    nextData: {
                      levelIndex: nextLevelIndex,
                      previousScore: currentTotalScore
                    }
                  }
                  : {
                    levelIndex: nextLevelIndex,
                    previousScore: currentTotalScore
                  }
              }
            });
          } else {
            goToWinScene();
          }

          return;
        }

        const endingSlides = this.currentLevel.story?.after ?? [];

        if (endingSlides.length > 0) {
          this.scene.start('StoryScene', {
            slides: endingSlides,
            nextScene: 'EndScene',
            nextData: {}
          });
        } else {
          this.scene.start('EndScene');
        }
      }
    });
  }

  endGame() {
    if (this.gameOver) return;

    this.gameOver = true;

    this.audioManager.playSfx('sfx_death');
    this.audioManager.fadeOutMusic(400);

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
          score: this.previousScore + this.scoreManager.getFinalScore()
        });
      }
    });
  }
}