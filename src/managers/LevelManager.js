import LEVELS from '../data/levels.js';

export default class LevelManager {
  constructor(levelIndex = 0) {
    this.levelIndex = levelIndex;
    this.levels = LEVELS;
    this.currentLevel = this.levels[this.levelIndex];

    if (!this.currentLevel) {
      throw new Error(`No existe el nivel con índice: ${levelIndex}`);
    }

    this.elapsedMs = 0;
    this.completed = false;
  }

  update(delta) {
    if (this.completed) return;

    this.elapsedMs += delta;

    if (this.elapsedMs >= this.currentLevel.durationMs) {
      this.elapsedMs = this.currentLevel.durationMs;
      this.completed = true;
    }
  }

  getCurrentLevel() {
    return this.currentLevel;
  }

  getLevelIndex() {
    return this.levelIndex;
  }

  getLevelName() {
    return this.currentLevel.name;
  }

  getLevelNumber() {
    return this.currentLevel.number;
  }

  getElapsedMs() {
    return this.elapsedMs;
  }

  getDurationMs() {
    return this.currentLevel.durationMs;
  }

  getProgress() {
    if (this.currentLevel.durationMs <= 0) return 1;

    const progress = this.elapsedMs / this.currentLevel.durationMs;

    return Math.max(0, Math.min(1, progress));
  }

  getProgressPercent() {
    return Math.floor(this.getProgress() * 100);
  }

  isCompleted() {
    return this.completed;
  }

  hasNextLevel() {
    return this.levelIndex < this.levels.length - 1;
  }

  getNextLevelIndex() {
    if (!this.hasNextLevel()) return null;

    return this.levelIndex + 1;
  }

  getTotalLevels() {
    return this.levels.length;
  }
}