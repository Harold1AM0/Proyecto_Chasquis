export const GAME_CONFIG = {
  width: 900,
  height: 500,
  backgroundColor: '#2d1b00',

  lanes: [120, 250, 380],

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