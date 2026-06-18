
export default class VoiceCommandManager {
  constructor({
    onCommand,
    onStatusChange,
    onError
  } = {}) {
    this.onCommand = onCommand;
    this.onStatusChange = onStatusChange;
    this.onError = onError;

    this.isSupported = false;
    this.isListening = false;
    this.shouldListen = false;

    this.lastCommandTime = 0;
    this.commandCooldown = 350;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.onStatusChange?.('unsupported');
      this.onError?.('Este navegador no soporta reconocimiento de voz.');
      return;
    }

    this.isSupported = true;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-PE';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.onStatusChange?.('listening');
    };

    this.recognition.onend = () => {
      this.isListening = false;

      if (this.shouldListen) {
        this.restart();
      } else {
        this.onStatusChange?.('stopped');
      }
    };

    this.recognition.onerror = (event) => {
      this.onStatusChange?.('error');
      this.onError?.(event.error);
    };

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript.toLowerCase().trim();

      this.processTranscript(transcript);
    };
  }

  start() {
    if (!this.isSupported || this.isListening) return;

    this.shouldListen = true;

    try {
      this.recognition.start();
    } catch (error) {
      this.onStatusChange?.('error');
      this.onError?.(error.message);
    }
  }

  stop() {
    if (!this.isSupported) return;

    this.shouldListen = false;

    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.onStatusChange?.('stopped');
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
        this.onStatusChange?.('error');
        this.onError?.(error.message);
      }
    }, 250);
  }

  processTranscript(transcript) {
    const now = Date.now();

    if (now - this.lastCommandTime < this.commandCooldown) {
      return;
    }

    const command = this.detectCommand(transcript);

    if (!command) return;

    this.lastCommandTime = now;
    this.onCommand?.(command);
  }

  detectCommand(transcript) {
    const upWords = [
      'arriba',
      'sube',
      'subir',
      'hacia arriba'
    ];

    const downWords = [
      'abajo',
      'baja',
      'bajar',
      'hacia abajo'
    ];

    if (upWords.some((word) => transcript.includes(word))) {
      return 'up';
    }

    if (downWords.some((word) => transcript.includes(word))) {
      return 'down';
    }

    return null;
  }
}