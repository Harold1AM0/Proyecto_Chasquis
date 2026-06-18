
import Phaser from 'phaser';

export default class InputManager {
  constructor(scene, actions = {}) {
    this.scene = scene;
    this.actions = actions;
    this.enabled = true;

    this.cursors = scene.input.keyboard.createCursorKeys();

    // Tecla V para activar o desactivar comandos de voz
    this.voiceKey = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.V
    );
  }

  update() {
    if (!this.enabled) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.moveUp();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.moveDown();
    }

    if (Phaser.Input.Keyboard.JustDown(this.voiceKey)) {
      this.toggleVoice();
    }
  }

  moveUp() {
    if (!this.enabled) return;
    this.actions.onMoveUp?.();
  }

  moveDown() {
    if (!this.enabled) return;
    this.actions.onMoveDown?.();
  }

  toggleVoice() {
    if (!this.enabled) return;
    this.actions.onToggleVoice?.();
  }

  handleVoiceCommand(command) {
    if (!this.enabled) return;

    if (command === 'up') {
      this.moveUp();
      return;
    }

    if (command === 'down') {
      this.moveDown();
      return;
    }
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }
}