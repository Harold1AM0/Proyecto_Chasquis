export default class AudioManager {
  constructor(scene) {
    this.scene = scene;

    this.currentMusic = null;
    this.currentMusicKey = null;

    this.musicVolume = 0.45;
    this.sfxVolume = 0.75;
  }

  playMusic(key, config = {}) {
    if (!key) return;

    // Si la misma música ya está sonando, no la reinicia.
    if (this.currentMusicKey === key && this.currentMusic?.isPlaying) {
      return;
    }

    this.stopMusic();

    this.currentMusicKey = key;

    this.currentMusic = this.scene.sound.add(key, {
      loop: config.loop ?? true,
      volume: config.volume ?? this.musicVolume
    });

    this.currentMusic.play();
  }

  stopMusic() {
    if (!this.currentMusic) return;

    this.currentMusic.stop();
    this.currentMusic.destroy();

    this.currentMusic = null;
    this.currentMusicKey = null;
  }

  fadeOutMusic(duration = 500) {
    if (!this.currentMusic) return;

    this.scene.tweens.add({
      targets: this.currentMusic,
      volume: 0,
      duration,
      onComplete: () => {
        this.stopMusic();
      }
    });
  }

  playSfx(key, config = {}) {
    if (!key) return;

    this.scene.sound.play(key, {
      volume: config.volume ?? this.sfxVolume,
      rate: config.rate ?? 1
    });
  }

  setMusicVolume(volume) {
    this.musicVolume = volume;

    if (this.currentMusic) {
      this.currentMusic.setVolume(volume);
    }
  }

  setSfxVolume(volume) {
    this.sfxVolume = volume;
  }

  destroy() {
    this.stopMusic();
  }
}