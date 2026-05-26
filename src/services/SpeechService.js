// SpeechService.js — Síntesis de voz con Web Speech API
// Uso: SpeechService.speak('¡Corre, chasqui!');

const SpeechService = {
  _enabled: typeof window !== 'undefined' && 'speechSynthesis' in window,

  /**
   * Reproduce un texto en voz alta.
   * @param {string} text   - Texto a leer
   * @param {object} opts   - Opciones opcionales: { lang, rate, pitch, volume }
   */
  speak(text, opts = {}) {
    if (!this._enabled) return;

    // Cancelar lo que se esté diciendo
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang   = opts.lang   ?? 'es-PE';   // Español - Perú
    utterance.rate   = opts.rate   ?? 1.0;
    utterance.pitch  = opts.pitch  ?? 1.0;
    utterance.volume = opts.volume ?? 1.0;

    window.speechSynthesis.speak(utterance);
  },

  /** Detiene cualquier voz en curso. */
  stop() {
    if (!this._enabled) return;
    window.speechSynthesis.cancel();
  },

  /** true si el navegador soporta síntesis de voz */
  get isAvailable() {
    return this._enabled;
  }
};

export default SpeechService;

// ── Ejemplo de uso en GameScene ───────────────────────────────────────────
//
//  import SpeechService from './SpeechService.js';
//
//  // Al esquivar un obstáculo:
//  SpeechService.speak('¡Así se corre, chasqui!');
//
//  // Al morir:
//  SpeechService.speak('El conquistador te atrapó');
//