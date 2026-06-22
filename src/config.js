export const GAME_CONFIG = {
  width: 900,
  height: 500,
  backgroundColor: '#2d1b00',

  layout: {
    backgroundRatio: 0.35,
    roadRatio: 0.65,

    // El fondo ocupa de 0 a 175 px aprox.
    roadTop: 175,

    // El camino llega casi hasta abajo, dejando un pequeño margen
    roadBottom: 470,

    // Altura visual del camino
    roadHeight: 295
  },

  lanes: [245, 335, 425],

  player: {
    x: 150,
    width: 40,
    height: 64,
    texture: 'chasqui'
  },

  obstacle: {
    width: 44,
    height: 64,
    speedBase: 220,
    speedMax: 520,
    speedIncrement: 18,
    texture: 'conquistador'
  }
};