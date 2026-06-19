
export default class VoiceDebugPanel {
  constructor(scene) {
    this.scene = scene;

    this.state = {
      status: 'apagado',
      audio: 'no',
      speech: 'no',
      interimTranscript: '',
      finalTranscript: '',
      lastCommand: '-',
      confidence: '-',
      latency: '-'
    };

    this.text = scene.add
      .text(scene.scale.width - 330, 16, '', {
        fontSize: '13px',
        fontFamily: 'monospace',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: {
          x: 10,
          y: 8
        }
      })
      .setDepth(1000)
      .setScrollFactor(0);

    this.render();
  }

  update(data = {}) {
    this.state = {
      ...this.state,
      ...data
    };

    this.render();
  }

  render() {
    this.text.setText(
      [
        '[VOICE DEBUG]',
        `Estado: ${this.state.status}`,
        `Audio: ${this.state.audio}`,
        `Voz: ${this.state.speech}`,
        `Parcial: ${this.state.interimTranscript || '-'}`,
        `Final: ${this.state.finalTranscript || '-'}`,
        `Comando: ${this.state.lastCommand || '-'}`,
        `Confianza: ${this.state.confidence}`,
        `Latencia: ${this.state.latency}`
      ].join('\n')
    );
  }

  destroy() {
    this.text.destroy();
  }
}