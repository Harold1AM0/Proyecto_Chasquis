
export default class ScoreManager {
  constructor() {
    this.score = 0;
  }

  addTime(delta) {
    this.score += delta * 0.01;
  }

  addBonus(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
  }

  getFinalScore() {
    return Math.floor(this.score);
  }
}