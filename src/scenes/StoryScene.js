import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

export default class StoryScene extends Phaser.Scene {
  constructor() {
    super('StoryScene');
  }

  init(data) {
    this.slides = data.slides ?? [];
    this.nextScene = data.nextScene ?? 'MenuScene';
    this.nextData = data.nextData ?? {};
    this.currentIndex = 0;
    this.isChanging = false;
  }

  create() {
    const W = GAME_CONFIG.width;
    const H = GAME_CONFIG.height;

    this.cameras.main.setBackgroundColor('#000000');

    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 1);

    this.storyImage = this.add
      .image(W / 2, H / 2 - 45, null)
      .setDepth(1);

    this.textBox = this.add
      .rectangle(W / 2, H - 95, W - 90, 130, 0x000000, 0.78)
      .setStrokeStyle(2, 0xffdd88, 0.45)
      .setDepth(2);

    this.storyText = this.add
      .text(70, H - 135, '', {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'Georgia, serif',
        wordWrap: { width: W - 140 },
        lineSpacing: 6
      })
      .setDepth(3);

    this.hintText = this.add
      .text(W / 2, H - 70, 'ESPACIO / ENTER / CLICK para continuar', {
        fontSize: '16px',
        color: '#ffdd88',
        fontFamily: 'Georgia, serif'
      })
      .setOrigin(0.5)
      .setDepth(3);

    this.showSlide();

    this.input.keyboard.on('keydown-SPACE', () => this.nextSlide());
    this.input.keyboard.on('keydown-ENTER', () => this.nextSlide());
    this.input.on('pointerdown', () => this.nextSlide());
  }

  showSlide() {
    if (this.currentIndex >= this.slides.length) {
      this.scene.start(this.nextScene, this.nextData);
      return;
    }

    const W = GAME_CONFIG.width;
    const H = GAME_CONFIG.height;

    const slide = this.slides[this.currentIndex];

    if (!slide?.imageKey || !this.textures.exists(slide.imageKey)) {
      console.warn('Imagen de historia no encontrada:', slide?.imageKey);
      this.currentIndex++;
      this.showSlide();
      return;
    }

    this.storyImage.setTexture(slide.imageKey);

    const texture = this.textures.get(slide.imageKey);
    const source = texture.getSourceImage();

    const imageWidth = source.width;
    const imageHeight = source.height;

    const maxWidth = W * 0.92;
    const maxHeight = H * 0.66;

    const scale = Math.min(
      maxWidth / imageWidth,
      maxHeight / imageHeight
    );

    this.storyImage.setDisplaySize(
      imageWidth * scale,
      imageHeight * scale
    );

    this.storyImage.setPosition(W / 2, H / 2 - 65);

    this.storyText.setText(slide.text ?? '');

    this.storyImage.setAlpha(0);
    this.storyText.setAlpha(0);
    this.hintText.setAlpha(0);

    this.tweens.add({
      targets: [this.storyImage, this.storyText, this.hintText],
      alpha: 1,
      duration: 300,
      ease: 'Sine.easeOut',
      onComplete: () => {
        this.isChanging = false;
      }
    });
  }

  nextSlide() {
    if (this.isChanging) return;

    this.isChanging = true;

    this.tweens.add({
      targets: [this.storyImage, this.storyText, this.hintText],
      alpha: 0,
      duration: 180,
      ease: 'Sine.easeIn',
      onComplete: () => {
        this.currentIndex++;
        this.showSlide();
      }
    });
  }
}