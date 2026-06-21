// src/managers/VoiceCommandManager.js

export default class VoiceCommandManager {
  constructor({
    onCommand,
    onStatusChange,
    onError,
    onDebug,
    debug = false,
    processInterimCommands = false
  } = {}) {
    this.onCommand = onCommand;
    this.onStatusChange = onStatusChange;
    this.onError = onError;
    this.onDebug = onDebug;

    this.debug = debug;
    this.processInterimCommands = processInterimCommands;

    this.isSupported = false;
    this.isListening = false;
    this.shouldListen = false;

    this.lastCommandTime = 0;
    this.commandCooldown = 200;

    // Guarda el último comando ejecutado para evitar duplicados interim/final
    this.lastCommand = null;

    // Puede ser 'interim', 'final' o null
    this.lastCommandSource = null;

    // Ventana para ignorar el final si repite un comando ya ejecutado como interim
    this.finalDedupWindow = 1000;

    this.speechStartTime = null;
    this.lastTranscript = '';

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.emitStatus('unsupported');
      this.emitError('Este navegador no soporta reconocimiento de voz.');
      return;
    }

    this.isSupported = true;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-PE';
    this.recognition.continuous = true;

    // Solo usar resultados parciales si realmente los necesitas
    this.recognition.interimResults =
      this.processInterimCommands || this.debug;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.emitStatus('listening');
      this.debugLog('onstart');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.debugLog('onend');

      if (this.shouldListen) {
        this.restart();
      } else {
        this.emitStatus('stopped');
      }
    };

    this.recognition.onaudiostart = () => {
      this.debugLog('onaudiostart');

      this.emitDebug({
        audio: 'sí'
      });
    };

    this.recognition.onaudioend = () => {
      this.debugLog('onaudioend');

      this.emitDebug({
        audio: 'no'
      });
    };

    this.recognition.onspeechstart = () => {
      this.speechStartTime = performance.now();
      this.debugLog('onspeechstart');

      this.emitDebug({
        speech: 'sí',
        latency: 'midiendo...'
      });
    };

    this.recognition.onspeechend = () => {
      this.debugLog('onspeechend');

      this.emitDebug({
        speech: 'no'
      });
    };

    this.recognition.onerror = (event) => {
      this.debugLog('onerror', event.error);

      const fatalErrors = [
        'not-allowed',
        'service-not-allowed',
        'audio-capture'
      ];

      if (fatalErrors.includes(event.error)) {
        this.shouldListen = false;
      }

      this.emitStatus('error');
      this.emitError(event.error);
    };
    
    this.recognition.onresult = (event) => {
      this.handleResult(event);
    };
  }

  start() {
    if (!this.isSupported || this.isListening) return;

    this.shouldListen = true;

    try {
      this.recognition.start();
    } catch (error) {
      this.emitStatus('error');
      this.emitError(error.message);
    }
  }

  stop() {
    if (!this.isSupported) return;

    this.shouldListen = false;

    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.emitStatus('stopped');
    }
  }

  toggle() {
    if (this.isListening || this.shouldListen) {
      this.stop();
    } else {
      this.start();
    }
  }

  restart() {
    setTimeout(() => {
      if (!this.shouldListen || this.isListening) return;

      try {
        this.recognition.start();
      } catch (error) {
        this.emitStatus('error');
        this.emitError(error.message);
      }
    }, 250);
  }

  handleResult(event) {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const alternative = result[0];

      const transcript = alternative.transcript.toLowerCase().trim();
      const confidence = alternative.confidence;

      const now = performance.now();
      const latencyMs = this.speechStartTime
        ? Math.round(now - this.speechStartTime)
        : null;

      const debugData = {
        confidence:
          typeof confidence === 'number'
            ? confidence.toFixed(2)
            : '-',
        latency: latencyMs !== null ? `${latencyMs} ms` : '-'
      };

      if (result.isFinal) {
        this.lastTranscript = transcript;

        this.debugLog('final result', {
          transcript,
          confidence,
          latencyMs
        });

        this.emitDebug({
          ...debugData,
          finalTranscript: transcript,
          interimTranscript: ''
        });

        this.processTranscript(transcript, {
          isFinal: true,
          confidence,
          latencyMs
        });
      } else {
        this.debugLog('interim result', {
          transcript,
          confidence,
          latencyMs
        });

        this.emitDebug({
          ...debugData,
          interimTranscript: transcript
        });

        if (this.processInterimCommands) {
          this.processTranscript(transcript, {
            isFinal: false,
            confidence,
            latencyMs
          });
        }
      }
    }
  }

  processTranscript(transcript, meta = {}) {
    const now = Date.now();
    const command = this.detectCommand(transcript);

    if (!command) return;

    const isFinal = meta.isFinal === true;

    const isFinalDuplicate =
      isFinal &&
      this.lastCommandSource === 'interim' &&
      this.lastCommand === command &&
      now - this.lastCommandTime < this.finalDedupWindow;

    if (isFinalDuplicate) {
      this.debugLog('final duplicate ignored', {
        command,
        transcript,
        ...meta
      });

      return;
    }

    if (now - this.lastCommandTime < this.commandCooldown) {
      this.debugLog('command ignored by cooldown', {
        command,
        transcript,
        cooldownMs: now - this.lastCommandTime,
        ...meta
      });

      return;
    }

    this.lastCommandTime = now;
    this.lastCommand = command;
    this.lastCommandSource = isFinal ? 'final' : 'interim';

    this.debugLog('command detected', {
      command,
      transcript,
      source: this.lastCommandSource,
      ...meta
    });

    this.emitDebug({
      lastCommand: command === 'up' ? 'arriba' : 'abajo',
      latency:
        typeof meta.latencyMs === 'number'
          ? `${meta.latencyMs} ms`
          : '-'
    });

    this.onCommand?.(command, meta);
  }

  normalizeTranscript(transcript) {
    return transcript
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,!?¿¡]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  detectCommand(transcript) {
    const text = this.normalizeTranscript(transcript);

    if (!text) return null;

    const commandTerms = [
      {
        command: 'up',
        terms: ['hacia arriba', 'arriba', 'sube', 'subir']
      },
      {
        command: 'down',
        terms: ['hacia abajo', 'abajo', 'baja', 'bajar']
      }
    ];

    const matches = [];

    for (const { command, terms } of commandTerms) {
      for (const term of terms) {
        const escapedTerm = term
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\s+/g, '\\s+');

        const regex = new RegExp(`(^|\\s)${escapedTerm}(?=\\s|$)`, 'g');

        let match;

        while ((match = regex.exec(text)) !== null) {
          matches.push({
            command,
            index: match.index + match[1].length
          });
        }
      }
    }

    if (matches.length === 0) return null;

    matches.sort((a, b) => a.index - b.index);

    return matches[matches.length - 1].command;
  }

  emitStatus(status) {
    this.onStatusChange?.(status);

    this.emitDebug({
      status
    });
  }

  emitError(error) {
    this.onError?.(error);

    this.emitDebug({
      status: 'error'
    });
  }

  emitDebug(data) {
    if (!this.debug) return;

    this.onDebug?.(data);
  }

  debugLog(eventName, data = null) {
    if (!this.debug) return;

    if (data) {
      console.log(`[VOICE DEBUG] ${eventName}`, data);
    } else {
      console.log(`[VOICE DEBUG] ${eventName}`);
    }
  }
}